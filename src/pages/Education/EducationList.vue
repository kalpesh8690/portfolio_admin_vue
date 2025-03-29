<template>
  <base-card>
    <h6 slot="header" class="title">Education History</h6>
    <div class="list-container">
      <div v-if="loading" class="loading">
        Loading education records...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="educationList.length === 0" class="no-data">
        No education records found.
      </div>
      <div v-else class="education-items">
        <div 
          v-for="(education, index) in educationList" 
          :key="index" 
          class="list-item searchable-item"
          :data-id="education.id || education.institution"
          :data-name="education.institution">
          <div class="item-content">
            <div class="item-header">
              <div class="institution-container">
                <img 
                  v-if="education.institutionLogo" 
                  :src="education.institutionLogo" 
                  :alt="education.institution + ' logo'"
                  class="institution-logo"
                >
                <h4>{{ education.institution }}</h4>
              </div>
              <div class="badge">{{ education.degree }}</div>
            </div>
            <div class="item-details">
              <p>
                <strong>Field of Study:</strong> {{ education.fieldOfStudy }}
              </p>
              <p>
                <strong>Duration:</strong> {{ formatDate(education.startDate) }} - {{ education.endDate ? formatDate(education.endDate) : 'Present' }}
              </p>
              <p v-if="education.description">{{ education.description }}</p>
              <div v-if="education.achievements && education.achievements.length" class="achievements">
                <strong>Achievements:</strong>
                <ul>
                  <li class="achievement-item" v-for="(achievement, idx) in education.achievements" :key="idx">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="item-actions">
            <base-button type="info" size="sm" @click="$emit('edit-education', education, index)">
              Edit
            </base-button>
            <base-button type="danger" size="sm" @click="handleDeleteEducation(education._id)">
              Delete
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import searchHighlight from '@/mixins/searchHighlight';
import { mapState } from 'vuex';

export default {
  name: 'education-list',
  mixins: [searchHighlight],
  props: {
    educationList: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('education', ['loading', 'error'])
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    },
    async handleDeleteEducation(id) {
      try {
        const result = await this.$swal({
          title: 'Delete Education?',
          text: 'Are you sure you want to delete this education record? This action cannot be undone.',
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
              await this.$store.dispatch('education/deleteEducation', {"_id":id})
              return true
            } catch (error) {
              this.$swal.showValidationMessage(
                `Failed to delete education: ${error.message}`
              )
            }
          }
        })

        if (result.isConfirmed) {
          this.$swal({
            title: 'Deleted!',
            text: 'Education record has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Failed to delete education:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

.error {
  text-align: center;
  padding: 2rem;
  color: var(--danger-color);
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

.education-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.item-content {
  flex: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .institution-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    h4 {
      margin: 0;
      color: var(--text-color);
    }
  }
}

.institution-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
  background-color: var(--bg-color-secondary);
}

.badge {
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: var(--bg-color);
  border-radius: 1rem;
  font-size: 0.875rem;
}

.item-details {
  p {
    margin: 0.25rem 0;
    color: var(--text-color-secondary);
  }

  strong {
    color: var(--text-color);
  }

  .achievements {
    margin-top: 0.5rem;
    
    ul {
      margin: 0.25rem 0;
      padding-left: 1.5rem;
      color: var(--text-color-secondary);
    }
  }

  .achievement-item {
    position: relative;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    color: var(--text-color-secondary);
    line-height: 1.5;
    transition: color 0.3s ease;
  }
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}
</style> 