"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionSection({ title, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  // Set initial height after mount
  useEffect(() => {
    if (contentRef.current && open) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, []);

  return (
    <div className="mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 text-left group"
      >
        <span
          className={`accordion-chevron text-gray-400 text-sm ${open ? "rotated" : ""}`}
        >
          ▶
        </span>
        <span className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {title}
        </span>
      </button>
      <div
        ref={contentRef}
        className="accordion-content overflow-hidden transition-all duration-300"
        style={{ maxHeight: height, opacity: open ? 1 : 0 }}
      >
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}
