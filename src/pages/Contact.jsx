import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import { useProducts, getImagePool, pick } from "../data/products";

const info = [
  { Icon: FiMapPin, title: "Address", text: "236 5th SE Avenue, New York NY10000, United States" },
  { Icon: FiPhone, title: "Phone", text: "Mobile: +(84) 546-6789\nHotline: +(84) 456-6789" },
  { Icon: FiClock, title: "Working Time", text: "Monday-Friday: 9:00 - 22:00\nSaturday-Sunday: 9:00 - 21:00" },
];

export default function Contact() {
  const { products } = useProducts();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setForm({ name: "", email: "", subject: "", message: "" }); };

  return (
    <>
      <Header title="Contact" image={pick(getImagePool(products), 5)} />
      <Container className="py-5">
        <h2 className="section-title">Get In Touch With Us</h2>
        <p className="section-sub mx-auto" style={{ maxWidth: 600 }}>
          For more information about our products &amp; services, please feel free to drop us an email.
        </p>

        <Row className="g-5 justify-content-center">
          <Col lg={4}>
            {info.map(({ Icon, title, text }) => (
              <div key={title} className="d-flex gap-3 mb-4">
                <Icon size={26} className="mt-1" />
                <div>
                  <h5 className="fw-semibold">{title}</h5>
                  <p style={{ whiteSpace: "pre-line" }} className="mb-0">{text}</p>
                </div>
              </div>
            ))}
          </Col>

          <Col lg={6}>
            <Form onSubmit={handleSubmit}>
              {[["name", "Your name"], ["email", "Email address"], ["subject", "Subject"]].map(([n, label]) => (
                <Form.Group key={n} className="mb-3">
                  <Form.Label className="fw-semibold">{label}</Form.Label>
                  <Form.Control name={n} type={n === "email" ? "email" : "text"} value={form[n]} onChange={handleChange} required={n !== "subject"} />
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Message</Form.Label>
                <Form.Control as="textarea" rows={4} name="message" value={form.message} onChange={handleChange} required />
              </Form.Group>
              <button className="btn btn-gold" type="submit">Submit</button>
              {sent && <p className="text-success mt-3">Thanks! Your message has been sent.</p>}
            </Form>
          </Col>
        </Row>
      </Container>
      <Features />
    </>
  );
}