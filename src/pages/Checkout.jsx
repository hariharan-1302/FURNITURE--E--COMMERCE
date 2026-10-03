import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../components/Header";
import Features from "../components/Features";
import { useProducts, getImagePool, pick } from "../data/products";

const initial = { firstName: "", lastName: "", company: "", country: "India", address: "", city: "", zip: "", phone: "", email: "", notes: "" };

export default function Checkout({ cartItems, subtotal }) {
  const { products } = useProducts();
  const [form, setForm] = useState(initial);
  const [payment, setPayment] = useState("bank");
  const [placed, setPlaced] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setPlaced(true); };

  const fields = [
    ["firstName", "First Name"], ["lastName", "Last Name"], ["company", "Company Name (Optional)"],
    ["address", "Street address"], ["city", "Town / City"], ["zip", "ZIP code"],
    ["phone", "Phone"], ["email", "Email address"],
  ];

  return (
    <>
      <Header title="Checkout" image={pick(getImagePool(products), 4)} />
      <Container className="py-5">
        {placed ? (
          <div className="text-center py-5">
            <h3>Thank you! Your order has been placed.</h3>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="g-5">
              <Col lg={6}>
                <h2 className="fw-bold mb-4">Billing details</h2>
                <Row className="g-3">
                  {fields.map(([name, label]) => (
                    <Col key={name} md={name === "firstName" || name === "lastName" ? 6 : 12}>
                      <Form.Label>{label}</Form.Label>
                      <Form.Control name={name} value={form[name]} onChange={handleChange} required={name !== "company"} type={name === "email" ? "email" : "text"} />
                    </Col>
                  ))}
                  <Col xs={12}>
                    <Form.Control as="textarea" rows={3} name="notes" placeholder="Additional information" value={form.notes} onChange={handleChange} />
                  </Col>
                </Row>
              </Col>

              <Col lg={6}>
                <div className="d-flex justify-content-between fw-semibold fs-5"><span>Product</span><span>Subtotal</span></div>
                {cartItems.map((i) => (
                  <div key={i.id} className="d-flex justify-content-between text-secondary my-2">
                    <span>{i.title} <strong className="text-dark">× {i.qty}</strong></span>
                    <span>${(i.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="d-flex justify-content-between my-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between fw-bold fs-5 border-bottom pb-3"><span>Total</span><span style={{ color: "var(--gold)" }}>${subtotal.toFixed(2)}</span></div>

                <div className="mt-4">
                  <Form.Check type="radio" id="bank" label="Direct Bank Transfer" checked={payment === "bank"} onChange={() => setPayment("bank")} />
                  <Form.Check type="radio" id="cod" label="Cash On Delivery" className="mt-2" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                </div>
                <button type="submit" className="btn btn-outline-dark rounded-3 px-5 mt-4" disabled={!cartItems.length}>Place order</button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
      <Features />
    </>
  );
}