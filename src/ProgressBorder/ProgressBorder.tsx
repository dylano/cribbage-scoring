import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./ProgressBorder.module.css";

interface NodePoint {
  x: number;
  y: number;
  t: number;
}

interface Size {
  width: number;
  height: number;
}

interface ProgressBorderProps {
  /** How many circles are lit, counting from the start point. */
  filled: number;
  /** How many circles sit on the border. Fixed regardless of container size. */
  count?: number;
  /** Arc removed from the loop, in px. Nothing is drawn here. */
  gap?: number;
  /** Where the gap's midpoint sits, as a fraction of the perimeter. */
  gapCenter?: number;
  /** Corner radius in px. Match this to the container's border-radius. */
  radius?: number;
  /** Distance in px from the container edge to the centre of the chain. */
  inset?: number;
  /** Circle radius as a fraction of the gap between neighbours. 0.5 = touching. */
  density?: number;
  completeColor?: string;
  className?: string;
}

export default function ProgressBorder({
  filled,
  count = 120,
  gap = 0,
  gapCenter = 0,
  radius = 24,
  inset = 10,
  density = 0.35,
  completeColor,
  className,
}: ProgressBorderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const geometryRef = useRef<SVGRectElement>(null);

  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [points, setPoints] = useState<NodePoint[]>([]);
  const [nodeRadius, setNodeRadius] = useState(0);

  // Pass 1: measure the parent element. Observing a real HTML box avoids the
  // ambiguity around what ResizeObserver reports for SVG targets, and it is
  // the box the SVG is stretched over by inset: 0.
  useLayoutEffect(() => {
    const parent = svgRef.current?.parentElement;
    if (!parent) return;

    const observer = new ResizeObserver(() => {
      const { width, height } = parent.getBoundingClientRect();
      setSize({ width, height });
    });

    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  // Pass 2: measure the rect once it has rendered at the new size.
  useLayoutEffect(() => {
    const rect = geometryRef.current;
    if (!rect || size.width === 0 || size.height === 0) return;

    const total = rect.getTotalLength();

    // The gap is specified in px so it keeps its physical size as the panel
    // resizes; node spacing absorbs the difference instead.
    const gapFraction = Math.min(0.9, gap / total);
    const span = 1 - gapFraction;
    const start = gapCenter + gapFraction / 2;

    const spacing = count > 1 ? (total * span) / (count - 1) : 0;

    setNodeRadius(spacing * density);
    setPoints(
      Array.from({ length: count }, (_, i) => {
        // Ordinal position in the sequence, used for colour. Divided by count
        // so the last node lights when filled reaches count.
        const t = i / count;
        // Geometric position. Divided by count - 1 so the run has a node at
        // both ends of the span rather than stopping one short.
        const tp = count > 1 ? i / (count - 1) : 0;
        const u = (start + tp * span) % 1;
        const { x, y } = rect.getPointAtLength(u * total);
        return { x, y, t };
      }),
    );
  }, [size, count, gap, gapCenter, density, radius, inset]);

  const progress = Math.min(1, Math.max(0, filled / count));

  return (
    <svg
      ref={svgRef}
      className={[styles.chain, className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={
        {
          "--progress": progress,
          "--count": count,
          "--complete": completeColor,
        } as CSSProperties
      }
    >
      {/* Invisible geometry source the node positions are sampled from. */}
      <rect
        ref={geometryRef}
        x={inset}
        y={inset}
        width={Math.max(0, size.width - inset * 2)}
        height={Math.max(0, size.height - inset * 2)}
        rx={radius}
        className={styles.geometry}
      />

      {points.map((p) => (
        <circle
          key={p.t}
          cx={p.x}
          cy={p.y}
          r={nodeRadius}
          className={styles.node}
          style={{ "--t": p.t } as CSSProperties}
        />
      ))}
    </svg>
  );
}
