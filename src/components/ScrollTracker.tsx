"use client";

import { useEffect, useRef } from "react";
import { markCoursVu } from "@/lib/progression";

interface Props {
  niveau: string;
  matiere: string;
  slug: string;
}

export default function ScrollTracker({ niveau, matiere, slug }: Props) {
  const tracked = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (tracked.current) return;
      const scrollPercent =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent >= 0.8) {
        tracked.current = true;
        markCoursVu(niveau, matiere, slug);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [niveau, matiere, slug]);

  return null;
}
