<template>
  <base-card>
    <h6 slot="header" class="title">Project Portfolio</h6>
    <div class="list-container">
      <div v-if="loading" class="loading">
        Loading projects...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="projectList.length === 0" class="no-data">
        No projects found.
      </div>
      <div v-else class="project-items">
        <div 
          v-for="(project, index) in projectList" 
          :key="project._id" 
          class="list-item searchable-item"
          :data-id="project._id"
          :data-name="project.title">
          <div class="item-content">
            <div class="item-header">
              <div class="project-container">
                <img 
                  v-if="project.thumbnail" 
                  :src="project.thumbnail" 
                  :alt="project.title + ' thumbnail'"
                  class="project-logo"
                >
                <div class="project-title">
                  <h4>{{ project.title }}</h4>
                  <div class="project-meta">
                    <span class="category">{{ project.category }}</span>
                    <span class="status" :class="project.status">{{ project.status }}</span>
                    <span v-if="project.featured" class="featured">Featured</span>
                  </div>
                </div>
              </div>
              <div class="badge">{{ project.order }}</div>
            </div>
            <div class="item-details">
              <p v-if="project.shortDescription" class="short-description">{{ project.shortDescription }}</p>
              <p v-if="project.description" class="description">{{ project.description }}</p>
              <p>
                <strong>Duration:</strong> {{ formatDate(project.startDate) }} - {{ project.endDate ? formatDate(project.endDate) : 'Present' }}
              </p>
              <div v-if="project.technologies && project.technologies.length" class="technologies">
                <strong>Technologies:</strong>
                <div class="tech-tags">
                  <span v-for="(tech, idx) in project.technologies" :key="idx" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div class="project-links">
                <a v-if="project.projectUrl" 
                   :href="project.projectUrl" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="project-link">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a v-if="project.githubUrl" 
                   :href="project.githubUrl" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="github-link">
                  <i class="fab fa-github"></i> GitHub
                </a>
              </div>
            </div>
          </div>
          <div class="item-actions">
            <base-button type="info" size="sm" @click="$emit('edit-project', project, index)">
              Edit
            </base-button>
            <base-button type="danger" size="sm" @click="handleDeleteProject(project._id)">
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
  name: 'project-list',
  mixins: [searchHighlight],
  props: {
    projectList: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('projects', ['loading', 'error'])
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
    async handleDeleteProject(id) {
      try {
        const result = await this.$swal({
          title: 'Delete Project?',
          text: 'Are you sure you want to delete this project? This action cannot be undone.',
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
              await this.$store.dispatch('projects/deleteproject', {"_id":id})
              return true
            } catch (error) {
              this.$swal.showValidationMessage(
                `Failed to delete project: ${error.message}`
              )
            }
          }
        })

        if (result.isConfirmed) {
          this.$swal({
            title: 'Deleted!',
            text: 'Project has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Failed to delete project:', error)
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

.project-items {
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
  align-items: flex-start;
  margin-bottom: 0.5rem;

  .project-container {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .project-title {
      h4 {
        margin: 0;
        color: var(--text-color);
      }

      .project-meta {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.25rem;
        font-size: 0.875rem;

        .category {
          color: var(--primary-color);
          font-weight: 500;
        }

        .status {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          text-transform: capitalize;

          &.completed {
            background-color: var(--success-color);
            color: white;
          }

          &.in-progress {
            background-color: var(--warning-color);
            color: white;
          }

          &.planned {
            background-color: var(--info-color);
            color: white;
          }
        }

        .featured {
          color: var(--warning-color);
          font-weight: 500;
        }
      }
    }
  }
}

.project-logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
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

  .short-description {
    font-size: 0.875rem;
    color: var(--text-color-secondary);
    margin-bottom: 0.5rem;
  }

  .description {
    margin-bottom: 1rem;
  }

  strong {
    color: var(--text-color);
  }

  .technologies {
    margin: 0.5rem 0;

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.25rem;

      .tech-tag {
        padding: 0.25rem 0.75rem;
        background: var(--bg-color-secondary);
        color: var(--text-color-secondary);
        border-radius: 1rem;
        font-size: 0.875rem;
      }
    }
  }

  .project-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.3s ease;

      i {
        font-size: 1rem;
      }

      &.project-link {
        background: var(--primary-color);
        color: white;

        &:hover {
          background: var(--primary-color-dark);
        }
      }

      &.github-link {
        background: var(--bg-color-secondary);
        color: var(--text-color);

        &:hover {
          background: var(--bg-color-hover);
        }
      }
    }
  }
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}
</style> 