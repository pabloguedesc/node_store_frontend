import { DeleteButton } from "../buttons/deleteButton";
import { EditButton } from "../buttons/editButton";
import "./CardProduct.css"
import http from "../../services/product"
import { Link, useNavigate } from "react-router-dom";

export interface IPropsProduct {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  data_criacao?: Date;
}

export function CardProduct({ id ,preco, descricao, nome }:IPropsProduct) {
  const navigate = useNavigate()

  function EditProduct() {
    return navigate(`/gerenciamento_produtos/edit/${id}`)
  } 
  function DeleteProduct() {
    http.deleteProduct(Number(id)).then((response) => {
      console.log(response)
      window.location.reload()
    }).catch((error) => console.log(error))
  } 

  function ViewDetails() {
    return navigate(`/gerenciamento_produtos/detalhes/${id}`)
  }


  return (
    <div className="card">
      <main onClick={ViewDetails}>
        <div className="card_field" >
          <p className="title_field">nome:</p>
          <p className="description_field">{nome}</p>
        </div>
        <div className="card_field" >
          <p className="title_field" >descrição:</p>
          <p className="description_field">{descricao}</p>
        </div >
        <div className="card_field" >
          <p className="title_field">preço:</p>
          <p className="description_field">R${preco},00</p>
        </div>
      </main>
      <div className="buttons">
        <div className="btn">
          <div onClick={EditProduct}>
            <EditButton/>
          </div>
        </div>
        <div className="btn">
          <div onClick={DeleteProduct}>
            <DeleteButton />
          </div>
        </div>
      </div>
    </div>
  )
}