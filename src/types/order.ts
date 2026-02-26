export type Status = "pending" | "preparing" | "served";

export interface OrderItem {
  id?: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  table: number;
  status: Status;
  items: OrderItem[];
}