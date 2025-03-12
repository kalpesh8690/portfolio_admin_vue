<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Experience' : 'Add Experience' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Company Name"
            v-model="experienceForm.companyName"
            placeholder="Enter company name"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Position"
            v-model="experienceForm.position"
            placeholder="e.g. Software Engineer"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Location"
            v-model="experienceForm.location"
            placeholder="City, Country"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Employment Type"
            v-model="experienceForm.employmentType"
            placeholder="e.g. Full-time, Contract"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Start Date"
            type="date"
            v-model="experienceForm.startDate"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="End Date"
            type="date"
            v-model="experienceForm.endDate"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="Responsibilities &amp; Achievements">
            <textarea
              rows="4"
              class="form-control"
              v-model="experienceForm.description"
              placeholder="Describe your key responsibilities, achievements, and projects"
            ></textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Technologies Used"
            v-model="experienceForm.technologies"
            placeholder="e.g. React, Node.js, AWS"
          >
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
  name: 'edit-experience-form',
  data() {
    return {
      experienceForm: {
        companyName: '',
        position: '',
        location: '',
        employmentType: '',
        startDate: '',
        endDate: '',
        description: '',
        technologies: ''
      },
      isEditing: false,
      editIndex: -1
    }
  },
  methods: {
    handleSubmit() {
      const experience = { ...this.experienceForm }
      this.$emit('save-experience', { experience, index: this.editIndex })
      this.resetForm()
    },
    resetForm() {
      this.experienceForm = {
        companyName: '',
        position: '',
        location: '',
        employmentType: '',
        startDate: '',
        endDate: '',
        description: '',
        technologies: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel-edit')
    },
    editExperience(experience, index) {
      this.experienceForm = { ...experience }
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