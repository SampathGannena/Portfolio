"use client";

import { RefreshCw } from "lucide-react";

interface PortfolioLoaderProps {
  error?: boolean;
  reset?: () => void;
}

export default function PortfolioLoader({ error = false, reset }: PortfolioLoaderProps) {
  return (
    <main className="portfolio-loader" aria-live="polite">
      <div className="loader-orbit loader-orbit-one" />
      <div className="loader-orbit loader-orbit-two" />
      <div className="loader-grid" />

      <section className="loader-card">
        <div className="loader-brand" aria-hidden="true">
          SG<span>.</span>
        </div>

        <div className="loader-signal" aria-hidden="true">
          <span className="loader-signal-core" />
          <span className="loader-signal-ring loader-signal-ring-one" />
          <span className="loader-signal-ring loader-signal-ring-two" />
        </div>

        <p className="loader-eyebrow">
          {error ? "Signal interrupted / recovery mode" : "Establishing connection"}
        </p>
        <h1>{error ? "The portfolio hit a rough edge." : "Building the experience."}</h1>
        <p className="loader-message">
          {error
            ? "The page could not finish loading. Restart the experience and try again."
            : "Loading projects, systems, and a few carefully placed details."}
        </p>

        {error ? (
          <button className="loader-retry" onClick={reset} type="button">
            <RefreshCw size={15} /> Restart experience
          </button>
        ) : (
          <div className="loader-progress" role="progressbar" aria-label="Loading portfolio">
            <span />
          </div>
        )}

        <div className="loader-status">
          <span className="loader-status-dot" />
          <span>{error ? "Awaiting retry" : "Loading interface modules"}</span>
          <span className="loader-status-code">{error ? "ERR / 503" : "SYS / 01"}</span>
        </div>
      </section>
    </main>
  );
}
