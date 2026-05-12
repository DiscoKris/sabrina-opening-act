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

export default function WinnerPage() {
  const [mounted, setMounted] = useState(false);
  const [winner, setWinner] = useState<StoredContestant | null>(null);
  const [hasStoredWinner, setHasStoredWinner] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedWinner = readStoredItem<StoredContestant>(
        window.localStorage,
        phaseTwoStorageKeys.finalOpeningActWinner,
      );

      if (storedWinner) {
        setWinner(storedWinner);
        setHasStoredWinner(true);
        setMounted(true);
        return;
      }

      setWinner(topTenContestants[0] ?? null);
      setHasStoredWinner(false);
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <SlideBackground>
      <section className="winner-reveal-slide winner-page-slide">
        <h1 className="winner-reveal-phase-title">WINNER</h1>

        <div className="winner-reveal-panel winner-page-panel">
          <div className="winner-reveal-frame winner-page-frame">
            {mounted && winner ? (
              <Image
                src={winner.src}
                alt={winner.name}
                width={520}
                height={520}
                className="winner-reveal-image"
              />
            ) : null}
          </div>

          <div className="winner-reveal-copy winner-page-copy">
            <p className="winner-reveal-summary winner-page-summary">
              The winner of the competition stays on the rest of the tour with
              Sabrina and signs a lucrative record contract.
            </p>
            {!hasStoredWinner ? (
              <p className="winner-page-fallback">
                No saved winner was found. Return to the final and select your
                winner to personalize this reveal.
              </p>
            ) : null}
            <Link
              href={hasStoredWinner ? "/why-sabrina" : "/phase-three/final"}
              className="next-slide-button next-slide-button-inline winner-reveal-button"
            >
              <span>{hasStoredWinner ? "CONTINUE" : "RETURN TO FINAL"}</span>
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
