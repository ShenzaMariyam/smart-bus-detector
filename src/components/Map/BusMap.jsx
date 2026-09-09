import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import L from "leaflet";

import { listenToBuses } from "../../services/firebase/busService";

const busIcon = L.divIcon({
    html: '<div style="font-size: 45px;">🚌</div>',
    className: "bus-icon",
   iconSize: [35, 35],
iconAnchor: [17, 17]
});

function BusMap() {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        const unsubscribe = listenToBuses((data) => {
            setBuses(data);
        });

        return () => unsubscribe();
    }, []);

    return (
        <MapContainer
            center={[12.9716, 77.5946]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {buses.map((bus) => (
                <Marker
                    key={bus.id}
                    position={[bus.latitude, bus.longitude]}
                    icon={busIcon}
                >
                    <Popup>
                        <strong>🚌 Bus {bus.busNumber}</strong>
                        <br />
                        Route: {bus.route}
                        <br />
                        ETA: {bus.eta} minutes
                        <br />
                        Status: {bus.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default BusMap;