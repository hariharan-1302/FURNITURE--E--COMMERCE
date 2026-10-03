import { useEffect, useState } from "react";

export const API_URL = "https://dummyjson.com/products/category/furniture";

// Custom hook: fetches furniture products (interior furniture only)
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

// Every image of every product -> a pool of furniture-only pictures
export const getImagePool = (products) =>
  products.flatMap((p) => p.images?.length ? p.images : [p.thumbnail]);

export const pick = (pool, i, fallback = "") =>
  pool.length ? pool[i % pool.length] : fallback;

export const categories = [
  { name: "Dining", poolIndex: 0 },
  { name: "Living", poolIndex: 3 },
  { name: "Bedroom", poolIndex: 6 },
];

export const featureList = [
  { title: "High Quality", text: "Crafted from top materials" },
  { title: "Warranty Protection", text: "Over 2 years" },
  { title: "Free Shipping", text: "Order over $150" },
  { title: "24 / 7 Support", text: "Dedicated support" },
];

export const blogPosts = [
  { id: 1, title: "Going all-in with millennial design", category: "Wood", date: "14 Oct 2022", text: "Soft textures, warm woods and calm colours are shaping modern interiors this year." },
  { id: 2, title: "Exploring new ways of decorating", category: "Handmade", date: "14 Oct 2022", text: "Mixing statement furniture with simple accessories makes any room feel fresh." },
  { id: 3, title: "Handmade pieces that took time to make", category: "Wood", date: "14 Oct 2022", text: "Handcrafted sofas, beds and tables bring character and lasting quality to your home." },
];

export const blogCategories = ["Crafts", "Design", "Handmade", "Interior", "Wood"];