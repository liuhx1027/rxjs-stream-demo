import { of, from, lastValueFrom, mergeMap, forkJoin } from "rxjs";
import { Assignment, getAssignment, getDriver, getTrailer, getTruck } from "./fleet-service";
import { getAllOrders } from "./order-service";
import { getTransportByOrderId, Transport } from "./transport-service";

async function main() {
    console.time("total");

    // await sequencial();
    // await promise();
    await reactiveX();

    console.timeEnd("total")
}

main();

async function reactiveX() {
    // get orders
    const orders = await getAllOrders();

    // const stream = from(orders).pipe(
    //     mergeMap((o) => { return getAssignment(o.orderId) }, 1),
    //     mergeMap(assignment => { getTruck(assignment.truck_id); return of(assignment) }, 1),
    //     mergeMap(assignment => { getTrailer(assignment.trailer_id); return of(assignment) }, 1),
    //     mergeMap(assignment => { getDriver(assignment.driver_id); return of(assignment) }, 1),
    // ).pipe(
    //     mergeMap((o) => { getTransportByOrderId(o.orderId); return of(o) }, 1),
    // );
    const stream = forkJoin([
        from(orders).pipe(
            mergeMap((o) => getTransportByOrderId(o.orderId), 10),
        ),
        from(orders).pipe(
            mergeMap((o) => getAssignment(o.orderId)),
            mergeMap(assignment => { getTruck(assignment.truck_id); return of(assignment) }, 10),
            mergeMap(assignment => { getTrailer(assignment.trailer_id); return of(assignment) }, 10),
            mergeMap(assignment => { getDriver(assignment.driver_id); return of(assignment) }, 10),
        ),
    ])

    await lastValueFrom(stream)
}

async function promise() {
    // get orders
    const orders = await getAllOrders();

    // get transports
    const transportPromises = orders.map(p => getTransportByOrderId(p.orderId));
    const transports = await Promise.all(transportPromises)

    // get assignments
    const assignmentPromises = orders.map(p => getAssignment(p.orderId));
    const assignments = await Promise.all(assignmentPromises);

    // // get trucks, trailer and drivers
    const truckPromises = assignments.map(p => getTruck(p.truck_id))
    const trailerPromises = assignments.map(p => getTrailer(p.trailer_id))
    const driverPromises = assignments.map(p => getDriver(p.driver_id))

    const [trucks, trailers, drivers] = await Promise.all([
        await Promise.all(truckPromises),
        await Promise.all(trailerPromises),
        await Promise.all(driverPromises),
    ])
}

async function sequencial() {
    // get orders
    const orders = await getAllOrders();

    // get transports
    for (const o of orders) {
        await getTransportByOrderId(o.orderId);
    }

    // get assignments
    for (const o of orders) {
        const assignment = await getAssignment(o.orderId);
        // get assets
        if (assignment.truck_id)
            await getTruck(assignment.truck_id);
        if (assignment.trailer_id)
            await getTrailer(assignment.trailer_id);
        if (assignment.driver_id)
            await getDriver(assignment.driver_id);
    }
}
