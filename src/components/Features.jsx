import { Container, Row, Col } from "react-bootstrap";
import { FiAward, FiShield, FiTruck, FiHeadphones } from "react-icons/fi";
import { featureList } from "../data/products";

const icons = [FiAward, FiShield, FiTruck, FiHeadphones];

export default function Features() {
  return (
    <section className="features-bar">
      <Container>
        <Row className="g-4">
          {featureList.map((f, i) => {
            const Icon = icons[i];
            return (
              <Col key={f.title} xs={12} sm={6} lg={3} className="d-flex align-items-center gap-3">
                <Icon size={42} />
                <div>
                  <h6 className="fw-semibold mb-0">{f.title}</h6>
                  <small className="text-secondary">{f.text}</small>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}