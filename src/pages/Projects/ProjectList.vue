<template>
  <base-card>
    <h6 slot="header" class="title">Project Portfolio</h6>
    <div class="list-container">
      <div v-if="projectList.length === 0" class="no-data">
        No projects found.
      </div>
      <div v-else class="project-items">
        <div v-for="(project, index) in projectList" :key="index" class="list-item">
          <div class="item-content">
            <div class="item-header">
              <h4>{{ project.projectName }}</h4>
              <div class="badge">{{ project.projectType }}</div>
            </div>
            
            <div class="item-details">
              <p>
                <strong>Duration:</strong> {{ formatDate(project.startDate) }} - {{ project.endDate ? formatDate(project.endDate) : 'Present' }}
              </p>
              <p v-if="project.description">{{ project.description }}</p>
              <p v-if="project.technologies">
                <strong>Technologies:</strong> {{ project.technologies }}
              </p>
              <p v-if="project.features">
                <strong>Key Features:</strong> {{ project.features }}
              </p>
              <p v-if="project.projectUrl">
                <strong>Project URL:</strong> 
                <a :href="project.projectUrl" target="_blank" rel="noopener noreferrer">
                  {{ project.projectUrl }}
                </a>
              </p>
            </div>
          </div>
          <div class="item-actions">
            <base-button type="info" size="sm" @click="$emit('edit-project', project, index)">
              Edit
            </base-button>
            <base-button type="danger" size="sm" @click="confirmDelete(index)">
              Delete
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'project-list',
  props: {
    projectList: {
      type: Array,
      required: true
    }
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
    confirmDelete(index) {
      if (confirm('Are you sure you want to delete this project?')) {
        this.$emit('delete-project', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';
</style> 