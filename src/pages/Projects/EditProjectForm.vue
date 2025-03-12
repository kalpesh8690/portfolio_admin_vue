<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Project' : 'Add Project' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Project Name"
            v-model="projectForm.projectName"
            placeholder="Enter project name"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Project Type"
            v-model="projectForm.projectType"
            placeholder="e.g. Web Application, Mobile App"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Project URL"
            v-model="projectForm.projectUrl"
            placeholder="https://example.com"
            type="url"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Start Date"
            type="date"
            v-model="projectForm.startDate"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="End Date"
            type="date"
            v-model="projectForm.endDate"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="Project Description">
            <textarea
              rows="4"
              class="form-control"
              v-model="projectForm.description"
              placeholder="Describe the project, its goals, and your role"
              required
            ></textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Technologies Used"
            v-model="projectForm.technologies"
            placeholder="e.g. React, Node.js, AWS"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="Key Features">
            <textarea
              rows="3"
              class="form-control"
              v-model="projectForm.features"
              placeholder="List the main features and achievements"
            ></textarea>
          </base-input>
        </div>
      </div>

      <div slot="footer" class="row">
        <div class="col-md-12">
          <base-button type="primary" native-type="submit" fill>
            {{ isEditing ? 'Update' : 'Add' }}
          </base-button>
          <base-button type="default" fill @click="resetForm" v-if="isEditing">
            Cancel
          </base-button>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'edit-project-form',
  data() {
    return {
      projectForm: {
        projectName: '',
        projectType: '',
        projectUrl: '',
        startDate: '',
        endDate: '',
        description: '',
        technologies: '',
        features: ''
      },
      isEditing: false,
      editIndex: -1
    }
  },
  methods: {
    handleSubmit() {
      const project = { ...this.projectForm }
      this.$emit('save-project', { project, index: this.editIndex })
      this.resetForm()
    },
    resetForm() {
      this.projectForm = {
        projectName: '',
        projectType: '',
        projectUrl: '',
        startDate: '',
        endDate: '',
        description: '',
        technologies: '',
        features: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel-edit')
    },
    editProject(project, index) {
      this.projectForm = { ...project }
      this.isEditing = true
      this.editIndex = index
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 1rem;
}

textarea.form-control {
  padding: 10px;
}

.base-button {
  margin-right: 10px;
}
</style> 