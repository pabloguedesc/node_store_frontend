import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from "../pages/home"
import { Purchase } from "../pages/purchase";
import { Product } from "../pages/product";
import { DetailsPurchase } from "../pages/details/purchase";
import { DetailsProduct } from "../pages/details/product";
import { EditProduct } from "../pages/edit/product";
import { EditPurchase } from "../pages/edit/purchase";
 
export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/compras" element={<Purchase />} />
        <Route path="/compras/detalhes/:id" element={<DetailsPurchase />} />
        <Route path="/compras/edit/:id" element={<EditPurchase />} />
        <Route path="/gerenciamento_produtos" element={<Product />} />
        <Route path="/gerenciamento_produtos/detalhes/:id" element={<DetailsProduct />} />
        <Route path="/gerenciamento_produtos/edit/:id" element={<EditProduct />} />
        <Route path="*" element={
          <div>
            <h2>Error 404</h2>
          </div>
        }/>
      </Routes>
    </Router>
  )
}