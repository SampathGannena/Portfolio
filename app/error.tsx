"use client";

import { useEffect } from "react";
import PortfolioLoader from "@/components/PortfolioLoader";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio page failed to load:", error);
  }, [error]);

  return <PortfolioLoader error reset={reset} />;
}
