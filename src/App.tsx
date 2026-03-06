import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/OrderPage";
import Layout from "./components/Layout";


import "./styles/global.css";
import Inicio from "./pages/Inicio";
import Nosotros from "./components/Nosotros";
import PlatosPage from "./pages/PlatosPage";
import Principal from "./components/pedido/Principal";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<Inicio/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="nosotros" element={<Nosotros/>} />
          <Route path="platos" element={<PlatosPage/>} />
          <Route path="pedido" element={<Principal/>} />
          <Route path="/order/:id" element={<OrderPage />} />
      
        </Routes>
      </Layout>
      


    </BrowserRouter>
  );
}

export default App;
