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
  <div
    className={classNames(
      "flex-grow w-full flex flex-col items-stretch",
      className
    )}
  >
    <div className="w-full max-w-2xl mx-auto mt-8 md:mt-10 px-4">
      {title && (
        <h2 className="text-2xl md:text-3xl font-light text-foreground text-center mb-6">
          {title}
        </h2>
      )}
      {error ? <Error language={language} /> : children}
    </div>
  </div>
);
