"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useStore } from "../../store";
import Link from "next/link";

export default function Item({
  product,
  onDelete,
}: {
  product: any;
  onDelete: any;
}) {
  const favorites = useStore((state: any) => state.favorites);
  const setFavorites = useStore((state: any) => state.setFavorites);

  const [like, setLike] = useState(
    favorites.some((fav: any) => fav.id === product.id)
  );

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation(); // Останавливаем всплытие события
    onDelete();
  };

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    let updatedFavorites;

    if (like) {
      // Удаляем товар из избранных
      updatedFavorites = favorites.filter((fav: any) => fav.id !== product.id);
    } else {
      // Добавляем товар в избранные
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    setLike(!like);
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.product_card} 
    onClick={() => window.location.href = `/products/${product.id}`}>
        <p>id: {product.id}</p>
        <img
          className={styles.product_image}
          src={product.image}
          alt={product.id}
        />

        <section className={styles.buttons_section}>
          <button
            className={like ? styles.like_button_active : styles.like_button}
            onClick={handleLike}
          >
            Like
          </button>
          <button className={styles.delete_button} onClick={handleDelete}>
            Delete
          </button>
        </section>
    </div>
  );
}
