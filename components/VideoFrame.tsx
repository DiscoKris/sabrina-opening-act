import Image from "next/image";

export function VideoFrame({ title, src }: { title: string; src: string }) {
  return (
    <section className="video-frame">
      <div className="video-copy">
        <p className="section-kicker">VIDEO</p>
        <h2>{title}</h2>
      </div>
      {/* Replace with the real sizzle embed or still later. */}
      <div className="video-placeholder">
        <Image src={src} alt={`${title} placeholder`} fill sizes="100vw" />
        <div className="play-badge">PLAY</div>
      </div>
    </section>
  );
}
