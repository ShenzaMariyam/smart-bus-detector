function BusCard({ bus }) {
  return (
    <div className="bus-card">
      <h3>🚌 Bus {bus.busNumber}</h3>

      <p>{bus.route}</p>

      <p>
        <strong>ETA:</strong> {bus.eta} minutes
      </p>

      <p>
        <strong>Status:</strong> {bus.status}
      </p>

      <button>View Details</button>
    </div>
  );
}

export default BusCard;