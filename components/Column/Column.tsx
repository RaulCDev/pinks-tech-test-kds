import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  onClick?: (order: Order) => void;
};

export default function Column(props: ColumnProps) {
  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>{props.title}</h3>
      </div>
      {props.orders.map((order) => (
        <div
          onClick={() => props.onClick && props.onClick(order)}
          className={s["pk-card"]}
        >
          <div>
            <span>
              orden: <b>{order.id}</b>
            </span>
          </div>
          <div>
            {order.items.map((item) => (
              <div></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
