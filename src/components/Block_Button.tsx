/* === Block button === */

import type { typeItem } from "../types/types";
import styles from "../styles/block.module.css";

export function Block_Button({
  item,
  onStart,
  isUsed,
  buttonRefs,
}: {
  item: typeItem;
  isUsed: boolean;
  onStart: (id: number) => void;
  buttonRefs: Record<number, HTMLButtonElement | null>;
}) {

  return (
    <button
      style={{
        border: isUsed ? "1px solid #10982E" : "1px solid white",
        backgroundColor: isUsed ? "#D3E8D9" : "#EDEDED",
      }}
      ref={(el) => (buttonRefs[item.id] = el) as any}
      className={styles.block__button}
      onMouseDown={() => onStart(item.id)}
      onTouchStart={() => onStart(item.id)}
    >
      {item.text}
    </button>
  );
}
