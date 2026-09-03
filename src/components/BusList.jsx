import BusCard from "./BusCard";
import sampleBuses from "../data/sampleBuses";

function BusList() {
  return (
    <section>
      <h2>Nearby Buses</h2>

      <div className="bus-list">
        {sampleBuses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </section>
  );
}

export default BusList;