import { create } from "zustand";

export const useStore = create((set) => {
  let parsedProds = [];

  try {
    const storedProds = localStorage.getItem("prods");
    parsedProds = !!storedProds ? JSON.parse(storedProds) : [];
  } catch (error) {
    console.error("Ошибка при парсинге localStorage:", error);
    parsedProds = [];
  }

  let parsedFavorites = [];

  try {
    const storedFavorites = localStorage.getItem("favorites");
    parsedFavorites = !!storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Ошибка при парсинге избранных:", error);
    parsedFavorites = [];
  }

  let parsedDeleted: any = [];

  try {
    const storedDeleted = localStorage.getItem("deletedProducts");
    parsedDeleted = storedDeleted ? (storedDeleted) : [];
  } catch (error) {
    console.error("Ошибка при парсинге избранных:", error);
    parsedDeleted = [];
  }

  return {
    prods: parsedProds,
    favorites: parsedFavorites,
    deletedProducts: parsedDeleted || [],

    setProds: (prods: any) => {
      try {
        localStorage.setItem("prods", JSON.stringify(prods));
        set({ prods });
      } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
      }
    },

    setFavorites: (updatedFavorites: any) => {
      try {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        set({ favorites: updatedFavorites });
      } catch (error) {
        console.error("Ошибка при сохранении избранных:", error);
      }
    },

    setDeletedProducts: (deleted: any) => {
      try {
        localStorage.setItem("deletedProducts", (deleted));
        set({ deletedProducts: deleted });
      } catch (error) {
        console.error("Ошибка при сохранении удалённых товаров:", error);
      }
    },

    
  };
});
