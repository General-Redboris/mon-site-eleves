"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import type { VocabEntry, DateCle, MethodeLiee } from "@/lib/courses";

interface Props {
  titre: string;
  children: ReactNode;
  vocabulaire?: VocabEntry[];
  resume?: string;
  dates_cles?: DateCle[];
  methodes_liees?: MethodeLiee[];
  niveau: string;
  matiere: string;
  slug: string;
}

export default function CoursClient({
  titre,
  children,
  vocabulaire,
  resume,
  dates_cles,
  methodes_liees,
}: Props) {
  const [mode, setMode] = useState<"complet" | "synthese">("complet");
  const [allOpen, setAllOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Accordion: wrap h2 sections
  const toggleAccordions = useCallback(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h2");
    headings.forEach((h2) => {
      // Skip if already processed
      if (h2.dataset.accordion === "done") return;
      h2.dataset.accordion = "done";

      // Collect siblings until next h2 or end
      const siblings: Element[] = [];
      let next = h2.nextElementSibling;
      while (next && next.tagName !== "H2") {
        siblings.push(next);
        next = next.nextElementSibling;
      }

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "accordion-content";
      wrapper.style.maxHeight = "2000px";
      wrapper.style.opacity = "1";

      // Move siblings into wrapper
      siblings.forEach((s) => wrapper.appendChild(s));
      h2.after(wrapper);

      // Add chevron and click handler
      const chevron = document.createElement("span");
      chevron.className = "accordion-chevron rotated inline-block mr-2 text-gray-400 text-xs";
      chevron.textContent = "▶";
      h2.prepend(chevron);
      h2.style.cursor = "pointer";
      h2.addEventListener("click", () => {
        const isCollapsed = wrapper.classList.contains("collapsed");
        if (isCollapsed) {
          wrapper.classList.remove("collapsed");
          wrapper.style.maxHeight = `${wrapper.scrollHeight}px`;
          wrapper.style.opacity = "1";
          chevron.classList.add("rotated");
        } else {
          wrapper.classList.add("collapsed");
          wrapper.style.maxHeight = "0px";
          wrapper.style.opacity = "0";
          chevron.classList.remove("rotated");
        }
      });
    });
  }, []);

  // Vocabulary tooltips: wrap matching terms
  const applyTooltips = useCallback(() => {
    if (!contentRef.current || !vocabulaire || vocabulaire.length === 0) return;

    const walker = document.createTreeWalker(
      contentRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          // Skip headings, blockquotes, already-processed tooltips, alertes
          if (
            ["H1", "H2", "H3", "H4", "BUTTON", "A"].includes(tag) ||
            parent.closest(".tooltip-trigger") ||
            parent.closest(".alerte-ia") ||
            parent.closest("blockquote")
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const textNodes: Text[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    for (const vocab of vocabulaire) {
      const regex = new RegExp(`\\b(${vocab.terme.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "gi");
      for (const textNode of textNodes) {
        if (!textNode.parentNode) continue;
        const text = textNode.textContent || "";
        if (!regex.test(text)) continue;
        regex.lastIndex = 0;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        let replaced = false;

        while ((match = regex.exec(text)) !== null) {
          if (match.index > lastIndex) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
          }
          const span = document.createElement("span");
          span.className = "tooltip-trigger relative inline";
          span.textContent = match[1];

          const tip = document.createElement("span");
          tip.className = "vocab-tooltip hidden";
          tip.textContent = vocab.definition;
          span.appendChild(tip);

          span.addEventListener("mouseenter", () => tip.classList.remove("hidden"));
          span.addEventListener("mouseleave", () => tip.classList.add("hidden"));
          span.addEventListener("touchstart", (e) => {
            e.preventDefault();
            tip.classList.toggle("hidden");
          });

          frag.appendChild(span);
          lastIndex = regex.lastIndex;
          replaced = true;
        }

        if (replaced) {
          if (lastIndex < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
          }
          textNode.parentNode.replaceChild(frag, textNode);
        }
      }
    }
  }, [vocabulaire]);

  useEffect(() => {
    if (mode === "complet") {
      // Small delay to ensure MDX content is rendered
      const timer = setTimeout(() => {
        toggleAccordions();
        applyTooltips();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mode, toggleAccordions, applyTooltips]);

  // Toggle all accordions
  function handleToggleAll() {
    if (!contentRef.current) return;
    const wrappers = contentRef.current.querySelectorAll(".accordion-content");
    const chevrons = contentRef.current.querySelectorAll(".accordion-chevron");
    const newState = !allOpen;
    setAllOpen(newState);

    wrappers.forEach((w) => {
      const el = w as HTMLElement;
      if (newState) {
        el.classList.remove("collapsed");
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.opacity = "1";
      } else {
        el.classList.add("collapsed");
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
      }
    });
    chevrons.forEach((c) => {
      if (newState) {
        c.classList.add("rotated");
      } else {
        c.classList.remove("rotated");
      }
    });
  }

  const hasSynthese = resume || (vocabulaire && vocabulaire.length > 0) || (dates_cles && dates_cles.length > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-10 transition-colors">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
        {titre}
      </h1>

      {/* Mode toggle */}
      {hasSynthese && (
        <div className="flex items-center gap-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-fit">
          <button
            onClick={() => setMode("complet")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "complet"
                ? "bg-white dark:bg-gray-600 text-foreground shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-foreground"
            }`}
          >
            Cours complet
          </button>
          <button
            onClick={() => setMode("synthese")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "synthese"
                ? "bg-white dark:bg-gray-600 text-foreground shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-foreground"
            }`}
          >
            Fiche de synthese
          </button>
        </div>
      )}

      {/* Synthese mode */}
      {mode === "synthese" && (
        <div className="space-y-6">
          {resume && (
            <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-xl border border-accent/10">
              <p className="text-sm font-medium text-accent mb-1">Resume du chapitre</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{resume}</p>
            </div>
          )}

          {vocabulaire && vocabulaire.length > 0 && (
            <div className="p-4 bg-geographie-light rounded-xl border border-geographie/10">
              <p className="text-sm font-medium text-geographie mb-2">Vocabulaire cle</p>
              <dl className="space-y-1">
                {vocabulaire.map((v) => (
                  <div key={v.terme} className="flex gap-2 text-sm">
                    <dt className="font-semibold text-foreground min-w-[120px]">{v.terme}</dt>
                    <dd className="text-gray-600 dark:text-gray-400">{v.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {dates_cles && dates_cles.length > 0 && (
            <div className="p-4 bg-histoire-light rounded-xl border border-histoire/10">
              <p className="text-sm font-medium text-histoire mb-2">Dates cles</p>
              <ul className="space-y-1 text-sm">
                {dates_cles.map((d) => (
                  <li key={d.date} className="flex gap-2">
                    <span className="font-bold text-foreground">{d.date}</span>
                    <span className="text-gray-600 dark:text-gray-400">{d.evenement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {methodes_liees && methodes_liees.length > 0 && (
            <div className="p-4 bg-emc-light rounded-xl border border-emc/10">
              <p className="text-sm font-medium text-emc mb-2">Fiches methode liees</p>
              <div className="flex flex-wrap gap-2">
                {methodes_liees.map((m) => (
                  <a
                    key={m.slug}
                    href={`/methodes/${m.niveau}/${m.slug}`}
                    className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-emc transition-colors"
                  >
                    <span>📋</span>
                    <span>{m.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Complet mode */}
      {mode === "complet" && (
        <>
          {/* Toggle all button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleToggleAll}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
            >
              {allOpen ? "▼ Tout replier" : "▶ Tout deplier"}
            </button>
          </div>

          {/* MDX Content */}
          <div ref={contentRef} className="prose max-w-none text-foreground">
            {children}
          </div>

          {/* Methodes liees at bottom */}
          {methodes_liees && methodes_liees.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-emc mb-3">Fiches methode liees</p>
              <div className="flex flex-wrap gap-2">
                {methodes_liees.map((m) => (
                  <a
                    key={m.slug}
                    href={`/methodes/${m.niveau}/${m.slug}`}
                    className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-emc-light border border-emc/10 hover:border-emc transition-colors"
                  >
                    <span>📋</span>
                    <span>{m.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
