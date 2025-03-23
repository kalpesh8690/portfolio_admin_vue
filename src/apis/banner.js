// BannerAPI.js
import Repository from './Repo'

const GET_BANNERS = 'get'
const ADD_BANNER = 'add'
const DELETE_BANNER = 'delete'
const UPDATE_BANNER = 'update'

const dir = '/banner/'

const BannerAPI = {
  getBanners() {
    return Repository.get(`${dir}` + GET_BANNERS)
  },

  addBanner(payload) {
    return Repository.post(`${dir}` + ADD_BANNER, payload)
  },

  deleteBanner(id) {
    return Repository.delete(`${dir}` + DELETE_BANNER + `/${id}`)
  },

  updateBanner(payload) {
    return Repository.put(`${dir}` + UPDATE_BANNER, payload)
  },
}

export default BannerAPI
