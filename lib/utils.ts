import { Item } from "@/dtos/Item.dto";
import { comidas } from "./items";

export function getRandomId() {
  const length = 5;
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getRandomInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItems(): Item[] {
  const numberOfItems = Math.floor(Math.random() * 3) + 1;
  const selectedItems: Item[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    const randomIndex = Math.floor(Math.random() * comidas.length);
    const randomItem = comidas[randomIndex];

    const newItem: Item = {
      ...randomItem,
      id: getRandomId(),
    };

    selectedItems.push(newItem);
  }

  return selectedItems;
}