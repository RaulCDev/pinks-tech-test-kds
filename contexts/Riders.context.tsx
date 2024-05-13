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
            pickup: () => {
              if (pickup(order) && riders) {
                console.log(riders);
                setRiders((prevRiders) => {
                  // Filtrar el array de riders para excluir el rider que queremos eliminar
                  const updatedRiders = prevRiders.filter((rider) => rider.orderWanted !== order.id);
                  return updatedRiders; // Devolver el nuevo array de riders actualizado sin el rider eliminado
                });
              }
            }
          },
        ]);
      }, getRandomInterval(4_000, 10_000));
    }
  }, [orders]);

  const context = { riders };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);
