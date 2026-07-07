"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlideBackground } from "@/components/SlideBackground";
import {
  phaseTwoEpisodes,
  phaseTwoStorageKeys,
  topTenContestants,
} from "@/lib/site";

export default function PhaseTwoPage() {
  const router = useRouter();
  const [selectedWinner, setSelectedWinner] = useState<
    (typeof topTenContestants)[number] | null
  >(null);

  function handleContestantClick(
    contestant: (typeof topTenContestants)[number],
  ) {
    if (selectedWinner?.index === contestant.index) {
      window.localStorage.setItem(
        phaseTwoStorageKeys.madridWinner,
        JSON.stringify(contestant),
      );
      router.push("/phase-two/madrid-showdown");
      return;
    }

    setSelectedWinner(contestant);
  }

  return (
    <SlideBackground>
      <section className="phase-two-slide">
        <div className="phase-one-chapter phase-two-chapter">
          <span className="phase-one-chapter-label">PHASE</span>
          <strong className="phase-one-chapter-number">TWO</strong>
        </div>
        <p className="phase-two-strip-title">THE TOP TEN TOUR</p>

        <div className="phase-two-contestants" aria-label="Top ten contestants">
          {topTenContestants.map((contestant) => (
            <button
              key={contestant.index}
              type="button"
              className={`phase-two-contestant ${
                selectedWinner?.index === contestant.index
                  ? "phase-two-contestant-selected"
                  : ""
              }`}
              aria-label={contestant.name}
              aria-pressed={selectedWinner?.index === contestant.index}
              onClick={() => handleContestantClick(contestant)}
            >
              <span className="phase-two-contestant-frame">
                <Image
                  src={contestant.src}
                  alt={contestant.name}
                  width={72}
                  height={72}
                  className="phase-two-contestant-image"
                />
                {selectedWinner?.index === contestant.index ? (
                  <span className="phase-two-contestant-confirm">
                    CONFIRM
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </div>

        <div className="phase-two-city-panel">
          <div className="phase-two-city-grid">
            {phaseTwoEpisodes.map((city) => (
              <article
                key={city.episode}
                className={`city-card phase-two-city-card ${
                  city.name === "Madrid" ? "phase-two-city-card-active" : ""
                }`}
              >
                <p className="city-name">{city.name}</p>
                <p className="phase-two-episode">{city.episode}</p>
              </article>
            ))}
          </div>
          <div className="phase-two-copy-panel">
            <div className="phase-copy phase-description-panel">
              <p>
                Phase Two, the 10 pop stars travel across
                international cities, where each stop shapes the performance.
                Inspired by the culture, music, and energy of each location,
                the artists must adapt to new genres, styles, and challenges.
              </p>
              <p>
                In every city, they compete to win the night, earning a place
                in the finals and exclusive access to Sabrina&apos;s world.
                The rewards escalate throughout the tour and bring them
                ever closer to becoming Sabrina&apos;s official opening act.
              </p>
              <p>
                For the lowest-scoring artist, however, the journey could end
                there. As a local artist tries to win their spot from them in a sing off. The competition intensifies, as only six artists will advance to the next round.
              </p>
            </div>
          </div>
          <p className="phase-two-instruction">
            Scroll up and click on your winner for Episode 2, Madrid.
          </p>
        </div>
      </section>
    </SlideBackground>
  );
}
