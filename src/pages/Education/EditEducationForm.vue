<template>
  <base-card>
    <h6 slot="header" class="card-title">{{ isEditing ? 'Edit Education' : 'Add Education' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Institution"
            v-model="educationForm.institution"
            placeholder="University or School Name"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Degree"
            v-model="educationForm.degree"
            placeholder="e.g. Bachelor of Science"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Field of Study"
            v-model="educationForm.fieldOfStudy"
            placeholder="e.g. Computer Science"
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
            v-model="educationForm.startDate"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="End Date"
            type="date"
            v-model="educationForm.endDate"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="Description">
            <textarea
              rows="4"
              class="form-control"
              v-model="educationForm.description"
              placeholder="Describe your studies, achievements, or relevant details"
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
  name: 'edit-education-form',
  data() {
    return {
      educationForm: {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
      },
      isEditing: false,
      editIndex: -1
    }
  },
  methods: {
    handleSubmit() {
      const education = { ...this.educationForm }
      this.$emit('save-education', { education, index: this.editIndex })
      this.resetForm()
    },
    resetForm() {
      this.educationForm = {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel-edit')
    },
    editEducation(education, index) {
      this.educationForm = { ...education }
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