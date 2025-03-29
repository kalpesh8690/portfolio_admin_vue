// EducationAPI.js
import Repository from './Repo'

const GET_EDUCATIONS = 'getAll'
const ADD_EDUCATION = 'add'
const DELETE_EDUCATION = 'delete'
const UPDATE_EDUCATION = 'update'

const dir = '/education/'

const EducationAPI = {
  getEducation() {
    return Repository.post(`${dir}` + GET_EDUCATIONS)
  },

  addEducation(payload) {
    return Repository.post(`${dir}` + ADD_EDUCATION, payload)
  },

  deleteEducation(payload) {
    return Repository.post(`${dir}` + DELETE_EDUCATION, payload)
  },

  updateEducation(payload) {
    return Repository.post(`${dir}` + UPDATE_EDUCATION, payload)
  },
}

export default EducationAPI 