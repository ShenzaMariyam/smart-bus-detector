import Navbar from "../components/Navbar";
import BusList from "../components/BusList";

function Home({ onNavigate }) {
  const handleViewBuses = () => {
    if (onNavigate) {
      window.history.pushState({}, "", "/buses");
      onNavigate("/buses");
    } else {
      window.location.href = "/buses";
    }
  };

  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <main>
        <section className="hero">
          <h1>Find Your Bus</h1>

          <p>
            Track buses and know when they will arrive.
          </p>

          <button onClick={handleViewBuses}>View Buses</button>
        </section>

        <BusList />
      </main>
    </>
  );
}

export default Home;