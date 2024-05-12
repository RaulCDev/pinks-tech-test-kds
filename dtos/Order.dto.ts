import { Item } from "./Item.dto";

export enum StateType {
  pending="PENDING",
  inProgress="IN_PROGRESS",
  ready="READY",
  delivered="DELIVERED"
}

export type Order = {
  id: string;
  state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED";
  items: Array<Item>;
};
