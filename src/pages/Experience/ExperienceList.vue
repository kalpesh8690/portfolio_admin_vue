<template>
  <base-card>
    <h6 slot="header" class="title">Work Experience History</h6>
    <div class="experience-list">
      <div v-if="experienceList.length === 0" class="no-data">
        No work experience records found.
      </div>
      <div v-else class="experience-items">
        <div v-for="(experience, index) in experienceList" :key="index" class="experience-item">
          <div class="experience-content">
            <div class="experience-header">
              <h4 class="position">{{ experience.position }}</h4>
              <div class="company-info">
                <span class="company-name">{{ experience.companyName }}</span>
                <span class="location">· {{ experience.location }}</span>
              </div>
            </div>
            <p class="employment-type">{{ experience.employmentType }}</p>
            <p class="date">
              {{ formatDate(experience.startDate) }} - {{ experience.endDate ? formatDate(experience.endDate) : 'Present' }}
            </p>
            <p class="description" v-if="experience.description">{{ experience.description }}</p>
            <p class="technologies" v-if="experience.technologies">
              <strong>Technologies:</strong> {{ experience.technologies }}
            </p>
          </div>
          <div class="experience-actions">
            <base-button type="info" size="sm" @click="$emit('edit-experience', experience, index)">
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
  name: 'experience-list',
  props: {
    experienceList: {
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
      if (confirm('Are you sure you want to delete this experience record?')) {
        this.$emit('delete-experience', index)
      }
    }
  }
}
</script>

<style scoped>
.experience-list {
  padding: 0 10px;
}

.experience-item {
  border-bottom: 1px solid #e9ecef;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.experience-item:last-child {
  border-bottom: none;
}

.experience-content {
  flex: 1;
}

.experience-header {
  margin-bottom: 10px;
}

.position {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.company-info {
  margin-top: 5px;
}

.company-name {
  font-weight: 600;
  color: #555;
}

.location {
  color: #666;
  margin-left: 5px;
}

.employment-type {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
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

.technologies {
  color: #666;
  margin: 10px 0 0 0;
  font-size: 0.9em;
}

.experience-actions {
  display: flex;
  gap: 10px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style> 