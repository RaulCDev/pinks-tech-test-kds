import { Order, StateType } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import { useRiders } from './Riders.context';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type OrdersContextProps = {
  orders: Array<Order>;
  pickup: (order: Order) => void;
  updateOrderState: (order: Order, state: StateType) => void;
};

export const OrdersContext = createContext<OrdersContextProps>(
  // @ts-ignore
  {}
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [ orders, setOrders ] = useState<Array<Order>>([]);
  const { removeRider } = useRiders();

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  const pickup = (orderId: string) => {
    const updatedOrders = orders.map((target) => {
      // Verificar si riders está definido antes de filtrarlo
      if (removeRider && orderId && target.state === StateType.ready) {
        alert("Voy!")
        removeRider(orderId); // Llamamos a removeRider con el ID de la orden
      }
      // Si elemento de la iteración es el mismo que hemos clickeado y esta en "Listo", le seteamos el estado.
      if (target.id === orderId && target.state === StateType.ready) {
        target.state = StateType.delivered;
      }
      return target;
    });
    setOrders(updatedOrders);
  };

  const updateOrderState = (order: Order, state: StateType) => {
    const ref = orders.find((target) => target.id === order.id);
    if (!ref) {
      return;
    }

    const updatedOrders = orders.map((target) => {
      // Si elemento de la iteracion es el mismo que hemos clickado, le seteamos el status.
      if (target.id === order.id) {
        target.state = state;
      }
      return target;
    })
    setOrders(updatedOrders);
  }

  const context = {
    orders,
    pickup,
    updateOrderState,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
