"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  dys: boolean;
  toggleDys: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  dys: false,
  toggleDys: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [dys, setDys] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage / system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    const storedDys = localStorage.getItem("dys");
    if (storedDys === "true") {
      setDys(true);
    }

    setMounted(true);
  }, []);

  // Apply classes to <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    if (dys) {
      root.classList.add("dys");
    } else {
      root.classList.remove("dys");
    }
    localStorage.setItem("dys", String(dys));
  }, [dys, mounted]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  function toggleDys() {
    setDys((d) => !d);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, dys, toggleDys }}>
      {children}
    </ThemeContext.Provider>
  );
}
