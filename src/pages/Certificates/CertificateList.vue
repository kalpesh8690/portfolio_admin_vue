<template>
  <base-card>
    <h6 slot="header" class="title">Certificates Portfolio</h6>
    <div class="list-container">
      <div v-if="loading" class="loading">
        Loading certificates...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="certificateList.length === 0" class="no-data">
        No certificates found.
      </div>
      <div v-else class="category-section">
        <div v-for="(certificates, category) in groupedCertificates" :key="category" class="category-section">
          <h4 class="category-title">{{ category }}</h4>
          <div class="certificate-items">
            <div 
              v-for="(certificate, index) in certificates" 
              :key="certificate._id || index" 
              class="list-item searchable-item"
              :data-id="certificate._id || certificate.id"
              :data-name="certificate.name"
              :id="certificate._id || certificate.id">
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
                  <p v-if="certificate.description" class="description">{{ certificate.description }}</p>
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
                <base-button type="danger" size="sm" @click="handleDeleteCertificate(certificate._id || certificate.id)">
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
import { mapState, mapActions } from 'vuex';
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
    ...mapState('certificates', ['loading', 'error']),
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
    ...mapActions('certificates', ['deleteCertificate']),
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    async handleDeleteCertificate(id) {
      try {
        const result = await this.$swal({
          title: 'Delete Certificate?',
          text: 'Are you sure you want to delete this certificate? This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f5365c',
          cancelButtonColor: '#8898aa',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try {
              await this.$store.dispatch('certificates/deleteCertificate', {"_id":id})
              return true
            } catch (error) {
              this.$swal.showValidationMessage(
                `Failed to delete certificate: ${error.message}`
              )
            }
          }
        })

        if (result.isConfirmed) {
          this.$swal({
            title: 'Deleted!',
            text: 'Certificate has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Failed to delete certificate:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';

.description {
  color: var(--text-color-secondary);
  margin: 0.75rem 0;
  line-height: 1.6;
  white-space: pre-line;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

.error {
  color: var(--danger);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #fff;
  font-weight: 500;
  background-color: var(--primary-color);
  
  i {
    font-size: 1.1rem;
  }
}

.category-title {
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.certificate-items {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.list-item {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
}

.item-content {
  flex: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-header h4 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 600;
}

.item-details {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  line-height: 1.6;

  p {
    margin: 0.5rem 0;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .list-item {
    flex-direction: column;
    gap: 1rem;
  }

  .item-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 