// BannerAPI.js
import Repository from './Repo'

const GET_EXPERIENCES = 'getAll'
const ADD_EXPERIENCE = 'add'
const DELETE_EXPERIENCE = 'delete'
const UPDATE_EXPERIENCE = 'update'

const dir = '/experience/'

const ExperienceAPI = {
  getExperiences() {
    return Repository.post(`${dir}` + GET_EXPERIENCES)
  },

  addExperience(payload) {
    return Repository.post(`${dir}` + ADD_EXPERIENCE, payload)
  },

  deleteExperience(payload) {
    return Repository.post(`${dir}` + DELETE_EXPERIENCE, payload)
  },

  updateExperience(payload) {
    return Repository.post(`${dir}` + UPDATE_EXPERIENCE, payload)
  },
}

export default ExperienceAPI
