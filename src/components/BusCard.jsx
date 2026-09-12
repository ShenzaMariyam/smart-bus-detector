import { useState } from "react";

function BusCard({ bus }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bus-card">
      <h3>🚌 Bus {bus.busNumber}</h3>

      <p>{bus.route}</p>

      <p>
        <strong>Destination:</strong>{" "}
        {bus.route?.split("→")[1]?.trim() || "Destination"}
      </p>

      <p>
        <strong>Status:</strong> {bus.status}
      </p>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "View Details"}
      </button>

      {showDetails && (
        <div className="bus-details">
          <h4>Bus Details</h4>

          <p>
            <strong>Bus Number:</strong> {bus.busNumber}
          </p>

          <p>
            <strong>Route:</strong> {bus.route}
          </p>

          <p>
            <strong>Destination:</strong>{" "}
            {bus.route?.split("→")[1]?.trim() || "Destination"}
          </p>

          <p>
            <strong>Status:</strong> {bus.status}
          </p>
        </div>
      )}
    </div>
  );
}

export default BusCard;