<template>
  <base-card>
    <h6 slot="header" class="title">Work Experience History</h6>
    <div class="list-container">
      <div v-if="experienceList.length === 0" class="no-data">
        No work experience records found.
      </div>
      <div v-else class="experience-items">
        <div 
          v-for="(experience, index) in experienceList" 
          :key="index" 
          class="list-item searchable-item"
          :data-id="experience.id || experience.companyName"
          :data-name="experience.companyName">
          <div class="item-content">
            <div class="item-header">
              <h4>{{ experience.position }}</h4>
              <div class="badge">{{ experience.employmentType }}</div>
            </div>
            <div class="item-details">
              <p>
                <strong>{{ experience.companyName }}</strong>
                <span v-if="experience.location"> · {{ experience.location }}</span>
              </p>
              <p>
                <strong>Duration:</strong> {{ formatDate(experience.startDate) }} - {{ experience.endDate ? formatDate(experience.endDate) : 'Present' }}
              </p>
              <p v-if="experience.description">{{ experience.description }}</p>
              <p v-if="experience.technologies">
                <strong>Technologies:</strong> {{ experience.technologies }}
              </p>
            </div>
          </div>
          <div class="item-actions">
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
import searchHighlight from '@/mixins/searchHighlight';

export default {
  name: 'experience-list',
  mixins: [searchHighlight],
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

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';
</style> 