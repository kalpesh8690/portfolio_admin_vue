<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Experience' : 'Add Experience' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Company Name"
            v-model="experienceForm.company"
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
            label="Company URL"
            v-model="experienceForm.companyUrl"
            placeholder="https://company-website.com"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Company Logo</label>
            <base-image-uploader
            v-model="imageFile"
    :max-size="10"
    placeholder="Upload your profile picture"
    @input="handleLogoUpload"/>
            
            <small class="form-text text-muted">Upload company logo (PNG, JPG, JPEG)</small>
          </div>
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
          <div class="form-group">
            <label>End Date</label>
            <base-input
              type="date"
              v-model="experienceForm.endDate"
              :disabled="experienceForm.current"
            >
            </base-input>
            <div class="form-check mt-2">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="experienceForm.current"
                >
                Current Position
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="Description">
            <textarea
              rows="3"
              class="form-control"
              v-model="experienceForm.description"
              placeholder="Brief description of your role"
            ></textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="section-label">Responsibilities</label>
            <div class="dynamic-list">
              <div v-for="(responsibility, index) in experienceForm.responsibilities" 
                   :key="index" 
                   class="dynamic-item">
                <div class="item-content">
                  <span class="item-number">{{ index + 1 }}</span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="experienceForm.responsibilities[index]"
                    placeholder="Enter responsibility"
                  >
                  <button type="button" 
                          class="btn btn-icon btn-danger" 
                          @click="removeResponsibility(index)"
                          title="Remove responsibility">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <button type="button" 
                      class="btn btn-add" 
                      @click="addResponsibility">
                <i class="fas fa-plus"></i>
                Add Responsibility
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="section-label">Technologies</label>
            <div class="dynamic-list">
              <div v-for="(tech, index) in experienceForm.technologies" 
                   :key="index" 
                   class="dynamic-item">
                <div class="item-content">
                  <span class="item-number">{{ index + 1 }}</span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="experienceForm.technologies[index]"
                    placeholder="Enter technology"
                  >
                  <button type="button" 
                          class="btn btn-icon btn-danger" 
                          @click="removeTechnology(index)"
                          title="Remove technology">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <button type="button" 
                      class="btn btn-add" 
                      @click="addTechnology">
                <i class="fas fa-plus"></i>
                Add Technology
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="experienceForm.featured"
              >
              Featured Experience
            </label>
          </div>
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
import BaseImageUploader from '@/components/Inputs/BaseImageUploader.vue'
export default {
  name: 'edit-experience-form',
  components: {
    BaseImageUploader
  },
  data() {
    return {
      experienceForm: {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        responsibilities: [],
        technologies: [],
        companyLogo: null,
        companyUrl: '',
        order: 0,
        featured: false
      },
      isEditing: false,
      editId: null,
      logoFile: null
    }
  },
  methods: {
    handleLogoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.logoFile = file
        this.experienceForm.companyLogo = file
        // Convert file to buffer
        const reader = new FileReader()
        reader.onload = (e) => {
          e.target.result
        }
        reader.readAsArrayBuffer(file)
      }
    },
    addResponsibility() {
      this.experienceForm.responsibilities.push('')
    },
    removeResponsibility(index) {
      this.experienceForm.responsibilities.splice(index, 1)
    },
    addTechnology() {
      this.experienceForm.technologies.push('')
    },
    removeTechnology(index) {
      this.experienceForm.technologies.splice(index, 1)
    },
    handleSubmit() {
      const formData = new FormData()
      
      // Add all form fields to FormData
      formData.append('company', this.experienceForm.company)
      formData.append('position', this.experienceForm.position)
      formData.append('location', this.experienceForm.location)
      formData.append('startDate', this.experienceForm.startDate)
      formData.append('endDate', this.experienceForm.current ? null : this.experienceForm.endDate)
      formData.append('current', this.experienceForm.current)
      formData.append('description', this.experienceForm.description)
      formData.append('companyUrl', this.experienceForm.companyUrl)
      formData.append('order', this.experienceForm.order)
      formData.append('featured', this.experienceForm.featured)

      // Add arrays as JSON strings
      formData.append('responsibilities', JSON.stringify(this.experienceForm.responsibilities))
      formData.append('technologies', JSON.stringify(this.experienceForm.technologies))

      // Add the logo file if it exists
      if (this.logoFile) {
        formData.append('file', this.logoFile)
      }

      // If editing, add the _id
      if (this.isEditing && this.editId) {
        formData.append('_id', this.editId)
      }

      this.$emit('save-experience', formData, this.isEditing)
      this.resetForm()
    },
    resetForm() {
      this.experienceForm = {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        responsibilities: [],
        technologies: [],
        companyLogo: null,
        companyUrl: '',
        order: 0,
        featured: false
      }
      this.logoFile = null
      this.isEditing = false
      this.editId = null
      this.$emit('cancel-edit')
    },
    editExperience(experience) {
      this.experienceForm = { ...experience }
      this.isEditing = true
      this.editId = experience._id
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

textarea.form-control {
  padding: 12px;
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.base-button {
  margin-right: 12px;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.form-check {
  margin-top: 0.75rem;
}

.form-check-label {
  color: var(--text-color);
  cursor: pointer;
}

.form-check-input {
  margin-right: 8px;
  cursor: pointer;
}

.input-group {
  margin-bottom: 0.75rem;
  border-radius: 8px;
  overflow: hidden;
}

.input-group .form-control {
  border-radius: 8px 0 0 8px;
  border-right: none;
}

.input-group-append {
  display: flex;
}

.btn {
  margin-right: 0.5rem;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.form-control {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
}

.form-control:focus {
  background-color: var(--bg-color);
  color: var(--text-color);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
  outline: none;
}

.form-control::placeholder {
  color: var(--text-color-secondary);
  opacity: 0.7;
}

.form-text {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.btn-danger {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: var(--danger-color-dark);
  border-color: var(--danger-color-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--secondary-color-dark);
  border-color: var(--secondary-color-dark);
  transform: translateY(-1px);
}

.title {
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

/* Add smooth transitions */
.form-control,
.btn,
.base-button {
  transition: all 0.3s ease;
}

/* Add hover effects */
.form-control:hover {
  border-color: var(--primary-color);
}

/* Improve focus states */
.form-control:focus,
.btn:focus,
.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

/* Add spacing between form sections */
.row:not(:last-child) {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

/* Dynamic List Styles */
.dynamic-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dynamic-item {
  background-color: var(--bg-color-secondary);
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.dynamic-item:hover {
  background-color: var(--hover-bg);
  transform: translateX(4px);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.item-number {
  background-color: var(--primary-color);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  flex-shrink: 0;
}

.btn-icon {
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  transform: scale(1.1);
}

.btn-add {
  background-color: var(--primary-color-light);
  color: var(--primary-color);
  border: 2px dashed var(--primary-color);
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-add:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.section-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
  display: block;
}

/* Update existing form-control styles for dynamic items */
.dynamic-item .form-control {
  flex: 1;
  margin: 0;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
}

.dynamic-item .form-control:focus {
  background-color: transparent;
  box-shadow: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .item-content {
    flex-wrap: wrap;
  }
  
  .btn-icon {
    width: 32px;
    height: 32px;
  }
  
  .item-number {
    width: 20px;
    height: 20px;
    font-size: 0.75rem;
  }
}
</style> 