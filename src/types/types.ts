
export interface typeItem {
  id: number;
  text: string;
  side: "left" | "right";
}

export interface typeLine {
  id: number;
  fromId: number;
  toId: number;
}
