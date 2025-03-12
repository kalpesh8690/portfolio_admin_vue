const state = {
  educationList: []
}

const getters = {
  educationCount: state => state.educationList.length,
  latestEducation: state => {
    if (state.educationList.length === 0) return null
    return [...state.educationList]
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0]
  },
  educationByDate: state => {
    return [...state.educationList].sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
  }
}

const mutations = {
  SET_EDUCATION_LIST(state, list) {
    state.educationList = list
  }
}

const actions = {
  loadEducation({ commit }) {
    const savedEducation = localStorage.getItem('educationList')
    const educationList = savedEducation ? JSON.parse(savedEducation) : []
    commit('SET_EDUCATION_LIST', educationList)
  },
  saveEducation({ commit }, education) {
    commit('SET_EDUCATION_LIST', education)
    localStorage.setItem('educationList', JSON.stringify(education))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 