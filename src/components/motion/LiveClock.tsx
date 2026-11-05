"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

function format(date: Date, seconds: boolean) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
    hour12: false,
  }).format(date);
}

/**
 * Live local time in Lahore (Asia/Karachi). Renders a stable "--:--" on the
 * server so static HTML never shows a stale build-time clock.
 */
export function LiveClock({
  seconds = false,
  label = true,
  className,
}: {
  seconds?: boolean;
  label?: boolean;
  className?: string;
}) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format(new Date(), seconds));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [seconds]);

  const placeholder = seconds ? "--:--:--" : "--:--";
  const value = now ?? placeholder;
  const [hh, mm, ss] = value.split(":");

  return (
    <span className={className}>
      {label && <span>{site.timeZoneLabel} </span>}
      <time
        aria-label={now ? `Local time in Lahore: ${value}` : "Local time in Lahore"}
        className="tabular-nums"
        suppressHydrationWarning
      >
        {hh}
        <span className="clock-colon">:</span>
        {mm}
        {seconds && ss && (
          <>
            <span className="clock-colon">:</span>
            {ss}
          </>
        )}
      </time>
    </span>
  );
}
