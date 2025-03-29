<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <edit-project-form
          :project="currentProject"
          @save-project="saveProject"
          @cancel="cancelEdit"
        />
      </div>
      <div class="col-md-4">
        <base-card>
          <h6 slot="header" class="title">Projects Summary</h6>
          <div class="summary-items">
            <div class="summary-item">
              <div class="label">Total Projects</div>
              <div class="value">{{ projectCount }}</div>
            </div>
            <div class="summary-item">
              <div class="label">Latest Project</div>
              <div class="value">{{ latestProject }}</div>
            </div>
            <div class="summary-item">
              <div class="label">Active Projects</div>
              <div class="value">{{ activeProjectCount }}</div>
            </div>
          </div>
        </base-card>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <project-list
          :project-list="projectList"
          @edit-project="editProject"
          @delete-project="deleteProject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditProjectForm from './Projects/EditProjectForm.vue'
import ProjectList from './Projects/ProjectList.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'project-manager',
  components: {
    EditProjectForm,
    ProjectList
  },
  data() {
    return {
      currentProject: null
    }
  },
  computed: {
    ...mapState('projects', ['projectList', 'loading', 'error']),
    
    projectCount() {
      return this.projectList.length
    },
    latestProject() {
      if (this.projectList.length === 0) return 'No projects'
      const sortedProjects = [...this.projectList].sort((a, b) => 
        new Date(b.startDate) - new Date(a.startDate)
      )
      return sortedProjects[0].projectName
    },
    activeProjectCount() {
      return this.projectList.filter(project => !project.endDate).length
    }
  },
  methods: {
    ...mapActions('projects', ['fetchproject', 'createproject', 'updateproject', 'deleteproject']),
    async saveProject(project,isEditing) {
      try {
        if (isEditing) {
          // Update existing project
          await this.updateproject(project)
        } else {
          // Add new project
          await this.createproject(project)
        }
        this.currentProject = null
      } catch (error) {
        console.error('Error saving project:', error)
        // You might want to show an error message to the user here
      }
    },
    editProject(project) {
      this.currentProject = project
    },
    async deleteProject(index) {
      try {
        const projectToDelete = this.projectList[index]
        await this.deleteproject(projectToDelete.id)
      } catch (error) {
        console.error('Error deleting project:', error)
        // You might want to show an error message to the user here
      }
    },
    cancelEdit() {
      this.currentProject = null
    }
  },
  created() {
    this.fetchproject()
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