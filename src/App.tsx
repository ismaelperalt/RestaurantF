import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/ Dashboard";



import Layout from "./components/Layout";


import "./styles/global.css";

import PlatosPage from "./components/menu/PlatosPage";
import Principal from "./components/pedido/Principal";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<Dashboard/>} />
          <Route path="menu" element={<PlatosPage/>} />
          <Route path="platos" element={<Principal/>} />
       
        </Routes>
      </Layout>
      


    </BrowserRouter>
  );
}

export default App;
