import { cn } from "@/utils/utils";
import React, { Children, ReactNode } from "react";

type PropType = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, children } = props;

  return (
    <div
      className={cn(
        "embla-thumbs__slide",
        selected ? "embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        {children}
      </button>
    </div>
  );
};
