import React, { useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

type Room = {
  id: number;
  lat: number;
  lng: number;
  title: string;
};

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 21.0278, // Hà Nội
  lng: 105.8342,
};

// Mock data phòng trọ
const rooms: Room[] = [
  { id: 1, lat: 21.0301, lng: 105.8355, title: "Phòng trọ 1" },
  { id: 2, lat: 21.0295, lng: 105.8348, title: "Phòng trọ 2" },
  { id: 3, lat: 21.0289, lng: 105.8339, title: "Phòng trọ 3" },
  { id: 4, lat: 21.025, lng: 105.831, title: "Phòng trọ 4" },
  // Bạn có thể thêm nhiều tọa độ khác
];

const RoomMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCCB-lX1pnN4VF6y4tMfU318Y5GsLPWU5E", // 🔹 Thay bằng API Key của bạn
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Tạo markers
    const markers = rooms.map((room) => {
      return new google.maps.Marker({
        position: { lat: room.lat, lng: room.lng },
        title: room.title,
      });
    });

    // Gom cluster
    new MarkerClusterer({ markers, map });
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      mapTypeId="roadmap"
    
    />
  ) : (
    <div>Đang tải bản đồ...</div>
  );
};

export default RoomMap;
