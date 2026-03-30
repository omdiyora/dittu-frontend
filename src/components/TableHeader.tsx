import React from "react";

type Props = {
  label: string;
  selector: string;
  highlighter: any;
  handleSort?: any;
  className: string;
  sort?: boolean;
};
const TableHeader = ({
  label,
  selector,
  highlighter,
  handleSort,
  className,
  sort = true,
}: Props) => {
  const handleSelector = () => {
    let order = "asc";
    if (highlighter.selector == selector) {
      order = highlighter.order == "asc" ? "desc" : "asc";
    }
    handleSort(selector, order);
  };
  return (
    <div
      className={`p-3 flex bg-gray-300 justify-between hover:bg-gray-500 hover:text-white items-center w-96 bg-accent
      ${className}`}
      onClick={() => handleSelector()}
    >
      {label}
    </div>
  );
};

export default TableHeader;
