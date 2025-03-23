const state = {
  allUsers: [],
  user: {
    _id: null,
    firstName: '',
    email: '',
    mobile: '',
    profile: '',
    __v: 0
  },
  isAuth: !!localStorage.getItem('token'),
}

const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')
if (storedUser && storedToken) {
  state.user = JSON.parse(storedUser)
}

export default state 