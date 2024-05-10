import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";

export default function Kanban() {
  const { orders } = useOrders();

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={() =>
          alert(
            "mmmmm..., deberias de modificar esto! tenemos que hacer que las ordenes lleguen hasta listo y se entreguen!"
          )
        }
      />
      <Column title="En preparación" orders={[]} />
      <Column title="Listo" orders={[]} />
    </section>
  );
}
