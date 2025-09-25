import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark px-3 shadow">
            <Link className="navbar-brand fw-bold" to="/">🛒 ProductApp</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add">Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Product List</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
