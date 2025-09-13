/* === Slice with line === */
import type { typeLine, typeItem } from "../types/types";
import styles from "../styles/container_line.module.css";
import { Line } from "./Line";
import { Temp_Line } from "./Temp_Line";
export function Lines({
  lines,
  arr,
  buttonRefs,
  deleteLine,
  currentFrom,
  mousePos,
}: {
  lines: typeLine[];
  arr: typeItem[];
  buttonRefs: Record<number, HTMLButtonElement | null>;
  deleteLine: (id: number) => void;
  currentFrom: number | null;
  mousePos: { x: number; y: number } | null;
}) {
  return (
    <svg className={styles.container__line}>
      {lines.map((line) => (
        <Line
          key={line.id}
          line={line}
          arr={arr}
          buttonRefs={buttonRefs}
          onDelete={deleteLine}
        />
      ))}

      {currentFrom !== null && mousePos && (
        <Temp_Line
          fromId={currentFrom}
          mousePos={mousePos}
          arr={arr}
          buttonRefs={buttonRefs}
        />
      )}
    </svg>
  );
}
