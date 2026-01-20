import { FC } from "react";
import { BookingButtonContainer } from "./BookingButtonContainer";

const ITEMS = new Array(4).fill(null);

export const Loader: FC = () => (
  <BookingButtonContainer>
    {ITEMS.map((_, i) => (
      <div
        key={i}
        className="rounded-10 block p-40 bg-black/12 animate-skeleton"
      ></div>
    ))}
  </BookingButtonContainer>
);
