import { NextSlideButton } from "@/components/NextSlideButton";
import { SlideBackground } from "@/components/SlideBackground";

export default function LoglinePage() {
  return (
    <SlideBackground>
      <section className="logline-slide">
        <div className="logline-copy">
          <p className="logline-eyebrow">LOG LINE</p>
          <p className="logline-statement">
            TEN RISING POP STARS TRAVEL THE WORLD, WHERE EVERY CITY SHAPES
            THE MUSIC, AND ONLY ONE WILL EARN THEIR PLACE ON STAGE WITH SABRINA
            CARPENTER.
          </p>
        </div>
      </section>
      <NextSlideButton href="/sizzle">NEXT</NextSlideButton>
    </SlideBackground>
  );
}
