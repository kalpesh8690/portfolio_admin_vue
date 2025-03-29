import apis from '@/apis'

const actions = {
  async fetchCertificates({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.CertificateAPI.getCertificates(params)
      commit('SET_CERTIFICATES', response.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch certificates')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createCertificate({ commit }, certificateData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.CertificateAPI.addCertificate(certificateData)
      const resCertificates = await apis.CertificateAPI.getCertificates()
      commit('SET_CERTIFICATES', resCertificates.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to create certificate')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateCertificate({ commit }, certificateData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.CertificateAPI.updateCertificate(certificateData)
      const resCertificates = await apis.CertificateAPI.getCertificates()
      commit('SET_CERTIFICATES', resCertificates.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to update certificate')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteCertificate({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.CertificateAPI.deleteCertificate(id)
      const resCertificates = await apis.CertificateAPI.getCertificates()
      commit('SET_CERTIFICATES', resCertificates.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to delete certificate')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default actions 