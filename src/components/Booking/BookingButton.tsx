import { FC, MouseEventHandler, PropsWithChildren } from "react";

interface Props {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const BookingButton: FC<PropsWithChildren<Props>> = ({
  disabled,
  onClick,
  children,
}) => (
  <button
    className="bg-black/5 rounded-10 block p-25 hover:enabled:bg-yellow focus-visible:enabled:bg-yellow disabled:text-black/30 disabled:bg-black/2"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
