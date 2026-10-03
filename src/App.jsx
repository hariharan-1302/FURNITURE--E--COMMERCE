import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Comparison from "./pages/Comparison";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import About from "./pages/About";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, qty }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const subtotal = cartItems.reduce((n, i) => n + i.price * i.qty, 0);

  const shared = { addToCart, cartItems, removeFromCart, updateQty, subtotal };

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setShowCart(true)} />
      <CartSidebar show={showCart} onHide={() => setShowCart(false)} {...shared} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/comparison" element={<Comparison addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart {...shared} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} subtotal={subtotal} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About addToCart={addToCart} />} />
      </Routes>
      <Footer />
    </>
  );
}