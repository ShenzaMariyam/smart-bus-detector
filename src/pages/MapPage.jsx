import Navbar from "../components/Navbar";
import BusMap from "../components/Map/BusMap";

function MapPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <h1>Bus Map 🗺️</h1>
          <p>Track buses in real time.</p>
        </section>

        <BusMap />
      </main>
    </>
  );
}

export default MapPage;