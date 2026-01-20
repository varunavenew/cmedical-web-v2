import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { Error } from "./Error";

interface Props {
  language: string;
  title?: string;
  className?: string;
  error?: boolean;
}

export const BookingStep: FC<PropsWithChildren<Props>> = ({
  language,
  title,
  className,
  error,
  children,
}) => (
  <div className={classNames("flex-grow w-full flex flex-col", className)}>
    <div className="w-full max-w-450 mx-auto">
      {title && (
        <h2 className="text-medium mx-40 mt-40 md:mt-60 text-center">
          {title}
        </h2>
      )}
    </div>
    {error ? <Error language={language} /> : children}
  </div>
);
