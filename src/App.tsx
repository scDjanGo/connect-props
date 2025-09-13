import { useRef, useState, useEffect } from "react";
import type { typeLine } from "./types/types";
import styles from "./styles/app.module.css";
import { Lines } from "./components/Container_Line";
import { Block_Button } from "./components/Block_Button";
import { BLOCK_ITEMS } from "./static/data";
import Control_Buttons from "./components/Control_Buttons";

// Handlers

// import { handleStart } from "./features/handlers";

export default function App() {
  const [lines, setLines] = useState<typeLine[]>([]);
  const [currentFrom, setCurrentFrom] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setLines((prev) => [...prev]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStart = (id: number) => setCurrentFrom(id);

  const handleMove = (clientX: number, clientY: number) => {
    if (currentFrom !== null) setMousePos({ x: clientX, y: clientY });
  };

  const handleEnd = (clientX: number, clientY: number) => {
    if (currentFrom === null) return;

    const targetId = Object.entries(buttonRefs.current).find(([_, el]) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    });

    if (targetId) {
      const fromItem = BLOCK_ITEMS.find((i) => i.id === currentFrom);
      const toItem = BLOCK_ITEMS.find((i) => i.id === Number(targetId[0]));
      if (fromItem && toItem && fromItem.side !== toItem.side) {
        setLines((prev) => [
          ...prev,
          { id: Date.now(), fromId: fromItem.id, toId: toItem.id },
        ]);
      }
    }

    setCurrentFrom(null);
    setMousePos(null);
  };

  const deleteLine = (id: number) =>
    setLines((prev) => prev.filter((line) => line.id !== id));

  return (
    <div
      className={styles.app__container}
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={(e) => handleEnd(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        }
      }}
      onTouchEnd={(e) => {
        if (e.changedTouches.length === 1) {
          const touch = e.changedTouches[0];
          handleEnd(touch.clientX, touch.clientY);
        }
      }}
    >
      <Lines
        lines={lines}
        arr={BLOCK_ITEMS}
        buttonRefs={buttonRefs.current}
        deleteLine={deleteLine}
        currentFrom={currentFrom}
        mousePos={mousePos}
      />

      <div className={styles.container__columns}>
        <div className={styles.column}>
          {BLOCK_ITEMS.filter((i) => i.side === "left").map((item) => (
            <Block_Button
              key={item.id}
              item={item}
              isUsed={lines.some((elem) => elem.fromId === item.id)}
              onStart={handleStart}
              buttonRefs={buttonRefs.current}
            />
          ))}
        </div>
        <div className={styles.column}>
          {BLOCK_ITEMS.filter((i) => i.side === "right").map((item) => (
            <Block_Button
              key={item.id}
              item={item}
              isUsed={lines.some((elem) => elem.toId === item.id)}
              onStart={handleStart}
              buttonRefs={buttonRefs.current}
            />
          ))}
        </div>
      </div>

      <Control_Buttons lines={lines} setLines={setLines} />
    </div>
  );
}
