import { Link } from "react-router-dom";

export default function Hero({ image }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-box">
        <p className="fw-semibold mb-1" style={{ letterSpacing: 3 }}>New Arrival</p>
        <h1>Discover Our New Collection</h1>
        <p className="my-3">
          Beautiful sofas, beds and tables to bring comfort and style to every room of your home.
        </p>
        <Link to="/shop" className="btn btn-gold">BUY NOW</Link>
      </div>
    </section>
  );
}