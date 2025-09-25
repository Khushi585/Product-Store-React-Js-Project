import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = "https://68c952b1ceef5a150f645d8d.mockapi.io/products/products";

const ViewProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`${apiURL}/${id}`)
            .then((res) => setProduct(res.data))
            .catch(() => toast.error("Failed to load product"));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const finalRate =
        product.mrp && product.discount
            ? product.mrp - (product.mrp * product.discount) / 100
            : "";

    return (
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
            <img src={product.pic} alt={product.name} className="card-img-top mb-3" />
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <p>
                <span className="text-decoration-line-through text-secondary me-2">
                    ₹{product.mrp}
                </span>
                <span className="fw-bold text-success fs-4">₹{finalRate}</span>
            </p>
            <span className="badge bg-danger">{product.discount}% OFF</span>
        </div>
    );
};

export default ViewProduct;
