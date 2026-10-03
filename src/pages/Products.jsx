import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../data/products";

export default function Products({ addToCart }) {
  const { products, loading, error } = useProducts();

  return (
    <Container className="py-5">
      <h2 className="section-title">All Products</h2>
      <p className="section-sub">Our complete furniture collection.</p>
      <ProductGrid products={products} loading={loading} error={error} addToCart={addToCart} />
    </Container>
  );
}