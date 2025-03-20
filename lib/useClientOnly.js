"use client";

import { useState, useEffect } from "react";

// Custom hook to safely use browser APIs like localStorage
export default function useClientOnly() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
