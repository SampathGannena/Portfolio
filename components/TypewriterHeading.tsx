"use client";

import { useEffect, useMemo, useState } from "react";

interface TypewriterSegment {
  text: string;
  emphasis?: boolean;
}

interface TypewriterHeadingProps {
  segments: TypewriterSegment[];
  className?: string;
  speed?: number;
}

export default function TypewriterHeading({
  segments,
  className = "",
  speed = 62,
}: TypewriterHeadingProps) {
  const fullText = useMemo(() => segments.map((segment) => segment.text).join(""), [segments]);
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    setVisibleCharacters(0);
    const timer = window.setInterval(() => {
      setVisibleCharacters((current) => {
        if (current >= fullText.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [fullText, speed]);

  let charactersBeforeSegment = 0;

  return (
    <h1 className={`typewriter-heading ${className}`}>
      {segments.map((segment) => {
        const segmentStart = charactersBeforeSegment;
        const segmentEnd = segmentStart + segment.text.length;
        const visibleText = fullText.slice(segmentStart, Math.min(visibleCharacters, segmentEnd));
        charactersBeforeSegment = segmentEnd;

        return (
          <span key={`${segment.text}-${segmentStart}`} className={segment.emphasis ? "typewriter-emphasis" : undefined}>
            {visibleText}
          </span>
        );
      })}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </h1>
  );
}
