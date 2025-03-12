import { certificatesAPI } from '@/services/api';
import { certificatesData } from '@/data/demoData';

const state = {
  certificateList: [],
  loading: false,
  error: null
}

const getters = {
  certificates: state => state.certificateList,
  certificateCount: state => state.certificateList.length,
  certificatesByCategory: state => {
    const categories = {};
    state.certificateList.forEach(cert => {
      if (!categories[cert.category]) {
        categories[cert.category] = [];
      }
      categories[cert.category].push(cert);
    });
    return categories;
  },
  isLoading: state => state.loading,
  error: state => state.error
}

const mutations = {
  SET_CERTIFICATES(state, certificates) {
    state.certificateList = certificates;
  },
  ADD_CERTIFICATE(state, certificate) {
    state.certificateList.push(certificate);
  },
  UPDATE_CERTIFICATE(state, updatedCertificate) {
    const index = state.certificateList.findIndex(cert => cert.id === updatedCertificate.id);
    if (index !== -1) {
      state.certificateList.splice(index, 1, updatedCertificate);
    }
  },
  DELETE_CERTIFICATE(state, certificateId) {
    state.certificateList = state.certificateList.filter(cert => cert.id !== certificateId);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
}

const actions = {
  async fetchCertificates({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await certificatesAPI.getCertificates();
      commit('SET_CERTIFICATES', response.data);
      commit('SET_ERROR', null);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      commit('SET_ERROR', 'Failed to fetch certificates');
      // Load demo data if API fails
      const savedCertificates = localStorage.getItem('certificates');
      if (savedCertificates) {
        commit('SET_CERTIFICATES', JSON.parse(savedCertificates));
      } else {
        commit('SET_CERTIFICATES', certificatesData);
      }
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async createCertificate({ commit, state }, certificateData) {
    commit('SET_LOADING', true);
    try {
      const response = await certificatesAPI.createCertificate(certificateData);
      commit('ADD_CERTIFICATE', response.data);
      commit('SET_ERROR', null);
      // Update localStorage
      localStorage.setItem('certificates', JSON.stringify([...state.certificateList]));
      return true;
    } catch (error) {
      console.error('Error creating certificate:', error);
      commit('SET_ERROR', 'Failed to create certificate');
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateCertificate({ commit, state }, { id, data }) {
    commit('SET_LOADING', true);
    try {
      const response = await certificatesAPI.updateCertificate(id, data);
      commit('UPDATE_CERTIFICATE', response.data);
      commit('SET_ERROR', null);
      // Update localStorage
      localStorage.setItem('certificates', JSON.stringify(state.certificateList));
      return true;
    } catch (error) {
      console.error('Error updating certificate:', error);
      commit('SET_ERROR', 'Failed to update certificate');
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteCertificate({ commit, state }, id) {
    commit('SET_LOADING', true);
    try {
      await certificatesAPI.deleteCertificate(id);
      commit('DELETE_CERTIFICATE', id);
      commit('SET_ERROR', null);
      // Update localStorage
      localStorage.setItem('certificates', JSON.stringify(state.certificateList));
      return true;
    } catch (error) {
      console.error('Error deleting certificate:', error);
      commit('SET_ERROR', 'Failed to delete certificate');
      return false;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  loadCertificates({ commit }) {
    const savedCertificates = localStorage.getItem('certificates');
    const certificates = savedCertificates ? JSON.parse(savedCertificates) : certificatesData;
    commit('SET_CERTIFICATES', certificates);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 