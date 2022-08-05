import { range, map, lastValueFrom, toArray } from "rxjs"

interface Order {
    orderId: string,
    description: string
}

export async function getAllOrders() {
    try {
        console.log(`start getting all orders`)
        
        return new Promise<Order[]>((resolve) => {
            setTimeout(async () => {
                resolve(await lastValueFrom(
                    range(1, 10).pipe(
                        map(p => ({ orderId: p.toString(), description: `order - ${p}` })),
                        toArray()
                    )))
            }, 300);
        });
    }
    finally {
        console.log(`getting all orders is done`)
    }
}