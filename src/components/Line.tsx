/* === Line component === */
import type { typeItem, typeLine } from "../types/types";
import styles from "../styles/line.module.css"
import { getAnchor } from "../features/getAnchor";
import { CIRCLE_RADIUS, STROKE_WIDTH } from "../static/data";

export function Line({
  line,
  arr,
  buttonRefs,
  onDelete,
}: {
  line: typeLine;
  arr: typeItem[];
  buttonRefs: Record<number, HTMLButtonElement | null>;
  onDelete: (id: number) => void;
}) {
  const from = getAnchor(line.fromId, arr, buttonRefs);
  const to = getAnchor(line.toId, arr, buttonRefs);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="black"
        strokeWidth={STROKE_WIDTH}
      />
      <circle cx={from.x} cy={from.y} r={CIRCLE_RADIUS} fill="black" />
      <circle cx={to.x} cy={to.y} r={CIRCLE_RADIUS} fill="black" />

      <foreignObject
        x={midX - 10}
        y={midY - 10}
        width={20}
        height={20}
        className={styles.pointer__events}
      >
        <button
          onClick={() => onDelete(line.id)}
          className={styles.delete__button}
        >
          ×
        </button>
      </foreignObject>
    </g>
  );
}
