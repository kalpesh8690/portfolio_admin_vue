<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <edit-certificate-form
          :certificate="currentCertificate"
          @save-certificate="saveCertificate"
          @cancel="cancelEdit"
        />
      </div>
      <div class="col-md-4">
        <base-card>
          <h6 slot="header" class="title">Certificates Summary</h6>
          <div class="summary-items">
            <div class="summary-item">
              <div class="label">Total Certificates</div>
              <div class="value">{{ certificateCount }}</div>
            </div>
            <div class="summary-item">
              <div class="label">Categories</div>
              <div class="value">{{ categoryCount }}</div>
            </div>
            <div class="summary-item">
              <div class="label">Latest Certificate</div>
              <div class="value">{{ latestCertificate }}</div>
            </div>
          </div>
        </base-card>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <certificate-list
          :certificate-list="certificateList"
          @edit-certificate="editCertificate"
          @delete-certificate="deleteCertificate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditCertificateForm from './Certificates/EditCertificateForm.vue'
import CertificateList from './Certificates/CertificateList.vue'

export default {
  name: 'certificate-manager',
  components: {
    EditCertificateForm,
    CertificateList
  },
  data() {
    return {
      certificateList: [],
      currentCertificate: null
    }
  },
  computed: {
    certificateCount() {
      return this.certificateList.length
    },
    categoryCount() {
      const categories = new Set(this.certificateList.map(cert => cert.category))
      return categories.size
    },
    latestCertificate() {
      if (this.certificateList.length === 0) return 'No certificates'
      
      const sortedCertificates = [...this.certificateList].sort((a, b) => 
        new Date(b.issueDate) - new Date(a.issueDate)
      )
      return sortedCertificates[0].name
    }
  },
  methods: {
    saveCertificate({ certificate, index }) {
      if (index !== -1) {
        // Update existing certificate
        this.certificateList.splice(index, 1, certificate)
      } else {
        // Add new certificate
        this.certificateList.push(certificate)
      }
      this.currentCertificate = null
      this.saveToLocalStorage()
    },
    editCertificate(certificate, index) {
      this.currentCertificate = { ...certificate, index }
    },
    deleteCertificate(index) {
      this.certificateList.splice(index, 1)
      this.saveToLocalStorage()
    },
    cancelEdit() {
      this.currentCertificate = null
    },
    saveToLocalStorage() {
      localStorage.setItem('certificateList', JSON.stringify(this.certificateList))
    }
  },
  created() {
    const savedCertificates = localStorage.getItem('certificateList')
    if (savedCertificates) {
      this.certificateList = JSON.parse(savedCertificates)
    }
  }
}
</script>

<style scoped>
.summary-items {
  padding: 10px;
}

.summary-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-item .label {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.summary-item .value {
  color: #333;
  font-size: 1.2em;
  font-weight: bold;
}
</style> 