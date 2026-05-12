'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SizzlePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    router.prefetch("/phase-one");

    return () => {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [router]);

  const handleStart = async () => {
    const video = videoRef.current;

    if (!video || hasStarted || isStarting || isEnding) {
      return;
    }

    setIsStarting(true);
    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      setHasStarted(true);
    } catch {
      video.muted = true;
      setIsStarting(false);
    }
  };

  const handleEnded = () => {
    if (isEnding) {
      return;
    }

    setIsEnding(true);
    redirectTimeoutRef.current = window.setTimeout(() => {
      router.replace("/phase-one");
    }, 900);
  };

  return (
    <section
      className={`sizzle-experience${hasStarted ? " is-started" : ""}${isEnding ? " is-ending" : ""}`}
      aria-label="Sabrina sizzle video"
    >
      <video
        ref={videoRef}
        className="sizzle-video-player"
        src="/sabrinasizzle.mp4"
        onEnded={handleEnded}
        playsInline
        preload="auto"
        muted
      />

      {showOverlay ? (
        <div
          className={`sizzle-overlay${hasStarted ? " is-hidden" : ""}`}
          onTransitionEnd={() => {
            if (hasStarted) {
              setShowOverlay(false);
              setIsStarting(false);
            }
          }}
        >
          <button
            type="button"
            className="sizzle-sound-button"
            onClick={handleStart}
            disabled={isStarting}
            aria-label="Turn sound on and play video"
          >
            <span>Turn Sound On</span>
          </button>
        </div>
      ) : null}

      <div
        className={`sizzle-fadeout${isEnding ? " is-visible" : ""}`}
        aria-hidden="true"
      />
    </section>
  );
}
