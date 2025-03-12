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
    theme
  },
  plugins: [createDemoDataPlugin()]
})

// Initialize data loading
store.dispatch('experience/loadExperience')
store.dispatch('certificates/loadCertificates')
store.dispatch('projects/loadProjects')
store.dispatch('skills/loadSkills')
store.dispatch('education/loadEducation')
store.dispatch('profile/loadProfile')
store.dispatch('theme/initTheme')

export default store 