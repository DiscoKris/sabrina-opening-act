import Image from "next/image";
import { NextSlideButton } from "@/components/NextSlideButton";
import { SlideBackground } from "@/components/SlideBackground";

export default function WhySabrinaPage() {
  return (
    <SlideBackground>
      <section className="why-sabrina-slide">
        <div className="phase-one-chapter why-sabrina-chapter">
          <span className="phase-one-chapter-label">WHY</span>
          <strong className="phase-one-chapter-number">SABRINA?</strong>
        </div>

        <div className="why-sabrina-layout">
          <figure className="why-sabrina-image-frame">
            <Image
              src="/taylorsabrina.jpg"
              alt="Sabrina Carpenter opening for Taylor Swift"
              fill
              sizes="(max-width: 1080px) 100vw, 46vw"
              className="why-sabrina-image"
            />
          </figure>

          <div className="phase-copy phase-description-panel why-sabrina-copy-panel">
            <p>
              Sabrina Carpenter&apos;s journey to global success didn&apos;t
              happen overnight. She spent over a decade releasing music,
              touring, and building her career, waiting for the moment that
              would truly connect her with a worldwide audience. That moment
              came when she stepped onto the global stage opening for Taylor
              Swift. This opportunity transformed her trajectory and introduced
              her to millions. She understands better than anyone how rare and
              career-defining that platform is. Now, with a global audience of
              her own, Sabrina is uniquely positioned to offer that same
              life-changing opportunity to the next generation of pop artists.
            </p>
          </div>
        </div>
      </section>

      <NextSlideButton href="/summary">CONTINUE</NextSlideButton>
    </SlideBackground>
  );
}
