"use client";

import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const el = fillRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (scrollTop / total) * 100 : 0;
      el.style.width = `${pct}%`;
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-fill" ref={fillRef} />
    </div>
  );
}
