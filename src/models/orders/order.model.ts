// export interface Order {
//     id: string;
//     title: string;
//     description: string;
//     status: OrderStatus
// }

export enum OrderStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DELIVERING = "DELIVERING",
    DONE = "DONE"
}