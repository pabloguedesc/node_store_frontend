import { useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import "../../../styles/padding.css"
import http from "../../../services/product"
import { useEffect, useState } from "react";
import "./DetailsProduct.css"
import dayjs from "dayjs";

export function DetailsProduct() {
  const {id} = useParams()

  const [name, SetName] = useState("")
  const [description, SetDescription] = useState("")
  const [price, SetPrice] = useState(0)
  const [date_creation, SetDateCreation] = useState("")
  const [date_update, SetDateUpdate] = useState("")

  useEffect(() => {
    const getProduct = async () => {

      const response = await http.findProductById(Number(id))

      SetName(response.data.nome)
      SetDescription(response.data.descricao)
      SetPrice(response.data.preco)

      const creation = dayjs(response.data.data_criacao)
      const update = dayjs(response.data.data_atualizacao)

      SetDateCreation(creation.format("DD/MM/YYYY"))
      SetDateUpdate(update.format("DD/MM/YYYY"))

    }

    getProduct().catch((error) => console.log(error))
  },[])

  return (
    <div className="container">
      <Header title="Detalhes do Produto" to="/gerenciamento_produtos"/>
      <main className="container_details">
        <div className="field" >
          <p>nome:</p>
          <p className="field_product" >{name}</p>
        </div>
        <div className="field" >
          <p>descrição:</p>
          <p className="field_product" >{description}</p>
        </div>
        <div className="field" >
          <p>preço:</p> 
          <p className="field_product" >R$ {price},00</p>
        </div>
        <div className="field" >
          <p>data de criação:</p>
          <p className="field_product" >{date_creation}</p>
        </div>
        <div className="field">
          <p>data de atualização:</p>
          <p className="field_product" >{date_update}</p>
        </div>
      </main>
    </div>
  )
}