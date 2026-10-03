import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../data/products";

const colors = ["#816dfa", "#000000", "#b88e2f"];
const sizes = ["L", "XL", "XS"];

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  const product = products.find((p) => p.id === Number(id));
  const related = products.filter((p) => p.id !== Number(id));

  useEffect(() => { setActiveImg(0); setQty(1); window.scrollTo(0, 0); }, [id]);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error || !product) return <p className="text-center py-5">Product not found.</p>;

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <>
      <Container className="py-5">
        <Row className="g-5">
          <Col md={6}>
            <Row className="g-3">
              <Col xs={3} className="d-flex flex-column gap-3">
                {images.slice(0, 4).map((img, i) => (
                  <img key={i} src={img} alt="" className={`thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)} />
                ))}
              </Col>
              <Col xs={9}>
                <img src={images[activeImg]} alt={product.title} className="main-img" />
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <h2>{product.title}</h2>
            <h5 className="text-secondary">$ {product.price}</h5>
            <p className="text-warning">★ {product.rating} <span className="text-secondary">· {product.reviews?.length || 0} Customer Reviews</span></p>
            <p>{product.description}</p>

            <p className="mb-1 text-secondary">Size</p>
            {sizes.map((s) => (
              <button key={s} className={`size-btn ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>{s}</button>
            ))}

            <p className="mb-1 mt-3 text-secondary">Color</p>
            {colors.map((c) => (
              <button
                key={c}
                className="color-dot"
                style={{ background: c, outline: color === c ? "2px solid #000" : "none", outlineOffset: 2 }}
                onClick={() => setColor(c)}
              />
            ))}

            <div className="d-flex flex-wrap gap-3 mt-4">
              <div className="qty-box">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn btn-outline-dark rounded-3 px-5" onClick={() => addToCart(product, qty)}>
                Add To Cart
              </button>
            </div>

            <hr />
            <small className="text-secondary d-block">SKU : {product.sku}</small>
            <small className="text-secondary d-block">Category : {product.category}</small>
            <small className="text-secondary d-block">Brand : {product.brand || "Furniro"}</small>
          </Col>
        </Row>

        {/* Tabs */}
        <div className="border-top mt-5 pt-4">
          <div className="d-flex justify-content-center flex-wrap mb-4">
            {[["description", "Description"], ["info", "Additional Information"], ["reviews", `Reviews [${product.reviews?.length || 0}]`]].map(([key, label]) => (
              <button key={key} className={`tab-btn ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>{label}</button>
            ))}
          </div>

          {tab === "description" && <p className="text-secondary mx-auto" style={{ maxWidth: 800 }}>{product.description}</p>}
          {tab === "info" && (
            <ul className="text-secondary list-unstyled text-center">
              <li>Weight: {product.weight}</li>
              <li>Dimensions: {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth}</li>
              <li>Warranty: {product.warrantyInformation}</li>
              <li>Shipping: {product.shippingInformation}</li>
            </ul>
          )}
          {tab === "reviews" && (
            <div className="mx-auto" style={{ maxWidth: 700 }}>
              {product.reviews?.map((r, i) => (
                <div key={i} className="mb-3 border-bottom pb-2">
                  <strong>{r.reviewerName}</strong> <span className="text-warning">{"★".repeat(r.rating)}</span>
                  <p className="mb-0 text-secondary">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      <Container className="pb-5">
        <h2 className="section-title mb-4">Related Products</h2>
        <ProductGrid products={related} loading={false} error="" addToCart={addToCart} />
      </Container>
    </>
  );
}