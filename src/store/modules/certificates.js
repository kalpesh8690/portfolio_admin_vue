const state = {
  certificateList: []
}

const getters = {
  certificateCount: state => state.certificateList.length,
  latestCertificate: state => {
    if (state.certificateList.length === 0) return 'No certificates'
    const sorted = [...state.certificateList].sort((a, b) => 
      new Date(b.issueDate) - new Date(a.issueDate)
    )
    return sorted[0].name
  },
  latestCertificates: state => {
    return [...state.certificateList]
      .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
      .slice(0, 3)
  }
}

const mutations = {
  SET_CERTIFICATE_LIST(state, list) {
    state.certificateList = list
  }
}

const actions = {
  loadCertificates({ commit }) {
    const savedCertificates = localStorage.getItem('certificateList')
    const certificateList = savedCertificates ? JSON.parse(savedCertificates) : []
    commit('SET_CERTIFICATE_LIST', certificateList)
  },
  saveCertificates({ commit }, certificates) {
    commit('SET_CERTIFICATE_LIST', certificates)
    localStorage.setItem('certificateList', JSON.stringify(certificates))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 