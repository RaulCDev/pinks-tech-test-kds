import { Order, StateType } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
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
  const [orders, setOrders] = useState<Array<Order>>([]);

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

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  const pickup = (order: Order) => {
    alert(
      "necesitamos eliminar del kanban a la orden recogida! Rapido! antes que nuestra gente de tienda se confunda!"
    );
  };

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
