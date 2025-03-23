"use client"
import React, { use, useEffect, useState } from 'react'
import styles from "../page.module.css"
import { useStore } from '@/store';



export default function Item({ params }: { params: { id: string } }) {
  
  const prods = useStore((state: any) => state.prods);
  const favorites = useStore((state: any) => state.favorites);
  const setFavorites = useStore((state: any) => state.setFavorites);

  // Находим товар по id
  const product = prods.find((p: any) => p.id === Number(params.id));

  // Состояние для лайка
  const [like, setLike] = useState(false);

  // Проверяем, есть ли товар в избранных
  useEffect(() => {
    if (product) {
      setLike(favorites.some((fav: any) => fav.id === product.id));
    }
  }, [product, favorites]);

  // Обработчик лайка
  const handleLike = () => {
    if (!product) return;

    if (like) {
      setFavorites(favorites.filter((fav: any) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
    setLike(!like);
  };

  if (!product) return <p>Товар не найден...</p>;
  return (
    <div className={styles.item_container}>
      <p>product id: {params.id}</p>
      <img className={styles.item_image} src={product.image} alt="image" />
      <p>product name: {product.title}</p>
      <p>product price: {product.price}</p>

      <button className={like ? styles.like_button_active : styles.like_button} onClick={handleLike}>Like</button>
      </div>
  )
}
