<template>
  <base-card>
    <h6 slot="header" class="title">Certificates Portfolio</h6>
    <div class="certificate-list">
      <div v-if="certificateList.length === 0" class="no-data">
        No certificates found.
      </div>
      <div v-else class="certificate-categories">
        <div v-for="(certificates, category) in groupedCertificates" :key="category" class="certificate-category">
          <h4 class="category-title">{{ category }}</h4>
          <div class="certificate-items">
            <div v-for="(certificate, index) in certificates" :key="index" class="certificate-item">
              <div class="certificate-content">
                <div class="certificate-header">
                  <h5 class="certificate-name">{{ certificate.name }}</h5>
                  <div class="issuer-badge">
                    {{ certificate.issuer }}
                  </div>
                </div>

                <div class="certificate-dates">
                  <span class="issue-date">Issued: {{ formatDate(certificate.issueDate) }}</span>
                  <span v-if="certificate.expiryDate" class="expiry-date">
                    · Expires: {{ formatDate(certificate.expiryDate) }}
                  </span>
                </div>

                <p class="description" v-if="certificate.description">{{ certificate.description }}</p>

                <div class="certificate-details">
                  <p class="credential-id" v-if="certificate.credentialId">
                    <strong>Credential ID:</strong> {{ certificate.credentialId }}
                  </p>
                  <p class="credential-url" v-if="certificate.credentialUrl">
                    <strong>Verify at:</strong>
                    <a :href="certificate.credentialUrl" target="_blank" rel="noopener noreferrer">
                      {{ certificate.credentialUrl }}
                    </a>
                  </p>
                </div>
              </div>
              <div class="certificate-actions">
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
export default {
  name: 'certificate-list',
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

<style scoped>
.certificate-list {
  padding: 0 10px;
}

.certificate-category {
  margin-bottom: 30px;
}

.category-title {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.certificate-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
}

.certificate-content {
  flex: 1;
}

.certificate-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.certificate-name {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.issuer-badge {
  background-color: #f8f9fa;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.certificate-dates {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin: 10px 0;
  white-space: pre-line;
}

.certificate-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f1f1f1;
}

.credential-id,
.credential-url {
  color: #666;
  margin: 5px 0;
  font-size: 0.9em;
}

.credential-url a {
  color: #007bff;
  text-decoration: none;
}

.credential-url a:hover {
  text-decoration: underline;
}

.certificate-actions {
  display: flex;
  gap: 10px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style> 