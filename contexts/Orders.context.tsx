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

  const pickup = (order: Order): boolean => {
    console.log(order);
    if (order.state === StateType.ready) {
      setOrders((prevOrders) => {
        // Utilizar prevOrders, que representa el estado anterior de orders
        const updatedOrders = prevOrders.map((target) => {
          // Si el elemento de la iteración es el mismo que hemos clickeado, le seteamos el estado.
          if (target.id === order.id) {
            return { ...target, state: StateType.delivered }; // Devolver un nuevo objeto con el estado actualizado
          }
          return target;
        });
        return updatedOrders; // Devolver el nuevo array de orders actualizado
      });
      return true;
    }
    return false;
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
