import imagePurchase from "../../images/purchase.svg"
import imageProduct from "../../images/product.svg"
import "./Home.css"
import { Link } from "react-router-dom"

export function Home() {
  return (
    <div className="home">
      <main className="content">
        <Link className="image_content" id="purchase" to="/compras">
          <img className="image" src={imagePurchase} alt="img_compras" />
          <h2 id="text_purchase">Compras</h2>
        </Link>
        <Link className="image_content" id="management_of_products" to="/gerenciamento_produtos">
          <img className="image"  src={imageProduct} alt="img_produtos" />
          <h2 className="text">Gerenciamento de Produtos</h2>
        </Link>
      </main>
    </div>
  )
}