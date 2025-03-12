const state = {
  isDarkMode: localStorage.getItem('theme') !== 'light' // Default to dark mode for dashboard
}

const mutations = {
  TOGGLE_THEME(state) {
    state.isDarkMode = !state.isDarkMode
    localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
    document.body.classList.toggle('white-content', !state.isDarkMode)
  }
}

const actions = {
  toggleTheme({ commit }) {
    commit('TOGGLE_THEME')
  },
  initTheme({ state }) {
    // Initialize theme based on stored preference
    document.body.classList.toggle('white-content', !state.isDarkMode)
  }
}

const getters = {
  isDarkMode: state => state.isDarkMode
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 