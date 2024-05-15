import React, { useState } from 'react';
import { ArrowDown } from "@/bases/ArrowDown";
import { ArrowRight } from "@/bases/ArrowRight";
import { Item } from '@/dtos/Item.dto';
import s from './Item.module.scss';

interface ItemProps {
  item: Item;
}

export default function ItemComponent({ item }: ItemProps) {
  const [showImage, setShowImage] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowImage(!showImage);
  };


  return (
    <div className={s["container"]}>
      <div className={s["content"]}>
        <button onClick={handleClick}>
          {showImage ? <ArrowDown /> : <ArrowRight />}
        </button>
        <h4>{item.name}</h4>
      </div>
      <div className={s["imageContainer"]}>
        {showImage && <img src={item.image} alt={item.name} />}
      </div>
    </div>
  );
}
