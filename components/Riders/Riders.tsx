import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";

export default function Riders() {
  const { riders } = useRiders();
  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {riders.map((rider) => (
          <Rider {...rider} />
        ))}
      </div>
    </section>
  );
}
