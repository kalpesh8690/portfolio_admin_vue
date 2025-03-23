const state = {
  isDarkMode: localStorage.getItem('theme') !== 'light' // Default to dark mode for dashboard
}

const mutations = {
  TOGGLE_THEME(state) {
    state.isDarkMode = !state.isDarkMode
    localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light')
  }
}

const actions = {
  toggleTheme({ commit }) {
    commit('TOGGLE_THEME')
  },
  initTheme({ state }) {
    // Initialize theme based on stored preference
    document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light')
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