"use client";
import { useStore } from "../../store";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Item from "./single_product_page";

export default function Home() {
  const prods = useStore((state: any) => state.prods);
  const setProds = useStore((state: any) => state.setProds);

  const favorites = useStore((state: any) => state.favorites);

  const [filteredProducts, setFilteredProducts] = useState(prods);
  const [categories, setCategories] = useState(["loading..."]);

  const deletedProducts = useStore((state: any) => state.deletedProducts);
  const setDeletedProducts = useStore((state: any) => state.setDeletedProducts);

  const fetchCategories = async () => {
    let data = await fetch("https://fakestoreapi.com/products/categories").then(
      (response) => response.json()
    );
    setCategories(data);
  };

  const fetchProducts = async () => {
    let data;

    if (prods.length === 0) {
      console.log("prods.length === 0");
      data = await fetch("https://fakestoreapi.com/products").then((response) =>
        response.json()
      );

      const filteredData = data.filter(
        (product: any) => !deletedProducts.includes(product.id)
      );

      setProds(filteredData);
    }
  };

  useEffect(() => {
    if (prods.length === 0) {
      console.log("useEffect - 1");
      fetchProducts();
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (prods.length > 0) {
      console.log("useEffect - 2");
      setFilteredProducts(prods);
    }
  }, [prods]);

  const handleDelete = async (id: number, event?: React.MouseEvent) => {
    event?.stopPropagation();

    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      setDeletedProducts((prev: any) => {
        [...prev, id];
      });

      setProds(
        prods ? prods.filter((product: any) => product.id !== id) : []
      );

      setFilteredProducts((prev: any[]) =>
        prev ? prev.filter((product: any) => product.id !== id) : []
      );
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  const handleCategoryChange = (value: string) => {
    let data = prods
      .slice()
      .filter((product: any) => product.category === value);
    setFilteredProducts(data);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.filters}>
          <button onClick={() => setFilteredProducts(prods)}>All</button>
          {categories.map((category: any) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
          <button onClick={() => setFilteredProducts(favorites)}>
            Favorites
          </button>
        </div>
        <div className={styles.cards}>
          {filteredProducts ? (
            filteredProducts.map((product: any, index: number) => (
              
              <Item
                product={product}
                key={product.id ?? `fallback-key-${index}`}
                onDelete={() => handleDelete(product.id)}
              />
            ))
          ) : (
            <h1 className={styles.loading}>"Loading..."</h1>
          )}
        </div>
      </main>
    </div>
  );
}
