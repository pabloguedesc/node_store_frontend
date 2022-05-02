import { useEffect, useState } from "react"
import { CardProduct, IPropsProduct } from "../../components/cardProduct"
import { Header } from "../../components/header"
import "../../styles/padding.css"
import "./Product.css"
import http from "../../services/product"
import toast from "react-hot-toast"

export function Product() {

  const [ products, SetProducts ] = useState<IPropsProduct[]>([])

  useEffect(() => {
    http.listAllProducts().then((response) => {
      SetProducts(response.data)
    }).catch((error) => console.log(error))

  }, [])

  const [ name, SetName ]  = useState("")
  const [ description, SetDescription ]  = useState("")
  const [ price, SetPrice ]  = useState("")

  function CreateProduct(event: any) {
    event.preventDefault();
    if(!name || !description || !price) {
      return toast.error("Necessário preencher todos os campos!", {
        duration: 1500,
        position: "top-right"
      })
    }
    http.createProduct({
      nome: name, 
      descricao: 
      description, 
      preco: Number(price)
    }).then(() => {
      toast.success("Produto criado com sucesso!", {
        duration: 1250,
        position: "top-right"
      })
      setTimeout(() => {
        document.location.reload()
      }, 1000)
    }).catch((error) => {
      return toast.error(error.response.data.message, {
        duration: 1500,
        position: "top-right"
      })
    })
    
  }


  return (
    <div className="container">
      <header>
        <Header title="Gerenciamento de Produtos" to="/" />
      </header>
      <main className="main_container">
        <div className="container_list">
          <h3>Lista de produtos</h3>
          <div className="list_products">
            {products.length > 0 ? (
              <div id="products">
                {products.map((product) => {
                  return (
                    <CardProduct 
                      key={product.id} 
                      id={product.id}
                      nome={product.nome} 
                      descricao={product.descricao}
                      preco={product.preco}
                    />
                  )
                })}
              </div>
            ) : (
              <div>
                <p>Não há produtos registrados!</p>
              </div>
            )}
          </div>
        </div>
        <div className="container_add_products">
          <h3>Adicionar produto</h3>
          <form action="" onSubmit={CreateProduct}>
            <div id="card_register">
              <div className="input_field">
                <p>Nome:</p>
                <input 
                  type="text" 
                  placeholder="ex: Oreo" 
                  onChange={(e => SetName(e.target.value))}
                />
              </div>
              <div className="input_field" >
                <p>Descrição:</p>
                <input 
                  type="text" 
                  placeholder="ex: biscoito de chocolate"
                  onChange={(e => SetDescription(e.target.value))}
                />
              </div>
              <div className="input_field">
                <p>Preço:</p>
                <input 
                  type="number" 
                  placeholder="ex: 2" 
                  min={1} 
                  onChange={(e => SetPrice(e.target.value))}
                />
              </div>
            </div>
            <input type="submit" id="add_product" value="Adicionar Produto" />
          </form>
        </div>
      </main>
    </div>
  )
}