// BannerAPI.js
import Repository from './Repo'

const GET_PROJECTS = 'getAll'
const ADD_PROJECT = 'add'
const DELETE_PROJECT = 'delete'
const UPDATE_PROJECT = 'update'

const dir = '/projects/'

const ProjectAPI = {
  getProjects() {
    return Repository.post(`${dir}` + GET_PROJECTS)
  },

  addProject(payload) {
    return Repository.post(`${dir}` + ADD_PROJECT, payload)
  },

  deleteProject(payload) {
    return Repository.post(`${dir}` + DELETE_PROJECT, payload)
  },

  updateProject(payload) {
    return Repository.post(`${dir}` + UPDATE_PROJECT, payload)
  },
}

export default ProjectAPI
