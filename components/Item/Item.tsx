import React, { useEffect, useState } from 'react';
import { ArrowDown } from "@/bases/ArrowDown";
import { ArrowRight } from "@/bases/ArrowRight";
import { Item } from '@/dtos/Item.dto';
import s from './Item.module.scss';

interface ItemProps {
  item: Item;
}

export default function ItemComponent({ item }: ItemProps) {
  const [showImage, setShowImage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowImage(!showImage);
  };

  useEffect(() => {
    // Verificar si el dispositivo tiene configurado el modo oscuro
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return (
    <div className={s["container"]}>
      <div className={s["content"]}>
        <button onClick={handleClick} className={s["arrows"]}>
          {showImage ? <ArrowDown color={isDarkMode ? '#ffffff' : '#000000'} /> : <ArrowRight color={isDarkMode ? '#ffffff' : '#000000'} />}
        </button>
        <h4>{item.name}{item.price.amount}{item.price.currency}</h4>
      </div>
      <div className={s["imageContainer"]}>
        {showImage && <img src={item.image} alt={item.name} />}
      </div>
    </div>
  );
}
