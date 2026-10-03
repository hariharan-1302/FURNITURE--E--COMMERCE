import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

export default function CartSidebar({ show, onHide, cartItems, removeFromCart, subtotal }) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          {cartItems.length === 0 && <p className="text-secondary">Your cart is empty.</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex align-items-center gap-3 mb-3">
              <img src={item.thumbnail} alt={item.title} width="80" height="80" style={{ objectFit: "cover", borderRadius: 8 }} />
              <div className="flex-grow-1">
                <div className="fw-medium">{item.title}</div>
                <small>
                  {item.qty} × <span style={{ color: "var(--gold)" }}>${item.price}</span>
                </small>
              </div>
              <FiX role="button" onClick={() => removeFromCart(item.id)} />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between fw-semibold border-top pt-3 mb-3">
          <span>Subtotal</span>
          <span style={{ color: "var(--gold)" }}>${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/cart" onClick={onHide} className="btn btn-outline-gold btn-sm">Cart</Link>
          <Link to="/checkout" onClick={onHide} className="btn btn-outline-gold btn-sm">Checkout</Link>
          <Link to="/comparison" onClick={onHide} className="btn btn-outline-gold btn-sm">Comparison</Link>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}