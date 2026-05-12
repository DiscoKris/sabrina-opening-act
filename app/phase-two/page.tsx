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
                In Phase Two, the tour, the ten artists travel across
                international cities, where each stop shapes the performance.
                Inspired by the culture, music, and energy of each location,
                the artists are pushed to take on new genres, styles, and
                challenges.
              </p>
              <p>
                In every city, they battle to win the night while defending
                their place in the competition against a rising local
                challenger. The winner earns the opportunity to open Sabrina
                Carpenter&apos;s stadium show the following evening and secures one
                of six coveted places in the finals.
              </p>
              <p>
                But for the lowest-scoring artist, their place on the tour is
                suddenly at risk. As the competition moves from city to city,
                the pressure intensifies. Only six artists will make the
                finals, the rest will be eliminated from the tour.
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
