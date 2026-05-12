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

type StoredWinner = (typeof topTenContestants)[number];

const remainingFinalistSlots = [
  "Episode 3 Winner",
  "Episode 4 Winner",
  "Episode 5 Winner",
  "Episode 6 Winner",
  "Episode 7 Winner",
];

export default function MadridShowdownPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [winner, setWinner] = useState<StoredWinner | null>(null);
  const [selectedContestant, setSelectedContestant] =
    useState<StoredWinner | null>(null);

  useEffect(() => {
    const storedWinner = readStoredItem<StoredWinner>(
      window.localStorage,
      phaseTwoStorageKeys.madridWinner,
    );
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
      setWinner(storedWinner);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const remainingContestants = useMemo(() => {
    if (!mounted || !winner) {
      return topTenContestants;
    }

    return topTenContestants.filter(
      (contestant) => contestant.index !== winner.index,
    );
  }, [mounted, winner]);

  function handleResult() {
    if (!selectedContestant) {
      return;
    }

    window.localStorage.setItem(
      phaseTwoStorageKeys.madridAtRiskArtist,
      JSON.stringify(selectedContestant),
    );
    router.push("/phase-two/madrid-result");
  }

  return (
    <SlideBackground>
      <section className="madrid-showdown-slide">
        <div className="phase-one-chapter phase-two-chapter">
          <span className="phase-one-chapter-label">MADRID</span>
          <strong className="phase-one-chapter-number">SHOWDOWN</strong>
        </div>

        <div className="madrid-finals-board">
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

          {remainingFinalistSlots.map((slotLabel) => (
            <article
              key={slotLabel}
              className="madrid-finalist-card madrid-finalist-card-empty"
            >
              <p className="madrid-finalist-label">{slotLabel}</p>
              <div className="madrid-finalist-image-wrap">
                <div className="madrid-image-slot" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="madrid-lower">
          <div className="madrid-contestants-panel">
            <p className="madrid-section-title">
              Select the lowest scoring artist singing for their life?
            </p>
            <div className="madrid-contestants-grid">
              {remainingContestants.map((contestant) => (
                <button
                  key={contestant.index}
                  type="button"
                  className={`madrid-contestant ${
                    selectedContestant?.index === contestant.index
                      ? "madrid-contestant-selected"
                      : ""
                  }`}
                  onClick={() => setSelectedContestant(contestant)}
                >
                  <div className="madrid-contestant-image-wrap">
                    {mounted ? (
                      <Image
                        src={contestant.src}
                        alt={contestant.name}
                        width={120}
                        height={120}
                        className="madrid-contestant-image"
                      />
                    ) : (
                      <div className="madrid-image-slot" aria-hidden="true" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="madrid-challenger-panel">
            <p className="madrid-challenger-label">LOCAL CHALLENGER</p>
            <div className="madrid-challenger-image-wrap">
              {mounted ? (
                <Image
                  src="/conchallenger.png"
                  alt="Local challenger"
                  width={180}
                  height={220}
                  className="madrid-challenger-image"
                />
              ) : (
                <div className="madrid-image-slot" aria-hidden="true" />
              )}
            </div>
          </aside>
        </div>

        {mounted && selectedContestant ? (
          <div className="madrid-matchup-wrap">
            <div className="madrid-matchup">
              <div className="madrid-matchup-card">
                <p className="madrid-matchup-label">AT RISK ARTIST</p>
                <div className="madrid-matchup-image-wrap">
                  <Image
                    src={selectedContestant.src}
                    alt={selectedContestant.name}
                    width={190}
                    height={190}
                    className="madrid-matchup-image"
                  />
                </div>
              </div>
              <div className="madrid-matchup-center">
                <div className="madrid-matchup-vs">V</div>
              </div>
              <div className="madrid-matchup-card">
                <p className="madrid-matchup-label">LOCAL CHALLENGER</p>
                <div className="madrid-matchup-image-wrap">
                  <Image
                    src="/conchallenger.png"
                    alt="Local challenger"
                    width={190}
                    height={190}
                    className="madrid-matchup-image"
                  />
                </div>
              </div>
            </div>
            <NextSlideButton
              fixed={false}
              className="madrid-result-button"
              onClick={handleResult}
            >
              RESULT
            </NextSlideButton>
          </div>
        ) : null}
      </section>
    </SlideBackground>
  );
}
