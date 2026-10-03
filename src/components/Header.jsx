import { Link } from "react-router-dom";

export default function Header({ title, image }) {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${image})` }}>
      <h2 className="fw-bold">{title}</h2>
      <small>
        <Link to="/" className="fw-semibold">Home</Link> &gt; {title}
      </small>
    </div>
  );
}