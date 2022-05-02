import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import "../../../styles/padding.css"
import http from "../../../services/product"
import { useEffect, useState } from "react";
import "../../details/product/DetailsProduct.css"
import "./EditProduct.css"
import toast from "react-hot-toast";

export function EditProduct() {
  const navigate = useNavigate()
  const {id} = useParams()

  const [name, SetName] = useState("")
  const [description, SetDescription] = useState("")
  const [price, SetPrice] = useState(0)

  useEffect(() => {
    const getProduct = async () => {
      const response = await http.findProductById(Number(id))

      SetName(response.data.nome)
      SetDescription(response.data.descricao)
      SetPrice(response.data.preco)
    }

    getProduct().catch((error) => console.log(error))
  },[])

  function EditProduct(event: any) {
    event.preventDefault()
    http.editProduct({
      id: Number(id),
      descricao: description,
      nome: name,
      preco: price
    }).then(() => {
      toast.success("Produto atualizado!", {
        duration: 1500,
        position: "top-right"
      })
      return navigate("/gerenciamento_produtos")
    }).catch((error) => {
      return toast.error(error.response.data.message, {
        duration: 1500,
        position: "top-right"
      })
    })
  }

  return (
    <div className="container">
      <Header title="Detalhes do Produto - Editar" to="/gerenciamento_produtos"/>
      <main className="container_details edit_product">
        <form action="" className="form_edit" onSubmit={EditProduct}>
          <div>
            <p>nome:</p>
            <input 
              className="field_product_edit" 
              value={name} 
              onChange={(e => SetName(e.target.value))}
            />
          </div>
          <div>
            <p>descrição:</p>
            <input
             className="field_product_edit" 
             value={description}
             onChange={(e => SetDescription(e.target.value))}
            />
          </div>
          <div>
            <p>preço:</p> 
            <input
            type="number"
              className="field_product_edit" 
              value={price}
              onChange={(e => SetPrice(Number(e.target.value)))}
            />
          </div>
          <input id="edit_form_button" type="submit" value="Editar"/>
        </form>
      </main>
    </div>
  )
}