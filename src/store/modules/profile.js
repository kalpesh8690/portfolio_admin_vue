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
  }
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
  })
}

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = { ...state.profile, ...profile }
  },
  UPDATE_PROFILE_FIELD(state, { field, value }) {
    state.profile[field] = value
  }
}

const actions = {
  loadProfile({ commit }) {
    const savedProfile = localStorage.getItem('profile')
    const profile = savedProfile ? JSON.parse(savedProfile) : {}
    commit('SET_PROFILE', profile)
  },
  saveProfile({ commit, state }, profile) {
    commit('SET_PROFILE', profile)
    localStorage.setItem('profile', JSON.stringify(state.profile))
  },
  updateProfileField({ commit, state }, { field, value }) {
    commit('UPDATE_PROFILE_FIELD', { field, value })
    localStorage.setItem('profile', JSON.stringify(state.profile))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 