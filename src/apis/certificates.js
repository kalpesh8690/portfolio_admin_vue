// CertificatesAPI.js
import Repository from './Repo'

const GET_CERTIFICATES = 'getAll'
const ADD_CERTIFICATE = 'add'
const DELETE_CERTIFICATE = 'delete'
const UPDATE_CERTIFICATE = 'update'

const dir = '/certificates/'

const CertificatesAPI = {
  getCertificates() {
    return Repository.post(`${dir}` + GET_CERTIFICATES)
  },

  addCertificate(payload) {
    return Repository.post(`${dir}` + ADD_CERTIFICATE, payload)
  },

  deleteCertificate(payload) {
    return Repository.post(`${dir}` + DELETE_CERTIFICATE, payload)
  },

  updateCertificate(payload) {
    return Repository.post(`${dir}` + UPDATE_CERTIFICATE, payload)
  },
}

export default CertificatesAPI 