const state = {
  projectList: []
}

const getters = {
  projectCount: state => state.projectList.length,
  activeProjectCount: state => state.projectList.filter(project => !project.endDate).length,
  latestProjects: state => {
    return [...state.projectList]
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
      .slice(0, 5)
  }
}

const mutations = {
  SET_PROJECT_LIST(state, list) {
    state.projectList = list
  }
}

const actions = {
  loadProjects({ commit }) {
    const savedProjects = localStorage.getItem('projectList')
    const projectList = savedProjects ? JSON.parse(savedProjects) : []
    commit('SET_PROJECT_LIST', projectList)
  },
  saveProjects({ commit }, projects) {
    commit('SET_PROJECT_LIST', projects)
    localStorage.setItem('projectList', JSON.stringify(projects))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 