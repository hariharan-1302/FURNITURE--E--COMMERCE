import { Link } from "react-router-dom";
import { FiShare2, FiHeart, FiRepeat } from "react-icons/fi";

export default function ProductCart({ product, index = 0, addToCart }) {
  const discount = Math.round(product.discountPercentage || 0);
  const isSale = index % 2 === 0 && discount > 0;
  const oldPrice = (product.price / (1 - discount / 100)).toFixed(2);

  return (
    <div className="product-card">
      <span className={`badge-pill ${isSale ? "badge-sale" : "badge-new"}`}>
        {isSale ? `-${discount}%` : "New"}
      </span>

      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>

      <div className="card-body-custom">
        <h5 className="fw-semibold mb-1">{product.title}</h5>
        <p className="text-secondary mb-2 small text-truncate">{product.description}</p>
        <div>
          <span className="fw-semibold">${product.price}</span>
          {isSale && <span className="old-price">${oldPrice}</span>}
        </div>
      </div>

      <div className="overlay">
        <button className="btn btn-light text-warning fw-semibold rounded-0 px-4" onClick={() => addToCart(product)}>
          Add to cart
        </button>
        <div className="d-flex gap-3 text-white small">
          <span><FiShare2 /> Share</span>
          <Link to="/comparison"><FiRepeat /> Compare</Link>
          <span><FiHeart /> Like</span>
        </div>
      </div>
    </div>
  );
}