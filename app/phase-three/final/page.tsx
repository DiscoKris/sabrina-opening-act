"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlideBackground } from "@/components/SlideBackground";
import {
  phaseTwoStorageKeys,
  readStoredItems,
  topTenContestants,
} from "@/lib/site";

type StoredContestant = (typeof topTenContestants)[number];

export default function PhaseThreeFinalPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [finalists, setFinalists] = useState<StoredContestant[]>(
    topTenContestants.slice(0, 2),
  );

  useEffect(() => {
    const storedFinalists = readStoredItems<StoredContestant>(
      window.localStorage,
      phaseTwoStorageKeys.phaseThreeWinners,
      topTenContestants.slice(0, 2),
    );
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
      setFinalists(storedFinalists);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function handleWinnerChoice(contestant: StoredContestant) {
    window.localStorage.setItem(
      phaseTwoStorageKeys.finalOpeningActWinner,
      JSON.stringify(contestant),
    );
    router.push("/winner");
  }

  return (
    <SlideBackground>
      <section className="phase-three-final-slide">
        <div className="phase-one-chapter phase-two-chapter">
          <span className="phase-one-chapter-label">PHASE THREE</span>
          <strong className="phase-one-chapter-number">FINAL</strong>
        </div>
        <div className="phase-copy phase-description-panel phase-three-final-panel">
          <p>
            The two remaining performers battle it out on stage in front of
            thousands. Only one will be chosen to stay on the tour by Sabrina
            and her team.
          </p>
        </div>

        <div className="phase-three-final-matchup-wrap">
          <div className="madrid-matchup phase-three-final-matchup">
            <button
              type="button"
              className="madrid-matchup-card phase-three-final-card phase-three-final-card-button"
              onClick={() => finalists[0] && handleWinnerChoice(finalists[0])}
            >
              <p className="madrid-matchup-label">FINALIST</p>
              <div className="madrid-matchup-image-wrap phase-three-final-image-wrap">
                {mounted && finalists[0] ? (
                  <Image
                    src={finalists[0].src}
                    alt={finalists[0].name}
                    width={220}
                    height={220}
                    className="madrid-matchup-image"
                  />
                ) : (
                  <div className="madrid-image-slot" aria-hidden="true" />
                )}
              </div>
            </button>

            <div className="madrid-matchup-center phase-three-final-vs">
              <div className="madrid-matchup-vs">V</div>
            </div>

            <button
              type="button"
              className="madrid-matchup-card phase-three-final-card phase-three-final-card-button"
              onClick={() => finalists[1] && handleWinnerChoice(finalists[1])}
            >
              <p className="madrid-matchup-label">FINALIST</p>
              <div className="madrid-matchup-image-wrap phase-three-final-image-wrap">
                {mounted && finalists[1] ? (
                  <Image
                    src={finalists[1].src}
                    alt={finalists[1].name}
                    width={220}
                    height={220}
                    className="madrid-matchup-image"
                  />
                ) : (
                  <div className="madrid-image-slot" aria-hidden="true" />
                )}
              </div>
            </button>
          </div>
          <p className="phase-three-final-vote-copy">
            CLICK ON YOUR WINNER TO REGISTER YOUR VOTE
          </p>
        </div>
      </section>
    </SlideBackground>
  );
}
