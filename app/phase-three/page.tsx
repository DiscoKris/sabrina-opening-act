"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NextSlideButton } from "@/components/NextSlideButton";
import { SlideBackground } from "@/components/SlideBackground";
import {
  phaseTwoStorageKeys,
  readStoredItems,
  topTenContestants,
} from "@/lib/site";

type StoredContestant = (typeof topTenContestants)[number];

export default function PhaseThreePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [finalists, setFinalists] = useState<StoredContestant[]>(
    topTenContestants.slice(0, 6),
  );

  useEffect(() => {
    const storedFinalists = readStoredItems<StoredContestant>(
      window.localStorage,
      phaseTwoStorageKeys.phaseThreeFinalists,
      topTenContestants.slice(0, 6),
    );
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
      setFinalists(storedFinalists);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const semifinalOne = useMemo(() => finalists.slice(0, 3), [finalists]);
  const semifinalTwo = useMemo(() => finalists.slice(3, 6), [finalists]);

  function handleContinue() {
    if (step === 0) {
      setStep(1);
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    const phaseThreeWinners = [semifinalOne[0], semifinalTwo[0]].filter(Boolean);

    window.localStorage.setItem(
      phaseTwoStorageKeys.phaseThreeWinners,
      JSON.stringify(phaseThreeWinners),
    );
    router.push("/phase-three/final");
  }

  return (
    <SlideBackground>
      <section className="phase-three-slide">
        <div className="phase-one-chapter phase-two-chapter">
          <span className="phase-one-chapter-label">PHASE</span>
          <strong className="phase-one-chapter-number">THREE</strong>
        </div>

        <div className="phase-three-copy-panel">
          <div className="phase-copy phase-description-panel">
            <p>
              Phase Three, the qualifying six artists are split into two
              groups of three, each competing in their own semi-final.
            </p>
            <p>
              This time, they all perform in front of Sabrina and her team. From
              each group, one artist advances to the
              final and receives a makeover from Sabrina&apos;s team. A
              final stadium showdown awaits them where the ultimate reward is becoming Sabrina&apos;s
              official opening act.
            </p>
          </div>
        </div>

        <div className="phase-three-groups">
          <section className="phase-three-group">
            <div className="phase-three-group-header">
              <p className="section-kicker">Episode 8</p>
              <h2 className="phase-three-group-title">Semi-Final One</h2>
            </div>
            <div className="phase-three-grid">
              {semifinalOne.map((contestant, index) => {
                const isWinner = step >= 1 && index === 0;
                const isDimmed = step >= 1 && !isWinner;

                return (
                  <article
                    key={`${contestant.index}-semi-one`}
                    className={`phase-three-card ${
                      isWinner ? "phase-three-card-winner" : ""
                    } ${isDimmed ? "phase-three-card-dimmed" : ""}`}
                  >
                    <div className="phase-three-card-frame">
                      <Image
                        src={contestant.src}
                        alt={contestant.name}
                        width={180}
                        height={180}
                        className="phase-three-card-image"
                      />
                      {mounted && isWinner ? (
                        <span className="phase-three-card-badge">
                          {"SABRINA\u00A0MAKEOVER"}
                        </span>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="phase-three-group">
            <div className="phase-three-group-header">
              <p className="section-kicker">Episode 9</p>
              <h2 className="phase-three-group-title">Semi-Final Two</h2>
            </div>
            <div className="phase-three-grid">
              {semifinalTwo.map((contestant, index) => {
                const isWinner = step >= 2 && index === 0;
                const isDimmed = step >= 2 && !isWinner;

                return (
                  <article
                    key={`${contestant.index}-semi-two`}
                    className={`phase-three-card ${
                      isWinner ? "phase-three-card-winner" : ""
                    } ${isDimmed ? "phase-three-card-dimmed" : ""}`}
                  >
                    <div className="phase-three-card-frame">
                      <Image
                        src={contestant.src}
                        alt={contestant.name}
                        width={180}
                        height={180}
                        className="phase-three-card-image"
                      />
                      {mounted && isWinner ? (
                        <span className="phase-three-card-badge">
                          {"SABRINA\u00A0MAKEOVER"}
                        </span>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <div className="slide-action-wrap">
          <NextSlideButton
            fixed={false}
            className="phase-three-button"
            onClick={handleContinue}
          >
            {step >= 2 ? "CONTINUE TO FINAL" : "CONTINUE"}
          </NextSlideButton>
        </div>
      </section>
    </SlideBackground>
  );
}
