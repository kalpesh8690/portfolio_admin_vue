<template>
  <base-card>
    <h6 slot="header" class="title">Work Experience History</h6>
    <div class="list-container">
      <div v-if="loading" class="loading">
        Loading experiences...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="experienceList.length === 0" class="no-data">
        No work experience records found.
      </div>
      <div v-else class="experience-items">
        <div 
          v-for="(experience, index) in experienceList" 
          :key="index" 
          class="list-item searchable-item"
          :data-id="experience.id || experience.companyName"
          :data-name="experience.companyName">
          <div class="item-content">
            <div class="item-header">
              <div class="position-container">
                <img 
                  v-if="experience.companyLogo" 
                  :src="experience.companyLogo" 
                  :alt="experience.company + ' logo'"
                  class="company-logo"
                >
                <h4>{{ experience.position }}</h4>
              </div>
              <div class="badge">{{ experience.current ? 'Current' : 'Past' }}</div>
            </div>
            <div class="item-details">
              <p>
                <strong>{{ experience.company }}</strong>
                <span v-if="experience.location"> · {{ experience.location }}</span>
              </p>
              <p>
                <strong>Duration:</strong> {{ formatDate(experience.startDate) }} - {{ experience.current ? 'Present' : formatDate(experience.endDate) }}
              </p>
              <p v-if="experience.description">{{ experience.description }}</p>
              <div v-if="experience.responsibilities && experience.responsibilities.length" class="responsibilities">
                <strong>Responsibilities:</strong>
                <ul >
                  <li class="responsibility-item" v-for="(responsibility, idx) in experience.responsibilities" :key="idx">
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
              <div v-if="experience.technologies && experience.technologies.length" class="technologies">
                <strong>Technologies:</strong>
                <div class="tech-tags">
                  <span v-for="(tech, idx) in experience.technologies" :key="idx" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-actions">
            <base-button type="info" size="sm" @click="$emit('edit-experience', experience, index)">
              Edit
            </base-button>
            <base-button type="danger" size="sm" @click="handleDeleteExperience(experience._id)">
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
  name: 'experience-list',
  mixins: [searchHighlight],
  props: {
    experienceList: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('experience', ['loading', 'error'])
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
    async handleDeleteExperience(id) {
      try {
        const result = await this.$swal({
          title: 'Delete Experience?',
          text: 'Are you sure you want to delete this experience record? This action cannot be undone.',
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
              await this.$store.dispatch('experience/deleteExperience', {"_id":id})
              return true
            } catch (error) {
              this.$swal.showValidationMessage(
                `Failed to delete experience: ${error.message}`
              )
            }
          }
        })

        if (result.isConfirmed) {
          this.$swal({
            title: 'Deleted!',
            text: 'Experience has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Failed to delete experience:', error)
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

.experience-items {
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

  .position-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    h4 {
      margin: 0;
      color: var(--text-color);
    }
  }
}

.company-logo {
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

  .responsibilities, .technologies {
    margin-top: 0.5rem;
    
    ul {
      margin: 0.25rem 0;
      padding-left: 1.5rem;
      color: var(--text-color-secondary);
    }
  }

  .responsibility-item {
    position: relative;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    color: var(--text-color-secondary);
    line-height: 1.5;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--text-color);
    }
    
    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .tech-tag {
    background: var(--bg-color-secondary);
    color: var(--text-color);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
  }
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}
</style> 