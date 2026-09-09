function Navbar({ onNavigate }) {
  const handleClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <nav>
      <h2 style={{ cursor: "pointer" }} onClick={(e) => handleClick(e, "/")}>
        🚌 Smart Bus Time Detector
      </h2>

      <div>
        <a href="/" onClick={(e) => handleClick(e, "/")}>
          Home
        </a>
        <a href="/buses" onClick={(e) => handleClick(e, "/buses")}>
          Buses
        </a>
        <a href="/map" onClick={(e) => handleClick(e, "/map")}>
          Map
        </a>
      </div>
    </nav>
  );
}

export default Navbar;