import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import EditProduct from "./Pages/EditProduct";
import ViewProduct from "./Pages/ViewProduct";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/view/:id" element={<ViewProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
