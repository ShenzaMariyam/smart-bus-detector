import Navbar from "../components/Navbar";
import BusList from "../components/BusList";

function Buses({ onNavigate }) {
  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <main>
        <BusList />
      </main>
    </>
  );
}

export default Buses;
