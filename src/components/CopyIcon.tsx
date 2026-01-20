import { FC } from "react";

export const CopyIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3.7 1.5h6.8v8.4h1.2V.3h-8v1.2ZM2 4.2h5.6v6.6H2V4.2ZM.8 3h8v9h-8V3Z"
      clipRule="evenodd"
    />
  </svg>
);
