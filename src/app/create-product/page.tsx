'use client'
import React, { useState } from 'react'
import styles from "./page.module.css"
import { useStore } from '../../store';

export default function CreateProduct() {

  const prods = useStore((state: any) => state.prods);
  const setProds = useStore((state: any) => state.setProds);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
  });

  // Обработка изменений в полях
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Отправка данных
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    try {

      setProds([
        ...prods,
        {
          id: prods.length + 1,
          title: formData.title,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          image: "",
        },
      ]);

      alert("Товар успешно создан!");
      

      // Сбрасываем форму
      setFormData({ title: "", description: "", price: 0, category: "" });
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      alert("Произошла ошибка при создании товара.");
    }
  };


  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <h3>Create Product</h3>

      <label className={styles.form_label}>
        Product Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.form_input}
          placeholder="Enter product title"
          required
        />
      </label>

      <label className={styles.form_label}>
        Description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.form_input}
          placeholder="Enter description"
          required
        />
      </label>

      <label className={styles.form_label}>
        Price
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={styles.form_input}
          placeholder="Set Price"
          required
        />
      </label>

      <label className={styles.form_label}>
        Category
        <select
          
          name="category"
          value={formData.category}
          onChange={handleSelectChange}
          className={styles.form_input}
          defaultValue={"electronics"}
          required
        >
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select >
      </label>

      <button type="submit" className={styles.form_button}>
        Submit
      </button>
    </form>
  )
}
