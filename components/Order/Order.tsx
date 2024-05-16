import React, { useState } from 'react';
import { Order  } from '@/dtos/Order.dto';
import { Item } from '@/dtos/Item.dto';
import s from './Order.module.scss';
import ItemComponent from '../Item/Item';

interface OrderProps {
  order: Order;
  onClick?: (order: Order) => void;
}

export default function OrderComponent( { order, onClick } : OrderProps) {

  const calculateTotalPrice = (items: Item[]): number => {
    return items.reduce((total, item) => total + item.price.amount, 0);
  };

  return (
    <div className={s['pk-card']} onClick={() => onClick && onClick(order)}>
      <div>
        <span>
          Orden: <b>{order.id}</b>
        </span>
      </div>
      <div>
        {order.items.map((item) => (
          <div key={item.id}>
            <ItemComponent item={item} />
          </div>
        ))}
      </div>
      <div>
        <p><strong>Precio total: {calculateTotalPrice(order.items)}€</strong></p>
      </div>
    </div>
  );
}
