import { CardPurchase, IPropsPurchase } from "../../components/cardPurchase"
import { Header } from "../../components/header"
import "../../styles/padding.css"
import "./Purchase.css"
import httpProduct from "../../services/product"
import httpPurchase, { ICreatePurchase, IProductPurchase } from "../../services/purchase"
import { useEffect, useState } from "react"
import { IPropsProduct } from "../../components/cardProduct"
import toast from "react-hot-toast"

interface IProductsSelected {
  produto: {
    id?: number;
    nome?: string;
    preco?: number;
    total?: number;
    quantidade: number;
  }
}

export function Purchase() {

  const [ products, SetProducts ] = useState<IPropsProduct[]>([])
  const [ product, SetProduct] = useState("")
  const [ quantity, SetQuantity ] = useState(0)
  const [ selectedProducts, SetSelectedProducts ] = useState<IProductsSelected[]>([])
  const [ total, SetTotal ]  = useState(0)
  const [ payment, SetPayment ] = useState("")

  const [ purchases, SetPurchases ] = useState<IPropsPurchase[]>([])

  useEffect(() => {
    httpPurchase.listAllPurchases().then((purchases) => {
      SetPurchases(purchases.data)
    }).catch((error) => console.log(error))

    httpProduct.listAllProducts().then((products) => {
      SetProducts(products.data)
    }).catch((error) => console.log(error))
  }, [])

  function AddProductsInList() {
    httpProduct.findProductById(Number(product))
    .then((p) => {

      const productAlreadySelected = selectedProducts.find((p) => p.produto.id === Number(product))

      if(productAlreadySelected) {
        return toast.error("Produto já foi selecionado", {
          duration: 1200,
          position: "top-right"
        })
      }

      if(!quantity || quantity < 1) {
        return toast.error("Selecione uma quantidade válida!", {
          duration: 1200,
          position: "top-right"
        })
      }

      const newPrice = total + p.data.preco * quantity;
      const lala: IProductsSelected = {
        produto: {
          id: Number(product),
          nome: p.data.nome,
          quantidade: quantity,
          preco: p.data.preco,
          total: p.data.preco * quantity
        }
      }
      selectedProducts.push(lala)
      SetTotal(newPrice)
    }).catch((error) => {
      if(error.response.status === 404) {
        toast.error("Selecione um produto!", {
          duration: 1200,
          position: "top-right"
        })
      }
    })

  }

  function RemoveProduct(id_produto: number) {
    const index = selectedProducts.findIndex(p => p.produto.id === id_produto)
        const p = selectedProducts
        
        SetTotal(total - (Number(p[index].produto.preco) * Number(p[index].produto.quantidade)))
        p.splice(index, 1)
        SetSelectedProducts(p)
        toast.success("Produto removido!", {
          position: "top-right"
        })
        return
  }

  function CreatePurchase() {

    const productsToCreate: IProductPurchase[] = []

    selectedProducts.forEach((p) => {
      const product: IProductPurchase = {
        id_produto: Number(p.produto.id),
        preco: Number(p.produto.preco),
        quantidade: Number(p.produto.quantidade)
      }
      productsToCreate.push(product)
    })

    const data: ICreatePurchase = {
      tipo_pagamento: payment,
      total: total, 
      produtos: productsToCreate
    }

    httpPurchase.createPurchase(data).then(() => {
      toast.success("Compra adicionada com sucesso", {
        position: "top-right",
        duration: 1200
      })
      return setTimeout(() => {
        document.location.reload()
      }, 1000)
    }).catch((error) => {
      return toast.error(error.response.data.message, {
        position: "top-right"
      })
    })
  }

  return (
    <div className="container">
      <header>
        <Header title="Compras" to="/"/>
      </header>
      <main className="main_container">
        <div className="container_list">
          <h3>Lista de compras</h3>
          {purchases.length > 0 ? (
            <div>
              <div className="list_purchases">
                {purchases.map((p) => {
                  return (
                    <div id="purchases">
                    <CardPurchase id={p.id} status={p.status} total={p.total}/>
                  </div>
                  )
                })}
              </div>
            </div>
          ): (
            <div>
              <p>Não há compras registradas!</p>
            </div>
          )}

        </div>
        <div className="container_add_purchase">
          <h3>Comprar</h3>
            <div id="card_register">
              <div className="input_field">
                <p>Selecionar produto:</p>
                {products.length > 0 ? (
                  <select name="" id="select_product" onChange={((e)=> SetProduct(e.target.value))}>
                    <option value="0" disabled>selecione um produto</option>
                  {products.map((product) => {
                    return (
                      <option key={product.id} value={product.id}>{product.nome} - R${product.preco},00</option>
                    )
                  })}
                  </select>
                ): (
                  <select name=""  id="select_product" disabled>
                    <option value="">Sem produtos cadastrados</option>
                  </select>
                )}
                
              </div>
              <div className="input_field" >
                <p>Quantidade:</p>
                <input type="number" min={1} onChange={(e => SetQuantity(Number(e.target.value)))}/>
              </div>
              <div className="btn_add_product">
                <button onClick={AddProductsInList}>Adicionar produto</button>
              </div>
              <div>
                {selectedProducts.map(p => {
                  return (
                    <p key={p.produto.id}>
                      {p.produto.quantidade}x - {p.produto.nome} - R$ {p.produto.total},00
                      <button id="remove_product_list" onClick={() => RemoveProduct(Number(p.produto.id))}>X</button>
                    </p>
                  )
                })}
              </div>
              <div className="total_purchase">
                <h2>TOTAL:</h2>
                <h2 id="total">R${total}</h2>
              </div>
              {selectedProducts.length > 0 ? (
                <select name="" id="select_payment" onChange={(e => SetPayment(e.target.value))}>
                  <option value="0" >selecione a forma de pagamento</option>
                  <option value="dinheiro">DINHEIRO</option>
                  <option value="debito">DEBITO</option>
                  <option value="credito">CREDITO</option>
                </select>
              ): (
                <select disabled name="" id="select_payment">
                  <option value="">selecione a forma de pagamento</option>
                </select>
              )}
              
            </div>
            <div>
              <button></button>
            </div>
            <input onClick={CreatePurchase} type="submit" id="add_purchase" value="Adicionar Compra"/>
        </div>
      </main>
    </div>
  )
}
