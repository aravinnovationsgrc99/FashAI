"use client";

import { useState } from "react";
import ConciergeTrigger from "./ConciergeTrigger";
import ConciergePanel from "./ConciergePanel";

export default function FashAiConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ConciergeTrigger isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />
      <ConciergePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
