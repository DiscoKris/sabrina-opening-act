import Image from "next/image";

type ImageFrameProps = {
  src: string;
  alt: string;
  label?: string;
  ratio?: "wide" | "portrait" | "tall";
};

export function ImageFrame({
  src,
  alt,
  label,
  ratio = "wide",
}: ImageFrameProps) {
  return (
    <figure className={`image-frame image-frame-${ratio}`}>
      {label ? <figcaption>{label}</figcaption> : null}
      <Image src={src} alt={alt} fill sizes="100vw" className="image-object" />
    </figure>
  );
}
