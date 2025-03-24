<template>
  <base-card>
    <h6 slot="header" class="title">Skills Portfolio</h6>
    <div class="list-container">
      <div v-if="loading" class="loading">
        Loading skills...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="skillList.length === 0" class="no-data">
        No skills found.
      </div>
      <div v-else class="category-section">
        <div v-for="(skills, category) in groupedSkills" :key="category" class="category-section">
          <h4 class="category-title">{{ category }}</h4>
          <div class="skill-items">
            <div v-for="(skill, index) in skills" :key="skill._id" class="list-item searchable-item" :data-id="skill._id" :data-name="skill.name" :id="skill._id">
              <div class="item-content">
                <div class="item-header">
                  <h4>{{ skill.name }}</h4>
                  <div class="badge" :style="{ backgroundColor: skill.color }">
                    <i :class="skill.icon"></i>
                    {{ skill.yearsOfExperience }} years
                  </div>
                </div>

                <p class="description">{{ skill.description }}</p>

                <div class="item-details">
                  <p v-if="skill.featured" class="featured">
                    <i class="fas fa-star"></i> Featured Skill
                  </p>
                </div>
              </div>
              <div class="item-actions">
                <base-button type="info" size="sm" @click="$emit('edit-skill', skill, index)">
                  Edit
                </base-button>
                <base-button type="danger" size="sm" @click="confirmDelete(skill._id)">
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
import { mapState, mapActions } from 'vuex';
import searchHighlight from '@/mixins/searchHighlight';

export default {
  name: 'skill-list',
  mixins: [searchHighlight],
  computed: {
    ...mapState('skills', ['skillList', 'loading', 'error']),
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
    ...mapActions('skills', ['fetchSkills', 'deleteSkill']),
    confirmDelete(id) {
      if (confirm('Are you sure you want to delete this skill?')) {
        this.deleteSkill(id)
      }
    }
  },
  created() {
    this.fetchSkills()
  },
  mounted() {
    console.log(this.skillList, "skillList")
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

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

.error {
  color: var(--danger);
}

.featured {
  color: var(--warning);
  font-weight: 500;
  
  i {
    margin-right: 0.5rem;
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #fff;
  font-weight: 500;
  
  i {
    font-size: 1.1rem;
  }
}
</style> 