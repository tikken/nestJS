export interface Order {
    id: string;
    title: string;
    description: string;
    status: OrderStatus
}

enum OrderStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DELIVERING = "DELIVERING",
    DONE = "DONE"
}