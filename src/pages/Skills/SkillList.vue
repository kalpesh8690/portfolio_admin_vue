<template>
  <base-card>
    <h6 slot="header" class="title">Skills Portfolio</h6>
    <div class="list-container">
      <div v-if="skillList.length === 0" class="no-data">
        No skills found.
      </div>
      <div v-else class="category-section">
        <div v-for="(skills, category) in groupedSkills" :key="category" class="category-section">
          <h4 class="category-title">{{ category }}</h4>
          <div class="skill-items">
            <div v-for="(skill, index) in skills" :key="index" class="list-item searchable-item" :data-id="skill.id || skill.skillName" :data-name="skill.skillName" :id="skill.id || skill.skillName">
              <div class="item-content">
                <div class="item-header">
                  <h4>{{ skill.skillName }}</h4>
                  <div class="badge">
                    Level {{ skill.proficiency }}/5
                  </div>
                </div>

                <p class="description">{{ skill.description }}</p>

                <div class="item-details">
                  <p v-if="skill.relatedProjects">
                    <strong>Related Projects:</strong> {{ skill.relatedProjects }}
                  </p>
                  <p v-if="skill.certifications">
                    <strong>Certifications:</strong> {{ skill.certifications }}
                  </p>
                </div>
              </div>
              <div class="item-actions">
                <base-button type="info" size="sm" @click="$emit('edit-skill', skill, index)">
                  Edit
                </base-button>
                <base-button type="danger" size="sm" @click="confirmDelete(index)">
                  Delete
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import searchHighlight from '@/mixins/searchHighlight';

export default {
  name: 'skill-list',
  mixins: [searchHighlight],
  props: {
    skillList: {
      type: Array,
      required: true
    }
  },
  computed: {
    groupedSkills() {
      return this.skillList.reduce((groups, skill) => {
        const category = skill.category || 'Other'
        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(skill)
        return groups
      }, {})
    }
  },
  methods: {
    confirmDelete(index) {
      if (confirm('Are you sure you want to delete this skill?')) {
        this.$emit('delete-skill', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/black-dashboard/list.scss';

.description {
  color: var(--text-color-secondary);
  margin: 0.75rem 0;
  line-height: 1.6;
  white-space: pre-line;
}
</style> 