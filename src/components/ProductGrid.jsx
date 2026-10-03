import { Row, Col, Spinner } from "react-bootstrap";
import ProductCart from "./ProductCart";

export default function ProductGrid({ products, loading, error, addToCart }) {
  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;
  if (!products.length) return <p className="text-center py-5">No products found.</p>;

  return (
    <Row className="g-4">
      {products.map((p, i) => (
        <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
          <ProductCart product={p} index={i} addToCart={addToCart} />
        </Col>
      ))}
    </Row>
  );
}