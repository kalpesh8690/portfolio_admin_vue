// BannerAPI.js
import Repository from './Repo'

const GET_SKILLS = 'getAll'
const ADD_SKILL = 'add'
const DELETE_SKILL = 'delete'
const UPDATE_SKILL = 'update'

const dir = '/skills/'

const SkillAPI = {
  getSkills() {
    return Repository.get(`${dir}` + GET_SKILLS)
  },

  addSkill(payload) {
    return Repository.post(`${dir}` + ADD_SKILL, payload)
  },

  deleteSkill(id) {
    return Repository.delete(`${dir}` + DELETE_SKILL + `/${id}`)
  },

  updateSkill(payload) {
    return Repository.put(`${dir}` + UPDATE_SKILL, payload)
  },
}

export default SkillAPI
