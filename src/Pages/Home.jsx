import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="text-center p-5">
            <h1 className="fw-bold">Welcome to ProductApp 🛍️</h1>
            <p className="lead">Manage products with Add, Edit, Delete, and View features.</p>
            <Link to="/products" className="btn btn-primary btn-lg mt-3">
                Explore Products
            </Link>
        </div>
    );
};

export default Home;
