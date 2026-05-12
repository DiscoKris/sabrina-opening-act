"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NextSlideButton } from "@/components/NextSlideButton";
import { SlideBackground } from "@/components/SlideBackground";
import {
  phaseTwoStorageKeys,
  readStoredItem,
  topTenContestants,
} from "@/lib/site";

type StoredContestant = (typeof topTenContestants)[number];

const remainingFinalistSlots = [
  {
    label: "Episode 3 Winner",
    subtitle: "OPENS IN ROME",
  },
  {
    label: "Episode 4 Winner",
    subtitle: "OPENS IN LONDON",
  },
  {
    label: "Episode 5 Winner",
    subtitle: "OPENS IN PARIS",
  },
  {
    label: "Episode 6 Winner",
    subtitle: "OPENS IN BERLIN",
  },
  {
    label: "Episode 7 Winner",
    subtitle: "OPENS IN BARCELONA",
  },
];

const challengerContestant: StoredContestant = {
  index: 99,
  name: "Local Challenger",
  src: "/conchallenger.png",
};

export default function MadridResultPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [winner, setWinner] = useState<StoredContestant | null>(null);
  const [eliminatedArtist, setEliminatedArtist] =
    useState<StoredContestant | null>(null);
  const [finalistsUnlocked, setFinalistsUnlocked] = useState(false);

  useEffect(() => {
    const storedWinner = readStoredItem<StoredContestant>(
      window.localStorage,
      phaseTwoStorageKeys.madridWinner,
    );
    const storedEliminatedArtist = readStoredItem<StoredContestant>(
      window.localStorage,
      phaseTwoStorageKeys.madridAtRiskArtist,
    );
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
      setWinner(storedWinner);
      setEliminatedArtist(storedEliminatedArtist);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const filledFinalists = useMemo(() => {
    if (!mounted || !winner || !eliminatedArtist || !finalistsUnlocked) {
      return [];
    }

    const remainingContestants = topTenContestants.filter(
      (contestant) =>
        contestant.index !== winner.index &&
        contestant.index !== eliminatedArtist.index,
    );

    return [...remainingContestants.slice(0, 4), challengerContestant];
  }, [eliminatedArtist, finalistsUnlocked, mounted, winner]);

  function handleContinue() {
    if (!finalistsUnlocked) {
      if (winner && eliminatedArtist) {
        const remainingContestants = topTenContestants.filter(
          (contestant) =>
            contestant.index !== winner.index &&
            contestant.index !== eliminatedArtist.index,
        );
        const phaseThreeFinalists = [
          winner,
          ...remainingContestants.slice(0, 4),
          challengerContestant,
        ];

        window.localStorage.setItem(
          phaseTwoStorageKeys.phaseThreeFinalists,
          JSON.stringify(phaseThreeFinalists),
        );
      }

      setFinalistsUnlocked(true);
      return;
    }

    router.push("/phase-three");
  }

  return (
    <SlideBackground>
      <section className="madrid-result-slide">
        <div className="phase-one-chapter phase-two-chapter">
          <span className="phase-one-chapter-label">MADRID</span>
          <strong className="phase-one-chapter-number">RESULT</strong>
        </div>

        <div className="madrid-result-outcome">
          <article className="madrid-result-card madrid-result-card-eliminated">
            <p className="madrid-matchup-label">AT RISK ARTIST</p>
            {mounted && eliminatedArtist ? (
              <div className="madrid-result-image-frame madrid-result-image-frame-eliminated">
                <Image
                  src={eliminatedArtist.src}
                  alt={eliminatedArtist.name}
                  width={220}
                  height={220}
                  className="madrid-result-image"
                />
                <span className="madrid-result-eliminated-mark" aria-hidden="true">
                  X
                </span>
              </div>
            ) : (
              <div className="madrid-result-image-frame madrid-result-image-frame-eliminated">
                <div className="madrid-image-slot" aria-hidden="true" />
              </div>
            )}
            <p className="madrid-result-status madrid-result-status-out">ELIMINATED</p>
          </article>

          <article className="madrid-result-card madrid-result-card-challenger">
            <p className="madrid-matchup-label">LOCAL CHALLENGER</p>
            <div className="madrid-result-image-frame">
              {mounted ? (
                <Image
                  src="/conchallenger.png"
                  alt="Local challenger"
                  width={220}
                  height={220}
                  className="madrid-result-image"
                />
              ) : (
                <div className="madrid-image-slot" aria-hidden="true" />
              )}
            </div>
            <p className="madrid-result-status">CHALLENGER TAKES THE SPOT</p>
          </article>
        </div>

        <div className="madrid-result-finals-board">
          <article className="madrid-finalist-card madrid-finalist-card-winner">
            <p className="madrid-finalist-label">EPISODE 2 WINNER</p>
            <div className="madrid-finalist-image-wrap">
              {mounted && winner ? (
                <Image
                  src={winner.src}
                  alt={winner.name}
                  width={140}
                  height={140}
                  className="madrid-finalist-image"
                />
              ) : (
                <div className="madrid-image-slot" aria-hidden="true" />
              )}
            </div>
            <p className="madrid-finalist-name">
              {mounted && winner ? "OPENS IN MADRID" : "\u00A0"}
            </p>
          </article>

          {remainingFinalistSlots.map((slot, index) => {
            const finalist = filledFinalists[index];

            return (
              <article
                key={slot.label}
                className={`madrid-finalist-card ${
                  finalist
                    ? "madrid-finalist-card-filled"
                    : "madrid-finalist-card-empty"
                }`}
              >
                <p className="madrid-finalist-label">{slot.label}</p>
                <div className="madrid-finalist-image-wrap">
                  {finalist ? (
                    <Image
                      src={finalist.src}
                      alt={finalist.name}
                      width={140}
                      height={140}
                      className="madrid-finalist-image"
                    />
                  ) : (
                    <div className="madrid-image-slot" aria-hidden="true" />
                  )}
                </div>
                <p className="madrid-finalist-name">{slot.subtitle}</p>
              </article>
            );
          })}
        </div>

        <NextSlideButton
          fixed={false}
          className="madrid-result-page-button"
          onClick={handleContinue}
        >
          {finalistsUnlocked ? "CONTINUE TO PHASE THREE" : "CONTINUE"}
        </NextSlideButton>
      </section>
    </SlideBackground>
  );
}
