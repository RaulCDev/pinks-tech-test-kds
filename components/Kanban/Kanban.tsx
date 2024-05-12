import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { Order, StateType } from "@/dtos/Order.dto";

export default function Kanban() {
  const { orders, updateOrderState  } = useOrders();

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(order) =>
          updateOrderState(order, StateType.inProgress)
        }
      />
      <Column title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={(order) =>
          updateOrderState(order, StateType.ready)
        }
      />
      <Column title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
        onClick={(order) =>
          updateOrderState(order, StateType.delivered)
        }
      />
      <Column title="Entregado"
        orders={orders.filter((i) => i.state === "DELIVERED")}
        onClick={() => alert("La orden ya ha sido entregada")}
      />
    </section>
  );
}
