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
        <div v-if="certificateList.length === 0" class="text-center py-5">
          <h4>No records found</h4>
        </div>
        <certificate-list
          v-else
          :certificate-list="certificateList"
          @edit-certificate="editCertificate"
          @delete-certificate="handleDeleteCertificate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditCertificateForm from './Certificates/EditCertificateForm.vue'
import CertificateList from './Certificates/CertificateList.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'certificate-manager',
  components: {
    EditCertificateForm,
    CertificateList
  },
  data() {
    return {
      currentCertificate: null
    }
  },
  computed: {
    ...mapState('certificates', ['certificateList']),
   
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
    ...mapActions('certificates', ['fetchCertificates', 'createCertificate', 'updateCertificate', 'deleteCertificate']),
    async saveCertificate({ certificate, index }) {
      try {
        if (index !== -1) {
          // Update existing certificate
          await this.updateCertificate(certificate)
        } else {
          // Add new certificate
          await this.createCertificate(certificate)
        }
        this.currentCertificate = null
      } catch (error) {
        console.error('Failed to save certificate:', error)
      }
    },
    editCertificate(certificate, index) {
      this.currentCertificate = { ...certificate, index }
    },
    async handleDeleteCertificate(id) {
      try {
        await this.deleteCertificate(id)
      } catch (error) {
        console.error('Failed to delete certificate:', error)
      }
    },
    cancelEdit() {
      this.currentCertificate = null
    }
  },
  async created() {
    try {
      await this.fetchCertificates()
    } catch (error) {
      console.error('Failed to fetch certificates:', error)
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