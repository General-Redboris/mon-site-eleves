"use client";

import { useState } from "react";

interface Props {
  terme: string;
  definition: string;
  children?: React.ReactNode;
}

export default function VocabHighlight({ terme, definition, children }: Props) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="tooltip-trigger relative inline"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={(e) => {
        e.preventDefault();
        setShow((s) => !s);
      }}
    >
      {children || terme}
      {show && <span className="vocab-tooltip">{definition}</span>}
    </span>
  );
}
