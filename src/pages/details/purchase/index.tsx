import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import "../../../styles/padding.css"
import "./DetailsPurchase.css"
import http from "../../../services/purchase"

interface IListProducts {
  id_produto: number,
  preco: number,
  quantidade: number;
  produto: {
    nome: string;
    descricao: string;
  }
}

export function DetailsPurchase() {
  const {id} = useParams()

  const [codePurchase, SetCodePurchase] = useState("")
  const [status, SetStatus] = useState("")
  const [total, SetTotal] = useState(0)
  const [typePayment, SetTypePayment] = useState("")
  const [date_creation, SetDateCreation] = useState("")
  const [ products, SetProducts ] = useState<IListProducts[]>([])

  useEffect(() => {
    const getPurchase = async () => {

      const response = await http.findPurchaseById(Number(id))

      SetCodePurchase(response.data.id)
      SetStatus(response.data.status)
      SetTotal(response.data.total)
      SetTypePayment(response.data.tipo_pagamento)
      SetProducts(response.data.ListProducts)
      

      const creation = dayjs(response.data.data_criacao)

      SetDateCreation(creation.format("DD/MM/YYYY"))

    }

    getPurchase().catch((error) => console.log(error))
  },[])

  console.log(products)

  return (
    <div className="container">
      <Header title="Detalhes da Compra" to="/compras"/>
      <main className="container_details">
        <div className="field" >
          <p>Código da compra:</p>
          <p className="field_purchase" >{codePurchase}</p>
        </div>
        <div className="field" >
          <p>Status:</p>
          <p className="field_purchase" >{status}</p>
        </div>
        <div className="field" >
          <p>Tipo de pagamento:</p> 
          <p className="field_purchase" >{typePayment}</p>
        </div>
        <div className="field" >
          <p>Total:</p>
          <p className="field_purchase" >R$ {total},00</p>
        </div>
        <div className="field" >
          <p>data de criação:</p>
          <p className="field_purchase" >{date_creation}</p>
        </div>
        <div>
          
          <div className="list_products_purchase">
            <h4>Lista de produtos</h4>
            {products.map((p) => {
              return (
                <div className="field">
                  <p> {p.quantidade}x {p.produto.nome} - R$ {p.preco},00</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}