import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = "https://68c952b1ceef5a150f645d8d.mockapi.io/products/products";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        mrp: "",
        discount: "",
        description: "",
        pic: "",
    });

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
            await axios.post(apiURL, product);
            toast.success("Product added!");
            setProduct({ name: "", mrp: "", discount: "", description: "", pic: "" });
        } catch (err) {
            toast.error("Failed to add product!");
        }
    };

    return (
        <div className="card shadow p-4">
            <h2 className="text-center mb-4">➕ Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name="name" className="form-control" placeholder="Product Name"
                        value={product.name} onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input type="number" name="mrp" className="form-control" placeholder="MRP"
                            value={product.mrp} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input type="number" name="discount" className="form-control" placeholder="Discount %"
                            value={product.discount} onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <textarea name="description" className="form-control" placeholder="Description"
                        value={product.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <input type="text" name="pic" className="form-control" placeholder="Image URL"
                        value={product.pic} onChange={handleChange} />
                </div>
                {product.pic && <img src={product.pic} alt="preview" className="img-thumbnail mb-3" style={{ maxHeight: "200px" }} />}
                <p className="fw-bold">Final Price: <span className="text-success">{finalRate ? `₹${finalRate}` : "--"}</span></p>
                <button type="submit" className="btn btn-success w-100">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
