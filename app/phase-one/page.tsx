import Image from "next/image";
import { NextSlideButton } from "@/components/NextSlideButton";
import { SlideBackground } from "@/components/SlideBackground";

export default function PhaseOnePage() {
  return (
    <SlideBackground>
      <section className="phase-layout phase-one-layout">
        <div className="phase-content">
          <div className="phase-one-chapter">
            <span className="phase-one-chapter-label">PHASE</span>
            <strong className="phase-one-chapter-number">ONE</strong>
          </div>
          <p className="section-kicker">THOUSANDS AUDITION</p>
          <div className="phase-one-top">
            <div className="phase-one-supporting">
              <figure className="phase-one-image phase-one-image-support">
                <Image
                  src="/auditionimages.png"
                  alt="Arena audition crowd"
                  fill
                  sizes="(max-width: 1080px) 100vw, 40vw"
                  className="phase-one-image-object"
                />
              </figure>
              <figure className="phase-one-image phase-one-image-support">
                <Image
                  src="/auditionimages2.png"
                  alt="Contestant audition moment"
                  fill
                  sizes="(max-width: 1080px) 100vw, 40vw"
                  className="phase-one-image-object"
                />
              </figure>
            </div>
            <div className="phase-one-copy-panel">
              <div className="phase-copy phase-description-panel">
                <p>
                  Sabrina and her team have announced a global casting call and
                  from thousands of applicants, only the top tier are invited
                  to audition.
                </p>
                <p>
                  From there, 10 are selected to travel and compete to
                  become the next great global pop sensation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NextSlideButton href="/phase-two">NEXT</NextSlideButton>
    </SlideBackground>
  );
}
