// BannerAPI.js
import Repository from './Repo'

const GET_DASHBORD = 'getDashbord'

const dir = '/master/'

const DashbordAPI = {
  getDashbord() {
    return Repository.post(`${dir}` + GET_DASHBORD)
  },

}

export default DashbordAPI
