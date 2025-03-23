// PortfolioAPI.js
import Repository from './Repo'

// Project-related actions
const GET_PROJECTS = 'getProjects'
const ADD_PROJECT = 'addProject'
const DELETE_PROJECT = 'deleteProject'
const UPDATE_PROJECT = 'updateProject'

// Language-related actions
const GET_LANGUAGES = 'getLanguages'
const ADD_LANGUAGE = 'addLanguage'
const DELETE_LANGUAGE = 'deleteLanguage'
const UPDATE_LANGUAGE = 'updateLanguage'

// Skill-related actions
const GET_SKILLS = 'getSkills'
const ADD_SKILL = 'addSkill'
const DELETE_SKILL = 'deleteSkill'
const UPDATE_SKILL = 'updateSkill'

// Experience-related actions
const GET_EXPERIENCES = 'getExperiences'
const ADD_EXPERIENCE = 'addExperience'
const DELETE_EXPERIENCE = 'deleteExperience'
const UPDATE_EXPERIENCE = 'updateExperience'

// Portfolio image-related actions
const GET_PORTFOLIO_IMAGES = 'getPortfolioImages'
const ADD_PORTFOLIO_IMAGE = 'addPortfolioImage'
const DELETE_PORTFOLIO_IMAGE = 'deletePortfolioImage'
const UPDATE_PORTFOLIO_IMAGE = 'updatePortfolioImage'

// Personal data-related actions
const GET_PERSONAL_DATA = 'getPersonalData'
const UPDATE_PERSONAL_DATA = 'updatePersonalData'

const dir = '/portfolio/'

const PortfolioAPI = {
  // Project-related methods
  getProjects() {
    return Repository.get(`${dir}` + GET_PROJECTS)
  },

  addProject(payload) {
    return Repository.post(`${dir}` + ADD_PROJECT, payload)
  },

  deleteProject(id) {
    return Repository.delete(`${dir}` + DELETE_PROJECT + `/${id}`)
  },

  updateProject(payload) {
    return Repository.put(`${dir}` + UPDATE_PROJECT, payload)
  },

  // Language-related methods
  getLanguages() {
    return Repository.get(`${dir}` + GET_LANGUAGES)
  },

  addLanguage(payload) {
    return Repository.post(`${dir}` + ADD_LANGUAGE, payload)
  },

  deleteLanguage(id) {
    return Repository.delete(`${dir}` + DELETE_LANGUAGE + `/${id}`)
  },

  updateLanguage(payload) {
    return Repository.put(`${dir}` + UPDATE_LANGUAGE, payload)
  },

  // Skill-related methods
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

  // Experience-related methods
  getExperiences() {
    return Repository.get(`${dir}` + GET_EXPERIENCES)
  },

  addExperience(payload) {
    return Repository.post(`${dir}` + ADD_EXPERIENCE, payload)
  },

  deleteExperience(id) {
    return Repository.delete(`${dir}` + DELETE_EXPERIENCE + `/${id}`)
  },

  updateExperience(payload) {
    return Repository.put(`${dir}` + UPDATE_EXPERIENCE, payload)
  },

  // Portfolio image-related methods
  getPortfolioImages() {
    return Repository.get(`${dir}` + GET_PORTFOLIO_IMAGES)
  },

  addPortfolioImage(payload) {
    return Repository.post(`${dir}` + ADD_PORTFOLIO_IMAGE, payload)
  },

  deletePortfolioImage(id) {
    return Repository.delete(`${dir}` + DELETE_PORTFOLIO_IMAGE + `/${id}`)
  },

  updatePortfolioImage(payload) {
    return Repository.put(`${dir}` + UPDATE_PORTFOLIO_IMAGE, payload)
  },

  // Personal data-related methods
  getPersonalData() {
    return Repository.get(`${dir}` + GET_PERSONAL_DATA)
  },

  updatePersonalData(payload) {
    return Repository.put(`${dir}` + UPDATE_PERSONAL_DATA, payload)
  },
}

export default PortfolioAPI
