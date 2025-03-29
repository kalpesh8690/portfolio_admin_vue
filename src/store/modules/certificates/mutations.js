export default {
  SET_CERTIFICATES(state, certificates) {
    state.certificateList = certificates.result
    state.pagination = {
      total: certificates.totalCount,
      page: 0,
      totalPages: certificates.totalPages
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
} 