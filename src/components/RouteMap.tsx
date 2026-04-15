import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const modeColors: Record<string, string> = {
  Walk: "#a3e635",
  Auto: "#f59e0b",
  Metro: "#3b82f6",
  Bus: "#8b5cf6",
  Cycle: "#2dd4a8",
};

interface RouteCoords {
  id: string;
  label: string;
  segments: {
    mode: string;
    points: [number, number][];
  }[];
}

// Bangalore mock route coordinates
const routeCoords: RouteCoords[] = [
  {
    id: "1",
    label: "Fastest Multi-Modal",
    segments: [
      { mode: "Walk", points: [[12.9352, 77.6245], [12.9365, 77.6260]] },
      { mode: "Auto", points: [[12.9365, 77.6260], [12.9400, 77.6320], [12.9450, 77.6380], [12.9716, 77.6410]] },
      { mode: "Metro", points: [[12.9716, 77.6410], [12.9758, 77.6420], [12.9750, 77.6070]] },
      { mode: "Walk", points: [[12.9750, 77.6070], [12.9755, 77.6050]] },
    ],
  },
  {
    id: "2",
    label: "Budget Friendly",
    segments: [
      { mode: "Walk", points: [[12.9352, 77.6245], [12.9340, 77.6230]] },
      { mode: "Bus", points: [[12.9340, 77.6230], [12.9400, 77.6200], [12.9500, 77.6150], [12.9650, 77.6100], [12.9750, 77.6070]] },
      { mode: "Walk", points: [[12.9750, 77.6070], [12.9755, 77.6050]] },
    ],
  },
  {
    id: "3",
    label: "Green Route",
    segments: [
      { mode: "Cycle", points: [[12.9352, 77.6245], [12.9380, 77.6300], [12.9450, 77.6380], [12.9716, 77.6410]] },
      { mode: "Metro", points: [[12.9716, 77.6410], [12.9758, 77.6420], [12.9750, 77.6070]] },
      { mode: "Walk", points: [[12.9750, 77.6070], [12.9755, 77.6050]] },
    ],
  },
];

const startIcon = new L.DivIcon({
  html: `<div style="background:#2dd4a8;width:14px;height:14px;border-radius:50%;border:3px solid #0d1b2a;box-shadow:0 0 8px #2dd4a8"></div>`,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const endIcon = new L.DivIcon({
  html: `<div style="background:#f59e0b;width:14px;height:14px;border-radius:50%;border:3px solid #0d1b2a;box-shadow:0 0 8px #f59e0b"></div>`,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function FitBounds({ coords }: { coords: RouteCoords | null }) {
  const map = useMap();
  useEffect(() => {
    if (!coords) {
      map.setView([12.9552, 77.6245], 13);
      return;
    }
    const allPts = coords.segments.flatMap((s) => s.points);
    if (allPts.length > 0) {
      map.fitBounds(allPts as L.LatLngBoundsExpression, { padding: [40, 40] });
    }
  }, [coords, map]);
  return null;
}

interface RouteMapProps {
  selectedRouteId: string | null;
}

const RouteMap = ({ selectedRouteId }: RouteMapProps) => {
  const activeRoute = routeCoords.find((r) => r.id === selectedRouteId) || null;
  const displayRoutes = activeRoute ? [activeRoute] : routeCoords;

  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 h-full min-h-[300px]">
      <MapContainer
        center={[12.9552, 77.6245]}
        zoom={13}
        style={{ height: "100%", width: "100%", minHeight: "300px" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <FitBounds coords={activeRoute} />

        {displayRoutes.map((route) =>
          route.segments.map((seg, i) => (
            <Polyline
              key={`${route.id}-${i}`}
              positions={seg.points}
              pathOptions={{
                color: modeColors[seg.mode] || "#2dd4a8",
                weight: activeRoute ? 5 : 3,
                opacity: activeRoute ? 0.9 : 0.5,
                dashArray: seg.mode === "Walk" ? "6 8" : undefined,
              }}
            />
          ))
        )}

        {/* Start & End markers */}
        <Marker position={[12.9352, 77.6245]} icon={startIcon}>
          <Popup className="dark-popup">
            <span className="text-xs font-medium">Koramangala 4th Block</span>
          </Popup>
        </Marker>
        <Marker position={[12.9755, 77.6050]} icon={endIcon}>
          <Popup className="dark-popup">
            <span className="text-xs font-medium">MG Road</span>
          </Popup>
        </Marker>

        {/* Mode legend */}
        {activeRoute && (
          <>
            {activeRoute.segments.map((seg, i) => {
              if (i === 0) return null;
              const pt = seg.points[0];
              const icon = new L.DivIcon({
                html: `<div style="background:${modeColors[seg.mode]};width:10px;height:10px;border-radius:50%;border:2px solid #0d1b2a"></div>`,
                className: "",
                iconSize: [10, 10],
                iconAnchor: [5, 5],
              });
              return (
                <Marker key={`node-${i}`} position={pt} icon={icon}>
                  <Popup>
                    <span className="text-xs">Switch to {seg.mode}</span>
                  </Popup>
                </Marker>
              );
            })}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
