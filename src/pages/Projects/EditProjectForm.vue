<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Project' : 'Add Project' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Title"
            v-model="projectForm.title"
            placeholder="Enter project title"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Category"
            v-model="projectForm.category"
            placeholder="e.g. Web Development, Mobile App"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Short Description"
            v-model="projectForm.shortDescription"
            placeholder="Brief description of the project"
            required
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
              v-model="projectForm.description"
              placeholder="Detailed description of the project"
              required
            ></textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Project URL"
            v-model="projectForm.projectUrl"
            placeholder="https://example.com"
            type="url"
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="GitHub URL"
            v-model="projectForm.githubUrl"
            placeholder="https://github.com/username/repo"
            type="url"
          >
          </base-input>
        </div>
      </div>

   
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-text">Project Thumbnail</label>
            <base-image-uploader
              v-model="projectForm.thumbnail"
              :max-size="5"
              placeholder="Upload project thumbnail"
              @input="handleThumbnailUpload"
            />
            <small class="form-text">Upload a thumbnail image (PNG, JPG, JPEG, max 5MB)</small>
          </div>
        </div>
        
    
       
        <div class="col-md-12">
          <base-input
            label="Technologies"
            v-model="technologiesInput"
            placeholder="e.g. React, Node.js, AWS (comma separated)"
            required
          >
          </base-input>
        </div>
      

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-date-picker
            label="Start Date"
            v-model="projectForm.startDate"
            required
            clearable
          >
          </base-date-picker>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-date-picker
            label="End Date"
            v-model="projectForm.endDate"
            clearable
          >
          </base-date-picker>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Order"
            type="number"
            v-model="projectForm.order"
            required
          >
          </base-input>
        </div>
        
      </div>
      <div class="row">
        <div class="col-md-12 pl-md-1">
          <label class="form-label">Status</label>
          <div class="status-options">
            <button 
              type="button"
              class="status-option"
              :class="{ 'active': projectForm.status === 'draft' }"
              @click="projectForm.status = 'draft'"
            >
              <i class="fas fa-file-alt"></i>
              <span>Draft</span>
            </button>
            <button 
              type="button"
              class="status-option"
              :class="{ 'active': projectForm.status === 'published' }"
              @click="projectForm.status = 'published'"
            >
              <i class="fas fa-check-circle"></i>
              <span>Published</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="featured-checkbox">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="projectForm.featured"
              >
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Featured Project</span>
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
import BaseDatePicker from '@/components/Inputs/BaseDatePicker.vue'

export default {
  name: 'edit-project-form',
  components: {
    BaseImageUploader,
    BaseDatePicker
  },
  props: {
    project: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      projectForm: {
        title: '',
        description: '',
        shortDescription: '',
        technologies: [],
        thumbnail: '',
        projectUrl: '',
        githubUrl: '',
        category: '',
        featured: false,
        order: 0,
        status: 'draft',
        startDate: '',
        endDate: '',
      },
      thumbnailFile: null,
      technologiesInput: '',
      isEditing: false,
      editIndex: -1
    }
  },
  watch: {
    project: {
      handler(newProject) {
        if (newProject) {
          this.projectForm = { ...newProject };
          this.technologiesInput = newProject.technologies ? newProject.technologies.join(', ') : '';
          this.isEditing = true;
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleThumbnailUpload(file) {
      this.thumbnailFile = file;
      // Create a temporary URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.projectForm.thumbnail = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    handleSubmit() {
      // Convert technologies string to array
      this.projectForm.technologies = this.technologiesInput
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      // Create FormData object
      const formData = new FormData();
      
      // Create a copy of projectForm without the thumbnail
      const { ...projectData } = this.projectForm;
      
      // Append all project data except thumbnail
      Object.keys(projectData).forEach(key => {
        if (key === 'technologies') {
          formData.append(key, JSON.stringify(projectData[key]));
        } else {
          formData.append(key, projectData[key]);
        }
      });

      // Append the thumbnail file if it exists
      if (this.thumbnailFile) {
        formData.append('file', this.thumbnailFile);
      }

      // Add _id if editing
      if (this.isEditing && this.projectForm._id) {
        formData.append('_id', this.projectForm._id);
      }

      this.$emit('save-project', formData, this.isEditing);
      this.resetForm();
    },
    resetForm() {
      this.projectForm = {
        title: '',
        description: '',
        shortDescription: '',
        technologies: [],
        thumbnail: '',
        projectUrl: '',
        githubUrl: '',
        category: '',
        featured: false,
        order: 0,
        status: 'draft',
        startDate: '',
        endDate: '',
      };
      this.thumbnailFile = null;
      this.technologiesInput = '';
      this.isEditing = false;
      this.editIndex = -1;
      this.$emit('cancel-edit');
    },
    editProject(project, index) {
      this.projectForm = { ...project };
      this.technologiesInput = project.technologies.join(', ');
      this.isEditing = true;
      this.editIndex = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin-bottom: 1rem;
}

textarea.form-control {
  padding: 10px;
}

.base-button {
  margin-right: 10px;
}

.form-check {
  margin-top: 10px;
}

.status-options {
  display: flex;
  gap: 10px;
}

.status-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-option:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.status-option.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.status-option i {
  font-size: 1.1em;
}

.status-option span {
  font-weight: 500;
}

.featured-checkbox {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: var(--bg-color-secondary);
  border: 1px solid var(--border-color);
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-left: 35px;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.checkbox-label:hover input ~ .checkbox-custom {
  border-color: var(--primary-color);
  background-color: var(--primary-color-light);
}

.checkbox-label input:checked ~ .checkbox-custom {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-custom:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label input:checked ~ .checkbox-custom:after {
  display: block;
}

.checkbox-text {
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 500;
}

.form-text {
  color: var(--text-color) !important;
}

</style> 