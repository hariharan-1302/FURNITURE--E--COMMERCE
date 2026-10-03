import { useState, useMemo, useEffect } from "react";
import { Container, Pagination } from "react-bootstrap";
import { FiSliders } from "react-icons/fi";
import Header from "../components/Header";
import Features from "../components/Features";
import ProductGrid from "../components/ProductGrid";
import { useProducts, getImagePool, pick } from "../data/products";

const PER_PAGE = 4;

export default function Shop({ addToCart }) {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, search, sort]);

  useEffect(() => setPage(1), [search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header title="Shop" image={pick(getImagePool(products), 1)} />

      <div style={{ background: "#f9f1e7" }} className="py-3">
        <Container className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2"><FiSliders /> Filter</span>
          <small>
            Showing {filtered.length ? (page - 1) * PER_PAGE + 1 : 0}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} results
          </small>
          <div className="d-flex gap-2">
            <input className="form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <ProductGrid products={visible} loading={loading} error={error} addToCart={addToCart} />

        <Pagination className="justify-content-center mt-5 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
        </Pagination>
      </Container>

      <Features />
    </>
  );
}