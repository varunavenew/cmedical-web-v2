"use client";
import { FC } from "react";
import MapGl from "react-map-gl";
import { GeopointValue } from "sanity";

interface Props {
  center: Pick<GeopointValue, "lat" | "lng">;
  interactive?: boolean;
}

export const Map: FC<Props> = ({ center, interactive = false }) => {
  return (
    <MapGl
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        latitude: center.lat,
        longitude: center.lng,
        zoom: 17,
      }}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
      interactive={interactive}
    />
  );
};
