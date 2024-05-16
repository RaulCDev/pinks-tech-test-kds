import { useState } from "react";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { ArrowDown } from "@/bases/ArrowDown";
import { ArrowRight } from "@/bases/ArrowRight";
import OrderComponent from '../Order/Order';

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  onClick?: (order: Order) => void;
  showToggleButton?: boolean;
};

export default function Column( props : ColumnProps) {
  const [showOrders, setShowOrders] = useState(!props.showToggleButton);

  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>
          {props.title} ({props.orders.length})
          {props.showToggleButton && (
            <button  onClick={() => setShowOrders(!showOrders)} className={s["pk-column__arrows"]}>
              {showOrders ? <ArrowDown  color="#000000"/> : <ArrowRight  color="#000000"/>}
            </button>
          )}
        </h3>
      </div>
      {showOrders &&
        props.orders.map((order) => (
          <OrderComponent
          order={order}
          onClick={props.onClick}
        />
        ))}
    </div>
  );
}
