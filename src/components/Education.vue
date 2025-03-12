<template>
  <div class="education-component">
    <div class="education-form">
      <h2>{{ isEditing ? 'Edit Education' : 'Add Education' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="institution">Institution</label>
          <input
            type="text"
            id="institution"
            v-model="educationForm.institution"
            required
            class="form-control"
          >
        </div>
        
        <div class="form-group">
          <label for="degree">Degree</label>
          <input
            type="text"
            id="degree"
            v-model="educationForm.degree"
            required
            class="form-control"
          >
        </div>
        
        <div class="form-group">
          <label for="fieldOfStudy">Field of Study</label>
          <input
            type="text"
            id="fieldOfStudy"
            v-model="educationForm.fieldOfStudy"
            required
            class="form-control"
          >
        </div>
        
        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            v-model="educationForm.startDate"
            required
            class="form-control"
          >
        </div>
        
        <div class="form-group">
          <label for="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            v-model="educationForm.endDate"
            class="form-control"
          >
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="educationForm.description"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Update' : 'Add' }}
          </button>
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="resetForm"
            v-if="isEditing"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="education-list">
      <h2>Education History</h2>
      <div v-if="educationList.length === 0" class="no-data">
        No education records found.
      </div>
      <div v-else class="education-items">
        <div v-for="(education, index) in educationList" :key="index" class="education-item">
          <div class="education-content">
            <h3>{{ education.institution }}</h3>
            <p class="degree">{{ education.degree }} in {{ education.fieldOfStudy }}</p>
            <p class="date">
              {{ formatDate(education.startDate) }} - {{ education.endDate ? formatDate(education.endDate) : 'Present' }}
            </p>
            <p class="description" v-if="education.description">{{ education.description }}</p>
          </div>
          <div class="education-actions">
            <button @click="editEducation(index)" class="btn btn-sm btn-info">Edit</button>
            <button @click="deleteEducation(index)" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EducationManager',
  data() {
    return {
      educationList: [],
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
      if (this.isEditing) {
        this.educationList[this.editIndex] = { ...this.educationForm }
      } else {
        this.educationList.push({ ...this.educationForm })
      }
      this.resetForm()
    },
    editEducation(index) {
      this.isEditing = true
      this.editIndex = index
      this.educationForm = { ...this.educationList[index] }
    },
    deleteEducation(index) {
      if (confirm('Are you sure you want to delete this education record?')) {
        this.educationList.splice(index, 1)
      }
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
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    }
  },
  created() {
    // Load education data from localStorage if available
    const savedEducation = localStorage.getItem('educationList')
    if (savedEducation) {
      this.educationList = JSON.parse(savedEducation)
    }
  },
  watch: {
    educationList: {
      handler(newValue) {
        // Save to localStorage whenever the list changes
        localStorage.setItem('educationList', JSON.stringify(newValue))
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.education-component {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.education-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.875rem;
}

.education-item {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.education-content h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.degree {
  font-weight: 600;
  color: #555;
  margin: 5px 0;
}

.date {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}

.description {
  color: #666;
  margin: 10px 0 0 0;
}

.education-actions {
  display: flex;
  gap: 10px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style> 