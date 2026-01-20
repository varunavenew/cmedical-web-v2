import { FC, PropsWithChildren } from "react";

export const BookingButtonContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-20 w-full max-w-450 mt-40 md:mt-60 mx-auto">
    {children}
  </div>
);
