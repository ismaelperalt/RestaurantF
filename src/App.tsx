import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pedidoo/Dashboard";
import OrderPage from "./components/pedidoo/OrderPage";
import Layout from "./components/Layout";


import "./styles/global.css";
import Nosotros from "./components/nosotros/Nosotros";
import PlatosPage from "./components/menu/PlatosPage";
import Principal from "./components/pedido/Principal";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<PlatosPage/>} />
          <Route path="pedido" element={<Principal/>} />
       
      
        </Routes>
      </Layout>
      


    </BrowserRouter>
  );
}

export default App;
