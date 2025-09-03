"use client";

import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { BiHome, BiMapPin, BiX } from "react-icons/bi";
import { IRoom } from "@/types/room";
interface RoomMapClusterProps {
  rooms: IRoom[];
}

export default function RoomMapCluster({ rooms }: RoomMapClusterProps) {
  const [selectedRooms, setSelectedRooms] = useState<IRoom[] | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",

    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    const markers = rooms.map((room) => {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(room?.building?.lat),
          lng: Number(room?.building?.lng),
        },
        title: room.title,
      });
      (marker as any).room = room;
      marker.addListener("click", () => setSelectedRooms([room]));
      return marker;
    });
    new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ count, position }) =>
          new google.maps.Marker({
            position,
            label: {
              text: String(count),
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#1E88E5",
              fillOpacity: 0.9,
              strokeColor: "#fff",
              strokeWeight: 2,
              scale: Math.max(30, Math.min(50, count * 2)),
            },
          }),
      },
      onClusterClick: (_ev, cluster, _m) => {
        const clusterRooms = cluster.markers
          .map((m) => (m as any).room as IRoom)
          .filter(Boolean);
        setSelectedRooms(clusterRooms);
      },
    });

    // Click ra ngoài map để đóng popup
    map.addListener("click", () => setSelectedRooms(null));
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        Đang tải bản đồ...
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full">
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: 21.0285, lng: 105.804 }}
        zoom={13}
        options={{ streetViewControl: false, mapTypeControl: false }}
      />

      {/* Popup danh sách phòng theo style bạn muốn */}
      {selectedRooms && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-blue-600 p-4">
              <div className="text-white">
                <h3 className="text-lg font-semibold">Danh sách phòng</h3>
                <p className="text-sm text-blue-100">
                  {selectedRooms.length} phòng
                </p>
              </div>
              <button
                onClick={() => setSelectedRooms(null)}
                className="rounded-full p-1 text-white hover:bg-blue-700"
              >
                <BiX size={20} />
              </button>
            </div>

            <div className="max-h-96 divide-y overflow-y-auto">
              {selectedRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <BiHome
                        className="text-blue-600"
                        size={20}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-medium text-gray-900">
                        {room.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <BiMapPin size={12} />
                        <span className="truncate">
                          {room?.building?.specific_address}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <span className="text-sm font-semibold text-blue-600">
                          {room?.room_price}/tháng
                        </span>
                        <span className="text-xs text-gray-400">
                          {room?.building.ward},{" "}
                          {room?.building?.district?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t bg-gray-50 p-4">
              <button
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                onClick={() => setSelectedRooms(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
