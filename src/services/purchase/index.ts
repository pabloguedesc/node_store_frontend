import { http } from "../config"
const baseUrl = "purchase"

export interface IProductPurchase {
  id_produto: number;
  preco: number;
  quantidade: number
}

export interface ICreatePurchase {
  tipo_pagamento: string;
  total: number;
  produtos: IProductPurchase[]
}

export interface IDataEditPurchase {
  id_compra: number;
  tipo_pagamento: string;
}

export default {
  createPurchase: (data: ICreatePurchase) => {
    return http.post(`/${baseUrl}`, data)
  },

  listAllPurchases: () => {
    return http.get(`/${baseUrl}`)
  },

  findPurchaseById: (id_purchase: number) => {
    return http.get(`/${baseUrl}/${id_purchase}`)
  },

  deletePurchase: (id_purchase: number) => {
    return http.delete(`/${baseUrl}/${id_purchase}`)
  },  

  editPurchase: (data: IDataEditPurchase) => {
    return http.put(`/${baseUrl}/${data.id_compra}`, {
      tipo_pagamento: data.tipo_pagamento
    })
  },

  finishPurchase: (id_compra: number) => {
    return http.post(`/${baseUrl}/${id_compra}`)
  } 
} 

