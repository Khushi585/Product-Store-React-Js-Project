import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = "https://68c952b1ceef5a150f645d8d.mockapi.io/products/products";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await axios.get(apiURL);
            setProducts(res.data);
        } catch {
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiURL}/${id}`);
            setProducts(products.filter((p) => p.id !== id));
            toast.success("Product deleted!");
        } catch {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="row">
            {products.map((p) => (
                <div className="col-md-4 mb-4" key={p.id}>
                    <div className="card shadow-lg border-0 rounded-3 h-100 hover-card">
                        <img src={p.pic} className="card-img-top rounded-top" alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title fw-bold">{p.name}</h5>
                            <p className="card-text text-muted">{p.description}</p>
                            <p className="mb-1">
                                <span className="text-decoration-line-through text-secondary me-2">
                                    ₹{(p.mrp)}
                                </span>
                                <span className="fw-bold text-success fs-5">
                                    ₹{(p.mrp - (p.mrp * p.discount) / 100).toFixed(2)}
                                </span>
                            </p>
                            <span className="badge bg-danger">{p.discount}% OFF</span>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <button className="btn btn-sm btn-info" onClick={() => navigate(`/view/${p.id}`)}>👁 View</button>
                            <button className="btn btn-sm btn-warning" onClick={() => navigate(`/edit/${p.id}`)}>✏ Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>🗑 Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
