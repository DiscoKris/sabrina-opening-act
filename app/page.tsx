import Image from "next/image";
import { NeonButton } from "@/components/NeonButton";

export default function HomePage() {
  return (
    <div className="deck-page home-page">
      <section className="home-hero">
        <Image
          src="/openingbackground.png"
          alt="Sabrina's Opening Act stage background"
          fill
          priority
          sizes="100vw"
          className="home-hero-background"
        />
        <div className="home-hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">A GLOBAL SEARCH FOR THE NEXT POP STAR</p>
          <Image
            src="/soa_logo.png"
            alt="Sabrina's Opening Act logo"
            width={960}
            height={540}
            priority
            className="home-logo-image"
          />
          <p className="hero-tagline">One Tour. One Stage. One Shot.</p>
          <div className="hero-actions">
            <NeonButton href="/logline" className="home-hero-button">
              Enter the Experience
            </NeonButton>
          </div>
          <div className="hero-starring">
            <span>STARRING</span>
            <Image
              src="/sabrinasig.png"
              alt="Sabrina Carpenter signature"
              width={520}
              height={220}
              className="starring-signature"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
