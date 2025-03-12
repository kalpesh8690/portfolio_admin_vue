import { skillsAPI } from '@/services/api';
import { skillsData } from '@/data/demoData';

const state = {
  skillList: [],
  loading: false,
  error: null
}

const getters = {
  skills: state => state.skillList,
  skillCount: state => state.skillList.length,
  skillsByCategory: state => {
    const categories = {};
    state.skillList.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });
    return categories;
  },
  isLoading: state => state.loading,
  error: state => state.error
}

const mutations = {
  SET_SKILLS(state, skills) {
    state.skillList = skills;
  },
  ADD_SKILL(state, skill) {
    state.skillList.push(skill);
  },
  UPDATE_SKILL(state, updatedSkill) {
    const index = state.skillList.findIndex(skill => skill.id === updatedSkill.id);
    if (index !== -1) {
      state.skillList.splice(index, 1, updatedSkill);
    }
  },
  DELETE_SKILL(state, skillId) {
    state.skillList = state.skillList.filter(skill => skill.id !== skillId);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
}

const actions = {
  async fetchSkills({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await skillsAPI.getSkills();
      commit('SET_SKILLS', response.data);
      commit('SET_ERROR', null);
    } catch (error) {
      console.error('Error fetching skills:', error);
      commit('SET_ERROR', 'Failed to fetch skills');
      // Load demo data if API fails
      const savedSkills = localStorage.getItem('skills');
      if (savedSkills) {
        commit('SET_SKILLS', JSON.parse(savedSkills));
      } else {
        commit('SET_SKILLS', skillsData);
      }
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async createSkill({ commit }, skillData) {
    commit('SET_LOADING', true);
    try {
      const response = await skillsAPI.createSkill(skillData);
      commit('ADD_SKILL', response.data);
      commit('SET_ERROR', null);
      // Update localStorage
      const skills = [...state.skillList, response.data];
      localStorage.setItem('skills', JSON.stringify(skills));
      return true;
    } catch (error) {
      console.error('Error creating skill:', error);
      commit('SET_ERROR', 'Failed to create skill');
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateSkill({ commit, state }, { id, data }) {
    commit('SET_LOADING', true);
    try {
      const response = await skillsAPI.updateSkill(id, data);
      commit('UPDATE_SKILL', response.data);
      commit('SET_ERROR', null);
      // Update localStorage
      localStorage.setItem('skills', JSON.stringify(state.skillList));
      return true;
    } catch (error) {
      console.error('Error updating skill:', error);
      commit('SET_ERROR', 'Failed to update skill');
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteSkill({ commit, state }, id) {
    commit('SET_LOADING', true);
    try {
      await skillsAPI.deleteSkill(id);
      commit('DELETE_SKILL', id);
      commit('SET_ERROR', null);
      // Update localStorage
      localStorage.setItem('skills', JSON.stringify(state.skillList));
      return true;
    } catch (error) {
      console.error('Error deleting skill:', error);
      commit('SET_ERROR', 'Failed to delete skill');
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  loadSkills({ commit }) {
    const savedSkills = localStorage.getItem('skills');
    const skills = savedSkills ? JSON.parse(savedSkills) : skillsData;
    commit('SET_SKILLS', skills);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 