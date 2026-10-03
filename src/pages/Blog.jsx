import { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { FiUser, FiCalendar, FiTag } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import { useProducts, getImagePool, pick, blogPosts, blogCategories } from "../data/products";

const PER_PAGE = 2;

export default function Blog() {
  const { products } = useProducts();
  const pool = getImagePool(products);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const visible = blogPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header title="Blog" image={pick(pool, 6)} />
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={8}>
            {visible.map((post) => (
              <article key={post.id} className="mb-5">
                <img src={pick(pool, post.id * 2)} alt={post.title} className="w-100 rounded" style={{ height: 380, objectFit: "cover" }} />
                <div className="d-flex gap-4 text-secondary small my-3 flex-wrap">
                  <span><FiUser /> Admin</span>
                  <span><FiCalendar /> {post.date}</span>
                  <span><FiTag /> {post.category}</span>
                </div>
                <h3 className="fw-semibold">{post.title}</h3>
                <p className="text-secondary">{post.text}</p>
                <a href="#!" className="border-bottom border-dark pb-1">Read more</a>
              </article>
            ))}

            <Pagination className="gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</Pagination.Item>
              ))}
              <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
            </Pagination>
          </Col>

          <Col lg={4}>
            <input className="form-control mb-4" placeholder="Search" />
            <h4 className="fw-semibold">Categories</h4>
            <ul className="list-unstyled text-secondary d-flex flex-column gap-3 my-4">
              {blogCategories.map((c) => (
                <li key={c} className="d-flex justify-content-between"><span>{c}</span><span>{(c.length * 2) % 9 + 2}</span></li>
              ))}
            </ul>

            <h4 className="fw-semibold">Recent Posts</h4>
            {blogPosts.map((p) => (
              <div key={p.id} className="d-flex gap-3 my-3">
                <img src={pick(pool, p.id * 2)} alt="" width="80" height="80" style={{ objectFit: "cover", borderRadius: 8 }} />
                <div>
                  <div className="small">{p.title}</div>
                  <small className="text-secondary">{p.date}</small>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Features />
    </>
  );
}