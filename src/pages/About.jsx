import { Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiBox, FiDollarSign, FiStar, FiTag } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import { useProducts, getImagePool, pick } from "../data/products";

 function About({ addToCart }) {
  const { products, loading, error } = useProducts();
  const pool = getImagePool(products);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;

  // Summary numbers calculated from the API data
  const avgPrice = products.reduce((n, p) => n + p.price, 0) / products.length;
  const avgRating = products.reduce((n, p) => n + p.rating, 0) / products.length;
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const stats = [
    { Icon: FiBox, label: "Furniture Pieces", value: products.length },
    { Icon: FiDollarSign, label: "Average Price", value: `$${avgPrice.toFixed(2)}` },
    { Icon: FiStar, label: "Average Rating", value: `${avgRating.toFixed(1)} / 5` },
    { Icon: FiTag, label: "Brands", value: brands.length || 1 },
  ];

  return (
    <>
      <Header title="About" image={pick(pool, 2)} />

      {/* Intro */}
      <Container className="py-5">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <h2 className="fw-bold">About Furniro Furniture</h2>
            <p className="text-secondary">
              Furniro brings together beds, sofas, tables, wardrobes and more to help you
              furnish every room of your home. Each piece is chosen for comfort, durability
              and timeless interior style.
            </p>
            <p className="text-secondary">
              Below you can find the full details of every product in our collection:
              brand, size, stock, warranty, shipping and customer rating.
            </p>
            <Link to="/shop" className="btn btn-gold">Visit Shop</Link>
          </Col>
          <Col lg={6}>
            <img
              src={pick(pool, 0)}
              alt="Furniture"
              className="w-100 rounded"
              style={{ height: 360, objectFit: "cover" }}
            />
          </Col>
        </Row>
      </Container>

      {/* Stats */}
      <section style={{ background: "var(--gold-light)" }} className="py-5">
        <Container>
          <Row className="g-4 text-center">
            {stats.map(({ Icon, label, value }) => (
              <Col key={label} xs={6} lg={3}>
                <Icon size={32} style={{ color: "var(--gold)" }} />
                <h3 className="fw-bold mt-2 mb-0">{value}</h3>
                <small className="text-secondary">{label}</small>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Product details */}
      <Container className="py-5">
        <h2 className="section-title">Our Products in Detail</h2>
        <p className="section-sub">Everything you need to know before you buy.</p>

        {products.map((p, i) => (
          <Row
            key={p.id}
            className={`align-items-center g-4 mb-5 ${i % 2 ? "flex-lg-row-reverse" : ""}`}
          >
            <Col lg={5}>
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-100 rounded"
                style={{ height: 320, objectFit: "cover", background: "#f4f5f7" }}
              />
            </Col>

            <Col lg={7}>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <h3 className="fw-semibold mb-0">{p.title}</h3>
                <Badge bg="warning" text="dark" className="text-capitalize">{p.category}</Badge>
              </div>

              <p className="mb-2">
                <span className="fw-bold fs-5" style={{ color: "var(--gold)" }}>${p.price}</span>{" "}
                <span className="text-warning">★ {p.rating}</span>
              </p>

              <p className="text-secondary">{p.description}</p>

              <Row className="g-2 small mb-3">
                <Col xs={6} md={4}><strong>Brand:</strong> {p.brand || "Furniro"}</Col>
                <Col xs={6} md={4}><strong>SKU:</strong> {p.sku}</Col>
                <Col xs={6} md={4}><strong>Stock:</strong> {p.stock}</Col>
                <Col xs={6} md={4}><strong>Weight:</strong> {p.weight}</Col>
                <Col xs={6} md={8}>
                  <strong>Size:</strong> {p.dimensions?.width} × {p.dimensions?.height} × {p.dimensions?.depth}
                </Col>
                <Col xs={12} md={6}><strong>Warranty:</strong> {p.warrantyInformation}</Col>
                <Col xs={12} md={6}><strong>Shipping:</strong> {p.shippingInformation}</Col>
              </Row>

              <div className="d-flex gap-2 flex-wrap">
                <Link to={`/product/${p.id}`} className="btn btn-outline-gold btn-sm">View Details</Link>
                <button className="btn btn-gold btn-sm" onClick={() => addToCart(p)}>Add To Cart</button>
              </div>
            </Col>
          </Row>
        ))}
      </Container>

      <Features />
    </>
  );
}
export default About;