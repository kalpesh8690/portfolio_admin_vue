import { profileAPI } from '@/services/api';
import { profileData } from '@/data/demoData';

const state = {
  profile: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    bio: "",
    avatar: "",
    availability: "",
    interests: []
  },
  loading: false,
  error: null
}

const getters = {
  fullName: state => `${state.profile.firstName} ${state.profile.lastName}`,
  profile: state => state.profile,
  socialLinks: state => ({
    website: state.profile.website,
    github: state.profile.github,
    linkedin: state.profile.linkedin
  }),
  contactInfo: state => ({
    email: state.profile.email,
    phone: state.profile.phone,
    location: state.profile.location
  }),
  isLoading: state => state.loading,
  error: state => state.error
}

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = { ...state.profile, ...profile }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  UPDATE_PROFILE_FIELD(state, { field, value }) {
    state.profile[field] = value
  }
}

const actions = {
  async fetchProfile({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await profileAPI.getProfile();
      commit('SET_PROFILE', response.data);
      commit('SET_ERROR', null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      commit('SET_ERROR', 'Failed to fetch profile data');
      // Load demo data if API fails
      const savedProfile = localStorage.getItem('profile');
      if (savedProfile) {
        commit('SET_PROFILE', JSON.parse(savedProfile));
      } else {
        commit('SET_PROFILE', profileData);
      }
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateProfile({ commit }, profile) {
    commit('SET_LOADING', true);
    try {
      const response = await profileAPI.updateProfile(profile);
      commit('SET_PROFILE', response.data);
      commit('SET_ERROR', null);
      // Save to localStorage as backup
      localStorage.setItem('profile', JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      commit('SET_ERROR', 'Failed to update profile');
      // Save to localStorage even if API fails
      commit('SET_PROFILE', profile);
      localStorage.setItem('profile', JSON.stringify(profile));
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  loadProfile({ commit }) {
    const savedProfile = localStorage.getItem('profile');
    const profile = savedProfile ? JSON.parse(savedProfile) : profileData;
    commit('SET_PROFILE', profile);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 