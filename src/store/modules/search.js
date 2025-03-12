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
    if (!query) return;
    
    commit('SET_SEARCH_QUERY', query);
    commit('SET_IS_SEARCHING', true);
    console.log('Performing search with query:', query);

    try {
      const results = [];
      const searchQuery = query.toLowerCase();
      
      // Debug state access
      console.log('Accessing state data:', {
        skills: rootState.skills?.skillList || [],
        certificates: rootState.certificates?.certificateList || [],
        education: rootState.education?.educationList || [],
        experience: rootState.experience?.experienceList || [],
        projects: rootState.projects?.projectList || []
      });

      // Search in skills
      const skills = rootState.skills?.skillList || [];
      console.log('Searching skills:', skills);
      skills.forEach(skill => {
        if (matchesSearch(skill, searchQuery)) {
          results.push({ ...skill, section: 'skills', id: skill.id || skill.skillName });
        }
      });

      // Search in certificates
      const certificates = rootState.certificates?.certificateList || [];
      console.log('Searching certificates:', certificates);
      certificates.forEach(cert => {
        if (matchesSearch(cert, searchQuery)) {
          results.push({ ...cert, section: 'certificates', id: cert.id || cert.name });
        }
      });

      // Search in education
      const education = rootState.education?.educationList || [];
      console.log('Searching education:', education);
      education.forEach(edu => {
        if (matchesSearch(edu, searchQuery)) {
          results.push({ ...edu, section: 'education', id: edu.id || edu.institution });
        }
      });

      // Search in experience
      const experience = rootState.experience?.experienceList || [];
      console.log('Searching experience:', experience);
      experience.forEach(exp => {
        if (matchesSearch(exp, searchQuery)) {
          results.push({ ...exp, section: 'experience', id: exp.id || exp.companyName });
        }
      });

      // Search in projects
      const projects = rootState.projects?.projectList || [];
      console.log('Searching projects:', projects);
      projects.forEach(project => {
        if (matchesSearch(project, searchQuery)) {
          results.push({ ...project, section: 'projects', id: project.id || project.projectName });
        }
      });

      console.log('Search results:', results);
      commit('SET_SEARCH_RESULTS', results);
    } catch (error) {
      console.error('Search error:', error);
      commit('SET_SEARCH_RESULTS', []);
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
  if (!item || !query) return false;

  // Convert item to searchable string
  const searchableFields = [
    item.name,
    item.skillName,
    item.title,
    item.description,
    item.company,
    item.companyName,
    item.degree,
    item.institution,
    item.issuer,
    item.technologies,
    item.skills,
    item.projectName,
    item.fieldOfStudy,
    item.category
  ];

  const searchableText = searchableFields
    .filter(field => field) // Remove undefined/null values
    .map(field => {
      if (Array.isArray(field)) {
        return field.join(' ');
      }
      return field.toString();
    })
    .join(' ')
    .toLowerCase();

  return searchableText.includes(query.toLowerCase());
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}; 