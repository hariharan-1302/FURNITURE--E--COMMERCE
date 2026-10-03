import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FiUser, FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ cartCount, onCartClick }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky-top shadow-sm">
      <Container className="d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="fs-3 fw-bold text-dark">
          <span style={{ color: "var(--gold)" }}>▣</span> Furniro
        </Link>

        <nav className="d-none d-lg-flex gap-5">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="fw-medium">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="d-flex align-items-center gap-3 fs-5">
          <FiUser className="d-none d-sm-block" role="button" />
          <FiSearch className="d-none d-sm-block" role="button" />
          <FiHeart className="d-none d-sm-block" role="button" />
          <span className="position-relative" role="button" onClick={onCartClick}>
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ background: "var(--gold)" }}>
                {cartCount}
              </span>
            )}
          </span>
          <button className="btn d-lg-none p-0 fs-3" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="d-lg-none bg-white border-top">
          <Container className="py-3 d-flex flex-column gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}