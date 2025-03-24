export default {
  GET_SKILLS(state, data) {
    state.allSkills = data
  },
  GET_SINGLE_SKILL(state, data) {
    state.skill = data
  },
} 