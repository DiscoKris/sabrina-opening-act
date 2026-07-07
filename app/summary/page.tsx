"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlideBackground } from "@/components/SlideBackground";
import {
  phaseTwoStorageKeys,
  readStoredItem,
  topTenContestants,
} from "@/lib/site";

type StoredContestant = (typeof topTenContestants)[number];

export default function SummaryPage() {
  const [mounted, setMounted] = useState(false);
  const [winner, setWinner] = useState<StoredContestant | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedWinner = readStoredItem<StoredContestant>(
        window.localStorage,
        phaseTwoStorageKeys.finalOpeningActWinner,
      );

      if (!storedWinner) {
        setWinner(topTenContestants[0] ?? null);
        setMounted(true);
        return;
      }

      setWinner(storedWinner);
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <SlideBackground>
      <section className="winner-reveal-slide">
        <h1 className="winner-reveal-phase-title">SUMMARY</h1>

        <div className="winner-reveal-panel">
          <div className="winner-reveal-frame">
            {mounted && winner ? (
              <Image
                src="/sabrina2.jpg"
                alt="Sabrina Carpenter"
                width={420}
                height={420}
                className="winner-reveal-image"
              />
            ) : null}
          </div>
          <div className="winner-reveal-copy">
            <p className="winner-reveal-summary">
              Sabrina&apos;s Opening Act is a global music competition series that
              follows ten emerging pop artists competing for the opportunity of a
              lifetime, becoming Sabrina Carpenter&apos;s official opening act.
              Across international cities, contestants face performance
              challenges inspired by each location, battle local challengers,
              and unlock escalating access to Sabrina&apos;s world through each
              round. The journey builds from city prizes to stadium semi-finals
              and ends in a final showdown where the winner becomes Sabrina
              Carpenter&apos;s official opening act.
            </p>
            <Link href="/" className="next-slide-button next-slide-button-inline winner-reveal-button">
              <span>BACK HOME</span>
              <span className="next-slide-button-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </SlideBackground>
  );
}
