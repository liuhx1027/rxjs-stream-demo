
const NETWORK_LATENCY = 200;

export interface Assignment {
    type: "assignment", orderId: string, assignmentId: string, truck_id: string, trailer_id: string, driver_id: string
}

export async function getAssignment(orderId: string) {
    try {
        console.log(`getting assignment by order ${orderId}`)

        return new Promise<Assignment>((resolve) => {
            setTimeout(() => {
                resolve({ type: "assignment", orderId, assignmentId: `assignment-id-xxx`, truck_id: "truck-id-1", trailer_id: "trailer-id-1", driver_id: "driver-id-1" })
            }, NETWORK_LATENCY);
        });
    }
    finally {
        console.log(`getting assignment by order ${orderId} is done`)
    }
}

export interface Truck {
    type: "truck",
    truckId: string
}

export async function getTruck(truckId: string) {
    try {
        console.log(`getting truck by id ${truckId}`)

        return new Promise<Truck>((resolve) => {
            setTimeout(() => {
                resolve({ type: "truck", truckId })
            }, NETWORK_LATENCY);
        });
    }
    finally {
        console.log(`getting truck by id ${truckId} is done`)
    }
}

export interface Trailer {
    type: "trailer",
    trailerId: string
}

export async function getTrailer(trailerId: string) {
    try {
        console.log(`getting trailer by id ${trailerId}`)

        return new Promise<Trailer>((resolve) => {
            setTimeout(() => {
                resolve({ type: "trailer", trailerId })
            }, NETWORK_LATENCY);
        });
    }
    finally {
        console.log(`getting trailer by id ${trailerId} is done`)
    }
}

export interface Driver {
    type: "driver",
    driverId: string
}

export async function getDriver(driverId: string) {
    try {
        console.log(`getting driver by id ${driverId}`)

        return new Promise<Driver>((resolve) => {
            setTimeout(() => {
                resolve({ type: "driver", driverId })
            }, NETWORK_LATENCY);
        });
    }
    finally {
        console.log(`getting truck by id ${driverId} is done`)
    }
}