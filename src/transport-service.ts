
export interface Transport {
    type: "transport",
    orderId: string,
    transportId: string
}

export async function getTransportByOrderId(orderId: string) {
    try {
        console.log(`getting transport by order ${orderId}`)

        return new Promise<Transport>((resolve) => {
            setTimeout(() => {
                resolve({ type: "transport", orderId, transportId: `transport-id-xxx` })
            }, 100);
        });
    }
    finally {
        console.log(`getting transport by order ${orderId} is done`)
    }
}