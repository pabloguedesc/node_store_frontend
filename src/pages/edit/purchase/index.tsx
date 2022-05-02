import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import "../../../styles/padding.css"
import http from "../../../services/purchase"
import { useEffect, useState } from "react";
import "../../details/product/DetailsProduct.css"
import "../product/EditProduct.css"
import toast from "react-hot-toast";

export function EditPurchase() {
  const navigate = useNavigate()
  const {id} = useParams()

  const [typePayment, SetTypePayment] = useState("")
  const [currentPayment, SetCurrentPayment] = useState("")

  useEffect(() => {
    const getPurchase = async () => {
      const response = await http.findPurchaseById(Number(id))

      SetTypePayment(response.data.tipo_pagamento)
      SetCurrentPayment(response.data.tipo_pagamento)
    }

    getPurchase().catch((error) => console.log(error))
  },[])

  function EditPurchase(event: any) {
    event.preventDefault()
    console.log(id)
    console.log(typePayment)
  
    http.editPurchase({
      id_compra: Number(id),
      tipo_pagamento: typePayment,
    }).then(() => {
      toast.success("Compra atualizada!", {
        duration: 1500,
        position: "top-right"
      })
      return navigate("/compras")
    }).catch((error) => {
      return toast.error(error.response.data.message, {
        duration: 1500,
        position: "top-right"
      })
    })


  }

  return (
    <div className="container">
      <Header title="Compras - Editar" to="/compras"/>
      <main className="container_details edit_product">
        <form action="" className="form_edit" onSubmit={EditPurchase}>
          <h2>Compra: {id}</h2>
          <div>
            <p>Selecionar tipo de pagamento</p> 
            <p>Tipo atual: {currentPayment}</p>
            <select id="select_payment" onChange={(e => SetTypePayment(e.target.value))}>
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">credito</option>
              <option value="debito">Debito</option>
            </select>
          </div>
          <input id="edit_form_button" type="submit" value="Editar"/> 
        </form>
      </main>
    </div>
  )
}