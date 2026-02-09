"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  path: string;
}

export default function QRCodeModal({ path }: Props) {
  const [open, setOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Build full URL (will use window.location.origin at runtime)
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  function handlePrint() {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>QR Code</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
            p { margin-top: 1rem; font-size: 14px; color: #666; word-break: break-all; max-width: 300px; text-align: center; }
          </style>
        </head>
        <body>${content}<script>window.print();window.close();</script></body>
      </html>
    `);
    win.document.close();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
        title="QR Code de cette page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        QR Code
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">QR Code</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div ref={printRef} className="flex flex-col items-center">
              <QRCodeSVG value={fullUrl} size={200} level="M" />
              <p className="mt-3 text-xs text-gray-500 text-center break-all">{fullUrl}</p>
            </div>

            <p className="text-xs text-gray-400 text-center mt-3">
              Scanne ce QR code pour ouvrir cette page sur ton telephone.
            </p>

            <button
              onClick={handlePrint}
              className="mt-4 w-full py-2.5 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent/90 transition-colors"
            >
              Imprimer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
