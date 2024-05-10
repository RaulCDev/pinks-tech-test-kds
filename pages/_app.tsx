import { OrdersProvider } from "@/contexts/Orders.context";
import { RidersProvider } from "@/contexts/Riders.context";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OrdersProvider>
      <RidersProvider>
        <Component {...pageProps} />
      </RidersProvider>
    </OrdersProvider>
  );
}
