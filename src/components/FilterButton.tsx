import { FC } from "react";
import { Pill } from "./Pill";
import { CloseIcon } from "./Icons/CloseIcon";

interface Props {
  filterFunction: (title: string) => void;
  title: string;

  selected: boolean;
}

export const FilterButton: FC<Props> = ({
  filterFunction,
  title,
  selected,
}) => {
  const handleClick = () => {
    if (selected) {
      filterFunction("");
    } else {
      filterFunction(title);
    }
  };

  const span = selected ? <CloseIcon /> : null;
  const bg = selected
    ? "bg-white backdrop-blur transition-none "
    : "bg-black bg-opacity-5";
  const bgHover = !selected ? "md:hover:bg-opacity-10" : "";

  return (
    <button onClick={handleClick}>
      <Pill text={title} bg={bg} bgHover={bgHover} span={span} />
    </button>
  );
};
