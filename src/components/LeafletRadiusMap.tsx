"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface LeafletRadiusMapProps {
  center: [number, number];
  radiusKm: number;
  onPick: (lat: number, lng: number) => void;
}

export default function LeafletRadiusMap({ center, radiusKm, onPick }: LeafletRadiusMapProps) {
  return (
    <MapContainer center={center} zoom={11} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onPick={onPick} />
      <Marker position={center} />
      <Circle center={center} radius={radiusKm * 1000} pathOptions={{ color: "#146B6B", fillOpacity: 0.15 }} />
      <RecenterOnChange center={center} />
    </MapContainer>
  );
}

function RecenterOnChange({ center }: { center: [number, number] }) {
  useEffect(() => {}, [center]);
  return null;
}