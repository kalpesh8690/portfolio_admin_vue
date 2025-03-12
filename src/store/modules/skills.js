const state = {
  skillList: []
}

const getters = {
  skillCount: state => state.skillList.length,
  topSkillCategory: state => {
    if (state.skillList.length === 0) return 'No skills'
    const categories = state.skillList.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1
      return acc
    }, {})
    const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1])
    return sorted[0][0]
  },
  topSkills: state => {
    return [...state.skillList]
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 5)
  }
}

const mutations = {
  SET_SKILL_LIST(state, list) {
    state.skillList = list
  }
}

const actions = {
  loadSkills({ commit }) {
    const savedSkills = localStorage.getItem('skillList')
    const skillList = savedSkills ? JSON.parse(savedSkills) : []
    commit('SET_SKILL_LIST', skillList)
  },
  saveSkills({ commit }, skills) {
    commit('SET_SKILL_LIST', skills)
    localStorage.setItem('skillList', JSON.stringify(skills))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 