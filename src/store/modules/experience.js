const state = {
  experienceList: []
}

const getters = {
  experienceCount: state => state.experienceList.length,
  currentPosition: state => state.experienceList[0],
  totalYearsExperience: state => {
    if (state.experienceList.length === 0) return 'No experience'
    
    let totalMonths = 0
    state.experienceList.forEach(exp => {
      const start = new Date(exp.startDate)
      const end = exp.endDate ? new Date(exp.endDate) : new Date()
      totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
    })
    
    const years = Math.floor(totalMonths / 12)
    const months = totalMonths % 12
    
    if (years === 0) return `${months} months`
    if (months === 0) return `${years} years`
    return `${years} years ${months} months`
  }
}

const mutations = {
  SET_EXPERIENCE_LIST(state, list) {
    state.experienceList = list
  }
}

const actions = {
  loadExperience({ commit }) {
    const savedExperience = localStorage.getItem('experienceList')
    const experienceList = savedExperience ? JSON.parse(savedExperience) : []
    commit('SET_EXPERIENCE_LIST', experienceList)
  },
  saveExperience({ commit }, experience) {
    commit('SET_EXPERIENCE_LIST', experience)
    localStorage.setItem('experienceList', JSON.stringify(experience))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 