<template>
  <base-card>
    <h6 slot="header" class="card-title">Education History</h6>
    <div class="education-list">
      <div v-if="educationList.length === 0" class="no-data">
        No education records found.
      </div>
      <div v-else class="education-items">
        <div v-for="(education, index) in educationList" :key="index" class="education-item">
          <div class="education-content">
            <h4 class="institution">{{ education.institution }}</h4>
            <p class="degree">{{ education.degree }} in {{ education.fieldOfStudy }}</p>
            <p class="date">
              {{ formatDate(education.startDate) }} - {{ education.endDate ? formatDate(education.endDate) : 'Present' }}
            </p>
            <p class="description" v-if="education.description">{{ education.description }}</p>
          </div>
          <div class="education-actions">
            <base-button type="success" size="sm" @click="$emit('edit-education', education, index)">
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
  name: 'education-list',
  props: {
    educationList: {
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
      if (confirm('Are you sure you want to delete this education record?')) {
        this.$emit('delete-education', index)
      }
    }
  }
}
</script>

<style scoped>
.education-list {
  padding: 0 10px;
}

.education-item {
  border-bottom: 1px solid #e9ecef;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.education-item:last-child {
  border-bottom: none;
}

.education-content {
  flex: 1;
}

.institution {
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
}
</style> 