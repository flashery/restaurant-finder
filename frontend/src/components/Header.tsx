import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="page-header">
      <div className="header-content">
        <h1 className="logo">Restaurant Finder</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
