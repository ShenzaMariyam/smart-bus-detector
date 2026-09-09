import BusList from "../components/BusList";

function Home({ onNavigate }) {
  const navigate = (path) => {
    window.history.pushState({}, "", path);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">🚌</div>
          <div>
            <h2>Smart Bus</h2>
            <span>Time Detector</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className="nav-item active"
            onClick={() => navigate("/")}
          >
            <span>⌂</span>
            Home
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/buses")}
          >
            <span>🚌</span>
            Buses
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/map")}
          >
            <span>🗺</span>
            Live Map
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="tracking-status">
            <span className="status-dot"></span>
            <div>
              <strong>Live Tracking</strong>
              <small>Real-time bus updates</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">

        {/* Header */}
        <header className="topbar">
          <div>
            <h1>Good Morning!</h1>
            <p>Track buses and know when they will arrive.</p>
          </div>

          <div className="location">
            📍 College → City Center
          </div>
        </header>

        {/* Dashboard cards */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">🚌</div>
            <div>
              <span>Nearby Buses</span>
              <strong>5</strong>
              <small>Available near you</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">◷</div>
            <div>
              <span>Next Bus</span>
              <strong>8 min</strong>
              <small>Bus 101</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">↔</div>
            <div>
              <span>Active Routes</span>
              <strong>4</strong>
              <small>Currently operating</small>
            </div>
          </div>

        </section>

        {/* Main dashboard */}
        <section className="dashboard-grid">

          {/* Bus section */}
          <div className="bus-section">
            <div className="section-header">
              <div>
                <h2>Nearby Buses</h2>
                <p>Choose a bus to view more details</p>
              </div>

              <button
                className="view-all"
                onClick={() => navigate("/buses")}
              >
                View all →
              </button>
            </div>

            <div className="bus-cards">

              <div className="bus-card">
                <div className="bus-icon blue">🚌</div>

                <div className="bus-info">
                  <h3>Bus 101</h3>
                  <p>College → City Center</p>
                </div>

                <div className="bus-eta">
                  <span>ETA</span>
                  <strong>8 min</strong>
                </div>

                <span className="on-time">On Time</span>

                <span className="arrow">›</span>
              </div>

              <div className="bus-card">
                <div className="bus-icon purple">🚌</div>

                <div className="bus-info">
                  <h3>Bus 105</h3>
                  <p>College → Railway Station</p>
                </div>

                <div className="bus-eta">
                  <span>ETA</span>
                  <strong>14 min</strong>
                </div>

                <span className="on-time">On Time</span>

                <span className="arrow">›</span>
              </div>

              <div className="bus-card">
                <div className="bus-icon orange">🚌</div>

                <div className="bus-info">
                  <h3>Bus 110</h3>
                  <p>City Center → College</p>
                </div>

                <div className="bus-eta">
                  <span>ETA</span>
                  <strong>22 min</strong>
                </div>

                <span className="delayed">Delayed</span>

                <span className="arrow">›</span>
              </div>

              <div className="bus-card">
                <div className="bus-icon green">🚌</div>

                <div className="bus-info">
                  <h3>Bus 112</h3>
                  <p>College → Airport</p>
                </div>

                <div className="bus-eta">
                  <span>ETA</span>
                  <strong>28 min</strong>
                </div>

                <span className="on-time">On Time</span>

                <span className="arrow">›</span>
              </div>

            </div>
          </div>

          {/* Map preview */}
          <div className="map-card">

            <div className="map-header">
              <div>
                <h2>Live Map</h2>
                <p>Track buses in real time</p>
              </div>

              <button onClick={() => navigate("/map")}>
                Open Map
              </button>
            </div>

            <div className="map-preview">
              <div className="map-road road-1"></div>
              <div className="map-road road-2"></div>
              <div className="map-road road-3"></div>

              <div className="map-location college">
                <span>📍</span>
                College
              </div>

              <div className="map-location center">
                <span>📍</span>
                City Center
              </div>

              <div className="map-bus bus-one">🚌</div>
              <div className="map-bus bus-two">🚌</div>

              <div className="map-route"></div>
            </div>

          </div>

        </section>

        {/* Existing bus component */}
        <div className="existing-bus-list">
          <BusList />
        </div>

      </div>
    </div>
  );
}

export default Home;