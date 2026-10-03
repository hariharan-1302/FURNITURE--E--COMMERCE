import { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Header from "../components/Header";
import Features from "../components/Features";
import { useProducts, getImagePool, pick } from "../data/products";

export default function Comparison({ addToCart }) {
  const { products, loading } = useProducts();
  const [firstId, setFirstId] = useState(null);
  const [secondId, setSecondId] = useState(null);

  if (loading || products.length < 2) return <p className="text-center py-5">Loading...</p>;

  const a = products.find((p) => p.id === (firstId ?? products[0].id));
  const b = products.find((p) => p.id === (secondId ?? products[1].id));

  const rows = [
    ["Price", (p) => `$${p.price}`],
    ["Category", (p) => p.category],
    ["Brand", (p) => p.brand || "Furniro"],
    ["Rating", (p) => `${p.rating} / 5`],
    ["Stock", (p) => p.stock],
    ["Warranty", (p) => p.warrantyInformation],
    ["Weight", (p) => p.weight],
  ];

  return (
    <>
      <Header title="Product Comparison" image={pick(getImagePool(products), 2)} />
      <Container className="py-5">
        <Row className="g-4 mb-4">
          <Col md={4}>
            <h3>Go to Product page for more Products</h3>
            <select className="form-select mt-3" value={b.id} onChange={(e) => setSecondId(Number(e.target.value))}>
              {products.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </Col>
          {[a, b].map((p) => (
            <Col key={p.id} xs={6} md={4}>
              <img src={p.thumbnail} alt={p.title} className="w-100 rounded" style={{ height: 200, objectFit: "cover" }} />
              <h5 className="mt-2">{p.title}</h5>
              <p className="mb-1">${p.price}</p>
              <button className="btn btn-gold btn-sm" onClick={() => addToCart(p)}>Add To Cart</button>
            </Col>
          ))}
        </Row>

        <div className="table-responsive">
          <Table bordered className="align-middle">
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label}>
                  <th style={{ width: "33%" }}>{label}</th>
                  <td>{fn(a)}</td>
                  <td>{fn(b)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Features />
    </>
  );
}