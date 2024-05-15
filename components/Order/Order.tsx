import React, { useState } from 'react';
import { Order } from '@/dtos/Order.dto';
import s from './Order.module.scss';
import ItemComponent from '../Item/Item';

interface OrderProps {
  order: Order;
  onClick?: (order: Order) => void;
}

export default function OrderComponent( { order, onClick } : OrderProps) {

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
    </div>
  );
}
