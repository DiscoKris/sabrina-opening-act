import { ImageFrame } from "@/components/ImageFrame";

type Finalist = {
  name: string;
  label: string;
  src: string;
  size: "sm" | "md" | "lg";
};

export function ContestantCollage({ finalists }: { finalists: Finalist[] }) {
  return (
    <div className="collage-grid">
      {finalists.map((finalist) => (
        <div
          key={finalist.name}
          className={`collage-card collage-card-${finalist.size}`}
        >
          {/* Replace with the real finalist still later. */}
          <ImageFrame
            src={finalist.src}
            alt={`${finalist.name} finalist placeholder`}
            label={finalist.label}
            ratio="portrait"
          />
        </div>
      ))}
    </div>
  );
}
