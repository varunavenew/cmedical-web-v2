import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

export const ValuePropositionComponent: FC<
  PropsWithChildren<ValueProposition & { className?: string }>
> = ({
  className,
  socialProof,
  valueProposition1,
  valueProposition2,
  children,
}) => (
  <div
    className={classNames(
      "grid grid-cols-2 grid-rows-valueprop md:grid-rows-valueproplg place-items-center",
      className
    )}
  >
    <div className="p-20">
      <p className="hyphens-auto">{valueProposition1}</p>
    </div>
    <div className="p-20">
      <p className="hyphens-auto">{valueProposition2}</p>
    </div>
    <div className="col-span-2 px-50 py-25 mx-auto flex justify-center items-center max-w-full">
      {children}
    </div>
    <div className="col-span-2 p-20">
      <p className="hyphens-auto">{socialProof}</p>
    </div>
  </div>
);
