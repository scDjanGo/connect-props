import type { typeLine } from "../types/types";
import styles from "../styles/control_buttons.module.css"

export default function Control_Buttons({
  setLines,
  lines,
}: {
  lines: typeLine[];
  setLines: React.Dispatch<React.SetStateAction<typeLine[]>>;
}) {
  const handleSave = () => {
    localStorage.setItem("lines", JSON.stringify(lines));
    alert("Данные сохранены");
  };

  const handleRestore = () => {
    const storeLines: typeLine[] = JSON.parse(
      localStorage.getItem("lines") || "[]"
    );
    if (!storeLines.length) {
      alert("Нет сохраненных");
      return;
    }
    setLines(storeLines);
  };

  const handleClear = () => {
    localStorage.clear();
    setLines([]);
    alert("Данные были очищены");
  };

  return (
    <div className={styles.container}>
      <button className={styles.save__button} onClick={handleSave}>Сохранить</button>
      <button className={styles.restore__button} onClick={handleRestore}>Восстановить</button>
      <button className={styles.clear__button}  onClick={handleClear} title="Очищает линии и в памяти">
        Очистить
      </button>
    </div>
  );
}
