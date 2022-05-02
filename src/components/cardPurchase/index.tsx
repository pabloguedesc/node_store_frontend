import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../buttons/deleteButton";
import { EditButton } from "../buttons/editButton";
import "./CardPurchase.css"
import http from "../../services/purchase"
import toast from "react-hot-toast";

export interface IPropsPurchase {
  id: number;
  total: number;
  status: string;
}

export function CardPurchase({
  id,
  status,
  total
}: IPropsPurchase) {

  const navigate = useNavigate()

  function EditPurchase() {
    return navigate(`/compras/edit/${id}`)
  } 
  function DeletePurchase() {
    http.deletePurchase(Number(id)).then((response) => {
      console.log(response)
      window.location.reload()
    }).catch((error) => console.log(error))
  } 

  function ViewDetails() {
    return navigate(`/compras/detalhes/${id}`)
  }

  function FinishPurchase(id: number) {
    http.finishPurchase(id).then(() => {
      toast.success("Compra finalizada com sucesso")
      setTimeout(() => {
        document.location.reload()
      }, 1000)
    }).catch(() => toast.error("Erro na requisição"))
  }

  return (
    <div >
      <main id="card">
        <div className="card_content_purchase" onClick={ViewDetails} >
          <div id="data_purchase">
            <div id="card_content_left">
              <p>Compra: #{id}</p>
              <p id="value">R$ {total},00</p>
            </div>
            <div id="card_content_right">

              {status === "em_andamento" ? (
                <div id="flag_status_in_progress">
                  <p>Em andamento</p>
                </div>
              ): (
                <div id="flag_status_finish">
                  <p>Finalizada</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="buttons">
          <div id="edit_button">
            <div onClick={EditPurchase}>
              <EditButton />
            </div>
          </div>
          <div id="delete_button">
            <div onClick={DeletePurchase}>
              <DeleteButton />
            </div>
          </div>
        </div>
      </main>
      {status === "em_andamento" && (
        <div className="btn-finish">
          <button onClick={() => FinishPurchase(Number(id))} id="btn-finish">FINALIZAR COMPRA</button>
        </div>
      )}
    </div>
  )
} 
