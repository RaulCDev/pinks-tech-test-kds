import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomInterval } from "@/lib/utils";
import { Rider } from "@/dtos/Rider.dto";
import { StateType } from "@/dtos/Order.dto"

export type RidersContextProps = {
  riders: Array<Rider>;
  removeRider: (orderId: string) => void;
};

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {}
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup } = useOrders();

  useEffect(() => {
    const order = orders.find((order) => !assignedOrders.includes(order.id));
    if (order) {
      setAssignedOrders((prev) => [...prev, order.id]);
      setTimeout(() => {
        setRiders((prev) => [
          ...prev,
          {
            orderWanted: order.id,
            pickup: () => pickup(order.id),
          },
        ]);
      }, getRandomInterval(4_000, 10_000));
    }
  }, [orders]);

  const removeRider = (orderId: string) => {
    // Obtener la orden correspondiente del array de orders
    const order = orders.find((order) => order.id === orderId);
    // Verificar si la orden existe y está en estado "Listo"
    if (order && order.state === StateType.ready) {
      // Eliminar el rider correspondiente del array de riders
      setRiders((prev) => prev.filter((rider) => rider.orderWanted !== orderId));
      alert("Se elimino?");
    } else {
      // Enviar una alerta o manejar el caso en el que la orden no está en estado "Listo"
      alert("La orden no está lista para ser entregada");
    }
  };



  const context = { riders, removeRider };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);
