import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import { useProducts, getImagePool, pick } from "../data/products";

export default function Cart({ cartItems, removeFromCart, updateQty, subtotal }) {
  const { products } = useProducts();

  return (
    <>
      <Header title="Cart" image={pick(getImagePool(products), 3)} />
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={8}>
            <div className="table-responsive">
              <Table className="align-middle">
                <thead className="cart-head">
                  <tr>
                    <th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.thumbnail} alt="" width="80" height="80" style={{ objectFit: "cover", borderRadius: 8 }} /></td>
                      <td className="text-secondary">{item.title}</td>
                      <td className="text-secondary">${item.price}</td>
                      <td>
                        <input type="number" min="1" className="form-control" style={{ width: 70 }} value={item.qty} onChange={(e) => updateQty(item.id, Number(e.target.value))} />
                      </td>
                      <td>${(item.price * item.qty).toFixed(2)}</td>
                      <td><FiTrash2 role="button" style={{ color: "var(--gold)" }} onClick={() => removeFromCart(item.id)} /></td>
                    </tr>
                  ))}
                  {cartItems.length === 0 && (
                    <tr><td colSpan="6" className="text-center py-5">Your cart is empty. <Link to="/shop" style={{ color: "var(--gold)" }}>Go shopping</Link></td></tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>

          <Col lg={4}>
            <div className="p-4 text-center" style={{ background: "var(--gold-light)" }}>
              <h3 className="fw-bold mb-4">Cart Totals</h3>
              <div className="d-flex justify-content-between mb-3"><span>Subtotal</span><span className="text-secondary">${subtotal.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between mb-4"><span>Total</span><strong style={{ color: "var(--gold)" }}>${subtotal.toFixed(2)}</strong></div>
              <Link to="/checkout" className={`btn btn-outline-dark rounded-3 px-5 ${cartItems.length ? "" : "disabled"}`}>Check Out</Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Features />
    </>
  );
}