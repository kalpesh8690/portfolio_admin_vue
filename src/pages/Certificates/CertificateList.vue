<template>
  <base-card>
    <h6 slot="header" class="title">Certificates Portfolio</h6>
    <div class="list-container">
      <div v-if="certificateList.length === 0" class="no-data">
        No certificates found.
      </div>
      <div v-else class="category-section">
        <div v-for="(certificates, category) in groupedCertificates" :key="category" class="category-section">
          <h4 class="category-title">{{ category }}</h4>
          <div class="certificate-items">
            <div 
              v-for="(certificate, index) in certificates" 
              :key="index" 
              class="list-item searchable-item"
              :data-id="certificate.id || certificate.name"
              :data-name="certificate.name">
              <div class="item-content">
                <div class="item-header">
                  <h4>{{ certificate.name }}</h4>
                  <div class="badge">{{ certificate.issuer }}</div>
                </div>

                <div class="item-details">
                  <p>
                    <strong>Issue Date:</strong> {{ formatDate(certificate.issueDate) }}
                    <span v-if="certificate.expiryDate">
                      · <strong>Expires:</strong> {{ formatDate(certificate.expiryDate) }}
                    </span>
                  </p>
                  <p v-if="certificate.description">{{ certificate.description }}</p>
                  <p v-if="certificate.credentialId">
                    <strong>Credential ID:</strong> {{ certificate.credentialId }}
                  </p>
                  <p v-if="certificate.credentialUrl">
                    <strong>Verify at:</strong>
                    <a :href="certificate.credentialUrl" target="_blank" rel="noopener noreferrer">
                      {{ certificate.credentialUrl }}
                    </a>
                  </p>
                </div>
              </div>
              <div class="item-actions">
                <base-button type="info" size="sm" @click="$emit('edit-certificate', certificate, index)">
                  Edit
                </base-button>
                <base-button type="danger" size="sm" @click="confirmDelete(index)">
                  Delete
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import searchHighlight from '@/mixins/searchHighlight';

export default {
  name: 'certificate-list',
  mixins: [searchHighlight],
  props: {
    certificateList: {
      type: Array,
      required: true
    }
  },
  computed: {
    groupedCertificates() {
      return this.certificateList.reduce((groups, certificate) => {
        const category = certificate.category || 'Other'
        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(certificate)
        return groups
      }, {})
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    confirmDelete(index) {
      if (confirm('Are you sure you want to delete this certificate?')) {
        this.$emit('delete-certificate', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';
</style> 