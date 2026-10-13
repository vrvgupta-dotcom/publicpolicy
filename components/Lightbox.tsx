"use client";

import { useEffect } from "react";
import Image from "next/image";

interface Props {
  src: string;
  title: string;
  onClose: () => void;
}

export default function Lightbox({ src, title, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} />
        <div className="lightbox-title">{title}</div>
      </div>
    </div>
  );
}
