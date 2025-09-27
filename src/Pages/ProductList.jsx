import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = "https://68c952b1ceef5a150f645d8d.mockapi.io/products/products";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filterOption, setFilterOption] = useState("");
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

    // 🔍 SEARCH
    let filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
    );

    // 🎯 FILTER
    if (filterOption === "discount30") {
        filteredProducts = filteredProducts.filter((p) => p.discount >= 30);
    } else if (filterOption === "price500") {
        filteredProducts = filteredProducts.filter(
            (p) => p.mrp - (p.mrp * p.discount) / 100 <= 500
        );
    }

    // 🔽 SORT
    if (sortOption === "priceLowHigh") {
        filteredProducts.sort(
            (a, b) =>
                a.mrp - (a.mrp * a.discount) / 100 -
                (b.mrp - (b.mrp * b.discount) / 100)
        );
    } else if (sortOption === "priceHighLow") {
        filteredProducts.sort(
            (a, b) =>
                (b.mrp - (b.mrp * b.discount) / 100) -
                (a.mrp - (a.mrp * a.discount) / 100)
        );
    } else if (sortOption === "nameAZ") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameZA") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return (
        <div className="container">
            {/* 🔍 Search + Sort + Filter Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select w-25 mx-2"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceLowHigh">Price: Low → High</option>
                    <option value="priceHighLow">Price: High → Low</option>
                    <option value="nameAZ">Name: A → Z</option>
                    <option value="nameZA">Name: Z → A</option>
                </select>

                <select
                    className="form-select w-25"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="">Filter</option>
                    <option value="discount30">Discount ≥ 30%</option>
                    <option value="price500">Price ≤ 500</option>
                </select>
            </div>

            {/* Products List */}
            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <div className="col-md-4 mb-4" key={p.id}>
                            <div className="card shadow-lg border-0 rounded-3 h-100 hover-card">
                                <img
                                    src={p.pic}
                                    className="card-img-top rounded-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{p.name}</h5>
                                    <p className="card-text text-muted">{p.description}</p>
                                    <p className="mb-1">
                                        <span className="text-decoration-line-through text-secondary me-2">
                                            ₹{p.mrp}
                                        </span>
                                        <span className="fw-bold text-success fs-5">
                                            ₹
                                            {(
                                                p.mrp -
                                                (p.mrp * p.discount) / 100
                                            ).toFixed(2)}
                                        </span>
                                    </p>
                                    <span className="badge bg-danger">{p.discount}% OFF</span>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => navigate(`/view/${p.id}`)}
                                    >
                                        👁 View
                                    </button>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => navigate(`/edit/${p.id}`)}
                                    >
                                        ✏ Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
