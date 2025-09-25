import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = "https://68c952b1ceef5a150f645d8d.mockapi.io/products/products";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: "", mrp: "", discount: "", description: "", pic: "" });

    useEffect(() => {
        axios.get(`${apiURL}/${id}`).then((res) => setProduct(res.data));
    }, [id]);

    const finalRate =
        product.mrp && product.discount
            ? (product.mrp - (product.mrp * product.discount) / 100).toFixed(2)
            : "";

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${apiURL}/${id}`, product);
            toast.success("Product updated!");
            navigate("/products");
        } catch {
            toast.error("Update failed!");
        }
    };

    return (
        <div className="card shadow p-4">
            <h2 className="text-center mb-4">✏ Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" className="form-control mb-3" value={product.name} onChange={handleChange} />
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input type="number" name="mrp" className="form-control" value={product.mrp} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="number" name="discount" className="form-control" value={product.discount} onChange={handleChange} />
                    </div>
                </div>
                <textarea name="description" className="form-control mb-3" value={product.description} onChange={handleChange}></textarea>
                <input type="text" name="pic" className="form-control mb-3" value={product.pic} onChange={handleChange} />
                {product.pic && <img src={product.pic} alt="preview" className="img-thumbnail mb-3" style={{ maxHeight: "200px" }} />}
                <p className="fw-bold">Final Price: <span className="text-success">{finalRate ? `₹${finalRate}` : "--"}</span></p>
                <button type="submit" className="btn btn-primary w-100">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
