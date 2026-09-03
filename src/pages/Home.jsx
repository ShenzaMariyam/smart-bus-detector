import Navbar from "../components/Navbar";
import BusList from "../components/BusList";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <h1>Find Your Bus</h1>

          <p>
            Track buses and know when they will arrive.
          </p>

          <button>View Buses</button>
        </section>

        <BusList />
      </main>
    </>
  );
}

export default Home;