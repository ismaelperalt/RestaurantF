import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/OrderPage";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Routes>
      </Layout>
      <Footer/>


    </BrowserRouter>
  );
}

export default App;
