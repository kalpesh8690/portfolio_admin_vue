<template>
  <base-card>
    <h6 slot="header" class="title">Project Portfolio</h6>
    <div class="project-list">
      <div v-if="projectList.length === 0" class="no-data">
        No projects found.
      </div>
      <div v-else class="project-items">
        <div v-for="(project, index) in projectList" :key="index" class="project-item">
          <div class="project-content">
            <div class="project-header">
              <h4 class="project-name">{{ project.projectName }}</h4>
              <div class="project-type">{{ project.projectType }}</div>
            </div>
            
            <p class="date">
              {{ formatDate(project.startDate) }} - {{ project.endDate ? formatDate(project.endDate) : 'Present' }}
            </p>

            <p class="description">{{ project.description }}</p>

            <div class="project-details">
              <p class="technologies" v-if="project.technologies">
                <strong>Technologies:</strong> {{ project.technologies }}
              </p>
              <p class="features" v-if="project.features">
                <strong>Key Features:</strong> {{ project.features }}
              </p>
              <p class="url" v-if="project.projectUrl">
                <strong>Project URL:</strong> 
                <a :href="project.projectUrl" target="_blank" rel="noopener noreferrer">
                  {{ project.projectUrl }}
                </a>
              </p>
            </div>
          </div>
          <div class="project-actions">
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

<style scoped>
.project-list {
  padding: 0 10px;
}

.project-item {
  border-bottom: 1px solid #e9ecef;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.project-item:last-child {
  border-bottom: none;
}

.project-content {
  flex: 1;
}

.project-header {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.project-name {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.project-type {
  color: #666;
  font-size: 0.9em;
  padding: 2px 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.date {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}

.description {
  color: #666;
  margin: 10px 0;
  white-space: pre-line;
}

.project-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f1f1f1;
}

.technologies,
.features,
.url {
  color: #666;
  margin: 8px 0;
  font-size: 0.9em;
}

.url a {
  color: #007bff;
  text-decoration: none;
}

.url a:hover {
  text-decoration: underline;
}

.project-actions {
  display: flex;
  gap: 10px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style> 