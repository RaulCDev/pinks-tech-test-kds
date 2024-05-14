import { useState } from "react";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { ArrowDown } from "@/bases/ArrowDown";
import { ArrowRight } from "@/bases/ArrowRight";



export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  onClick?: (order: Order) => void;
  showToggleButton?: boolean;
};

export default function Column(props: ColumnProps) {
  const [showOrders, setShowOrders] = useState(!props.showToggleButton);

  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>
          {props.title} ({props.orders.length})
          {props.showToggleButton && (
            <button onClick={() => setShowOrders(!showOrders)}>
              {showOrders ? <ArrowDown /> : <ArrowRight />}
            </button>
          )}
        </h3>
      </div>
      {showOrders &&
        props.orders.map((order) => (
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
                <div key={item.id}>
                  <h4>{item.name}</h4>
                  <img src={item.image} alt={item.name} />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
