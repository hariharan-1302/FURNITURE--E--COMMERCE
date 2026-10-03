import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const columns = [
  { title: "Links", items: [["Home", "/"], ["Shop", "/shop"], ["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]] },
  { title: "Help", items: [["Payment Options", "/"], ["Returns", "/"], ["Privacy Policies", "/"]] },
];

export default function Footer() {
  return (
    <footer className="footer border-top mt-5 pt-5">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <h4 className="fw-bold mb-3">Furniro.</h4>
            <p className="text-secondary">
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </Col>
          {columns.map((c) => (
            <Col key={c.title} xs={6} lg={2}>
              <h6>{c.title}</h6>
              <ul className="list-unstyled d-flex flex-column gap-3 fw-medium">
                {c.items.map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </Col>
          ))}
          <Col lg={4}>
            <h6>Newsletter</h6>
            <div className="d-flex gap-3 flex-wrap">
              <input type="email" className="form-control border-0 border-bottom rounded-0 w-auto flex-grow-1" placeholder="Enter Your Email Address" />
              <button className="btn btn-link text-dark fw-semibold border-bottom rounded-0">SUBSCRIBE</button>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <p className="pb-4 mb-0">2023 Furniro. All rights reserved</p>
      </Container>
    </footer>
  );
}