<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Education' : 'Add Education' }}</h6>
    <form @submit.prevent="handleSubmit" class="education-form">
      <div class="form-section">
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
                rows="3"
                class="form-control"
                v-model="educationForm.description"
                placeholder="Describe your studies, achievements, or relevant details"
              ></textarea>
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="toggle-switch">
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="educationForm.featured"
                  >
                  <span class="slider round"></span>
                </label>
                <span class="toggle-label">Featured Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="form-footer">
        <base-button type="primary" native-type="submit" fill>
          {{ isEditing ? 'Update' : 'Add' }}
        </base-button>
        <base-button type="default" fill @click="resetForm" v-if="isEditing">
          Cancel
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'edit-education-form',
  props: {
    editData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      educationForm: {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
        featured: false
      },
      isEditing: false,
      editIndex: -1
    }
  },
  watch: {
    editData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.setEditData(newData)
        }
      }
    }
  },
  methods: {
    setEditData(data) {
      this.educationForm = {
        institution: data.institution || '',
        degree: data.degree || '',
        fieldOfStudy: data.fieldOfStudy || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        description: data.description || '',
        featured: data.featured || false
      }
      this.isEditing = true
      this.editIndex = data.index
    },
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
        description: '',
        featured: false
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel-edit')
    }
  }
}
</script>

<style scoped>
.education-form {
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

.form-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.row {
  margin-bottom: 2rem;
}

.row:last-child {
  margin-bottom: 0;
}

.form-control-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: block;
}

.form-group {
  margin-bottom: 1rem;
}

textarea.form-control {
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  transition: all 0.3s ease;
}

textarea.form-control:focus {
  border-color: #5e72e4;
  box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.1);
  outline: none;
}

.form-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.base-button {
  min-width: 120px;
}

/* Toggle Switch Styles */
.toggle-switch {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #5e72e4;
}

input:focus + .slider {
  box-shadow: 0 0 1px #5e72e4;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-label {
  font-size: 0.875rem;
  color: var(--text-color);
  font-weight: 500;
}
</style> 