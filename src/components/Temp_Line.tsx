/* === The temp line === */

import { getAnchor } from "../features/getAnchor";
import type { typeItem } from "../types/types";
import { CIRCLE_RADIUS, STROKE_WIDTH } from "../static/data";

export function Temp_Line({
  fromId,
  mousePos,
  arr,
  buttonRefs,
}: {
  fromId: number;
  mousePos: { x: number; y: number };
  arr: typeItem[];
  buttonRefs: Record<number, HTMLButtonElement | null>;
}) {
  const from = getAnchor(fromId, arr, buttonRefs);

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={mousePos.x}
        y2={mousePos.y}
        stroke="black"
        strokeWidth={STROKE_WIDTH}
        strokeDasharray="4 2"
      />
      <circle cx={from.x} cy={from.y} r={CIRCLE_RADIUS} fill="black" />
    </g>
  );
}
