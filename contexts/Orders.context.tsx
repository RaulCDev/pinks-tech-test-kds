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
        const updatedOrders = prevOrders.map((target) => {
          if (target.id === order.id) {
            return { ...target, state: StateType.delivered };
          }
          return target;
        });
        return updatedOrders;
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
