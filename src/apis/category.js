// CategoryAPI.js
import Repository from './Repo'

const ADD_CATEGORY = 'create'
const GET_CATEGORY = 'getCategory'
const DELETE_CATEGORY = 'delete'
const UPDATE_CATEGORY = 'update'

const dir = '/category/'

const CategoryAPI = {
  getCategorys(payload) {
    return Repository.post(`${dir}` + GET_CATEGORY, payload)
  },

  addCategory(payload) {
    return Repository.post(`${dir}` + ADD_CATEGORY, payload)
  },

  deleteCategory(payload) {
    return Repository.post(`${dir}` + DELETE_CATEGORY, payload)
  },

  updateCategory(payload) {
    return Repository.put(`${dir}` + UPDATE_CATEGORY, payload)
  },
}

export default CategoryAPI
