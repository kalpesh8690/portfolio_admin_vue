// ProductAPI.js
import Repository from './Repo'

const GET_PRODUCTS = 'get'
const ADD_PRODUCT = 'add'
const DELETE_PRODUCT = 'delete'
const UPDATE_PRODUCT = 'update'

const dir = '/product/'

const ProductAPI = {
  getProducts() {
    return Repository.get(`${dir}` + GET_PRODUCTS)
  },

  addProduct(payload) {
    return Repository.post(`${dir}` + ADD_PRODUCT, payload)
  },

  deleteProduct(id) {
    return Repository.delete(`${dir}` + DELETE_PRODUCT + `/${id}`)
  },

  updateProduct(payload) {
    return Repository.put(`${dir}` + UPDATE_PRODUCT, payload)
  },
}

export default ProductAPI
