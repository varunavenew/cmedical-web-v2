import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & { className?: string };

export const Grid = ({ className, children }: Props) => (
  <div className={classNames("grid md:grid-cols-2", className)}>{children}</div>
);

const FirstCol = ({ className, children }: Props) => (
  <div className={classNames("col-start-1", className)}>{children}</div>
);

const StickyCol = ({ className, children }: Props) => (
  <div className={classNames("md:sticky top-0 col-start-1", className)}>
    {children}
  </div>
);

const SecondCol = ({ className, children }: Props) => (
  <div className={classNames("md:col-start-2", className)}>{children}</div>
);

const FullCol = ({ className, children }: Props) => (
  <div className={classNames("md:col-span-2", className)}>{children}</div>
);

Grid.FirstCol = FirstCol;
Grid.StickyCol = StickyCol;
Grid.SecondCol = SecondCol;
Grid.FullCol = FullCol;
