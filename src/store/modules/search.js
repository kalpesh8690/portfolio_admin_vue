const state = {
  searchQuery: '',
  searchResults: [],
  isSearching: false,
};

const mutations = {
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results;
  },
  SET_IS_SEARCHING(state, status) {
    state.isSearching = status;
  },
};

const actions = {
  async performSearch({ commit, rootState }, query) {
    commit('SET_SEARCH_QUERY', query);
    commit('SET_IS_SEARCHING', true);

    try {
      const results = [];
      
      // Search in skills
      if (rootState.skills.skills) {
        rootState.skills.skills.forEach(skill => {
          if (matchesSearch(skill, query)) {
            results.push({ ...skill, section: 'skills' });
          }
        });
      }

      // Search in certificates
      if (rootState.certificates.certificates) {
        rootState.certificates.certificates.forEach(cert => {
          if (matchesSearch(cert, query)) {
            results.push({ ...cert, section: 'certificates' });
          }
        });
      }

      // Search in education
      if (rootState.education.education) {
        rootState.education.education.forEach(edu => {
          if (matchesSearch(edu, query)) {
            results.push({ ...edu, section: 'education' });
          }
        });
      }

      // Search in experience
      if (rootState.experience.experience) {
        rootState.experience.experience.forEach(exp => {
          if (matchesSearch(exp, query)) {
            results.push({ ...exp, section: 'experience' });
          }
        });
      }

      // Search in projects
      if (rootState.projects.projects) {
        rootState.projects.projects.forEach(project => {
          if (matchesSearch(project, query)) {
            results.push({ ...project, section: 'projects' });
          }
        });
      }

      commit('SET_SEARCH_RESULTS', results);
    } finally {
      commit('SET_IS_SEARCHING', false);
    }
  },
  clearSearch({ commit }) {
    commit('SET_SEARCH_QUERY', '');
    commit('SET_SEARCH_RESULTS', []);
    commit('SET_IS_SEARCHING', false);
  },
};

const getters = {
  groupedResults: state => {
    return state.searchResults.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    }, {});
  },
  hasResults: state => state.searchResults.length > 0,
};

// Helper function to match search query
function matchesSearch(item, query) {
  const searchQuery = query.toLowerCase();
  return Object.values(item).some(value => 
    value && value.toString().toLowerCase().includes(searchQuery)
  );
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}; 