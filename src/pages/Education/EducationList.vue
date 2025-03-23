<template>
  <base-card>
    <h6 slot="header" class="title">Education History</h6>
    <div class="list-container">
      <div v-if="educationList.length === 0" class="no-data">
        No education records found.
      </div>
      <div v-else class="education-items">
        <div v-for="(education, index) in educationList" :key="index" class="list-item">
          <div class="item-content">
            <div class="item-header">
              <h4>{{ education.institution }}</h4>
              <div class="badge">{{ education.degree }}</div>
            </div>
            <div class="item-details">
              <p>
                <strong>Field of Study:</strong> {{ education.fieldOfStudy }}
              </p>
              <p>
                <strong>Duration:</strong> {{ formatDate(education.startDate) }} - {{ education.endDate ? formatDate(education.endDate) : 'Present' }}
              </p>
              <p v-if="education.description">{{ education.description }}</p>
            </div>
          </div>
          <div class="item-actions">
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

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';
</style> 