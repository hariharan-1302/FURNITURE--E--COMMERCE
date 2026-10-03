import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductGrid from "../components/ProductGrid";
import { useProducts, getImagePool, pick, categories } from "../data/products";

export default function Home({ addToCart }) {
  const { products, loading, error } = useProducts();
  const pool = getImagePool(products);

  return (
    <>
      <Hero image={pick(pool, 0)} />

      {/* Browse The Range */}
      <Container className="py-5">
        <h2 className="section-title">Browse The Range</h2>
        <p className="section-sub">Furniture for every room in your home.</p>
        <Row className="g-4">
          {categories.map((c) => (
            <Col key={c.name} md={4} className="text-center category-card">
              <img src={pick(pool, c.poolIndex)} alt={c.name} />
              {/* <h5 className="fw-semibold mt-3">{c.name}</h5> */}
              <Link to={`/shop?category=${c.name}`} className="btn btn-outline-gold mt-3">Shop {c.name}</Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Our Products */}
      <Container className="py-5">
        <h2 className="section-title">Our Products</h2>
        <p className="section-sub">Hand-picked pieces from our furniture collection.</p>
        <ProductGrid products={products} loading={loading} error={error} addToCart={addToCart} />
        <div className="text-center mt-5">
          <Link to="/shop" className="btn btn-outline-gold">Show More</Link>
        </div>
      </Container>

      {/* Room inspiration */}
      <section style={{ background: "#fcf8f3" }} className="py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={4}>
              <h2 className="fw-bold">50+ Beautiful rooms inspiration</h2>
              <p className="text-secondary">Our designer already made a lot of beautiful prototype rooms that inspire you.</p>
              <Link to="/shop" className="btn btn-gold">Explore More</Link>
            </Col>
            <Col xs={6} lg={4}><img src={pick(pool, 2)} alt="Room inspiration" className="w-100 rounded" style={{ height: 420, objectFit: "cover" }} /></Col>
            <Col xs={6} lg={4}><img src={pick(pool, 5)} alt="Room inspiration" className="w-100 rounded" style={{ height: 420, objectFit: "cover" }} /></Col>
          </Row>
        </Container>
      </section>

      {/* Setup gallery */}
      <Container className="py-5">
        <p className="text-center text-secondary mb-0">Share your setup with</p>
        <h2 className="section-title">#FuniroFurniture</h2>
        <Row className="g-3 gallery mt-3">
          {[1, 4, 7, 8, 10, 12].map((n) => (
            <Col key={n} xs={6} md={4} lg={2}>
              <img src={pick(pool, n)} alt="Furniture setup" style={{ height: 220 }} />
            </Col>
          ))}
        </Row>
      </Container>

      <Features />
    </>
  );
}