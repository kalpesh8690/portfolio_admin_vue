import Vue from 'vue'
import Vuex from 'vuex'
import experience from './modules/experience'
import certificates from './modules/certificates'
import projects from './modules/projects'
import skills from './modules/skills'
import education from './modules/education'
import profile from './modules/profile'
import search from './modules/search'
import theme from './modules/theme'
import auth from './modules/auth'
import master from './modules/master'
import createDemoDataPlugin from './plugins/demoDataPlugin'

Vue.use(Vuex)

// Create store
const store = new Vuex.Store({
  modules: {
    experience,
    certificates,
    projects,
    skills,
    education,
    profile,
    search,
    theme,
    auth,
    master
  },
  plugins: [createDemoDataPlugin()]
})

// Initialize data loading
store.dispatch('experience/fetchExperiences')
store.dispatch('certificates/fetchCertificates')
store.dispatch('projects/fetchProjects')
store.dispatch('skills/fetchSkills')
store.dispatch('education/fetchEducation')
// store.dispatch('profile/fetchProfile')
store.dispatch('theme/initTheme')
store.dispatch('master/fetchDashboard')

export default store 