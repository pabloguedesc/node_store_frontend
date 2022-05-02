import { http } from "../config"
const baseUrl = "product"

interface IDataProduct {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
}

export default {
  createProduct: (data: IDataProduct) => {
    return http.post(`/${baseUrl}`, data)
  },

  listAllProducts: () => {
    return http.get(`/${baseUrl}`)
  },

  findProductById: (id_product: number) => {
    return http.get(`/${baseUrl}/${id_product}`)
  },

  deleteProduct: (id_product: number) => {
    return http.delete(`/${baseUrl}/${id_product}`)
  },  

  editProduct: (data: IDataProduct) => {
    return http.put(`/${baseUrl}/${data.id}`, data)
  },
}

