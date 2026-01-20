import Link from "next/link";
import { Map } from "./Map";
import { OPEN_MAP } from "../translations/open-map";
import { t } from "../translations/get-translation";
import { FC } from "react";

type Props = Pick<ClinicPage, "title" | "location" | "language">;

export const MapSection: FC<Props> = ({ title, location, language }) => {
  return (
    <div className="bg-skin5 grid md:h-screen grid-cols-1 grid-rows-1 aspect-square md:aspect-auto overflow-hidden">
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=C-medical+${title}&query_place_id=${location.placeId}`}
        rel="noopener noreferrer"
        target="_blank"
        className="opacity-80 peer col-start-1 row-start-1"
      >
        <Map center={location.location} />
      </Link>
      <div className="pill bg-white col-start-1 row-start-1 place-self-center pointer-events-none peer-hover:bg-opacity-80 backdrop-blur">
        <span>
          {t(OPEN_MAP, language)} <span className="opacity-30">&rsaquo;</span>
        </span>
      </div>
    </div>
  );
};
