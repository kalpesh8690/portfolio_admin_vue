<template>
  <base-card>
    <h6 slot="header" class="title">Skills Portfolio</h6>
    <div class="skill-list">
      <div v-if="skillList.length === 0" class="no-data">
        No skills found.
      </div>
      <div v-else class="skill-categories">
        <div v-for="(skills, category) in groupedSkills" :key="category" class="skill-category">
          <h4 class="category-title">{{ category }}</h4>
          <div class="skill-items">
            <div v-for="(skill, index) in skills" :key="index" class="skill-item searchable-item" :data-id="skill.id || skill.skillName" :data-name="skill.skillName" :id="skill.id || skill.skillName">
              <div class="skill-content">
                <div class="skill-header">
                  <h5 class="skill-name">{{ skill.skillName }}</h5>
                  <div class="proficiency-badge">
                    Level {{ skill.proficiency }}/5
                  </div>
                </div>

                <p class="description">{{ skill.description }}</p>

                <div class="skill-details">
                  <p class="related-projects" v-if="skill.relatedProjects">
                    <strong>Related Projects:</strong> {{ skill.relatedProjects }}
                  </p>
                  <p class="certifications" v-if="skill.certifications">
                    <strong>Certifications:</strong> {{ skill.certifications }}
                  </p>
                </div>
              </div>
              <div class="skill-actions">
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

<style scoped>
.skill-list {
  padding: 0 10px;
}

.skill-category {
  margin-bottom: 30px;
}

.category-title {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.skill-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
}

.skill-content {
  flex: 1;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.skill-name {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.proficiency-badge {
  background-color: #f8f9fa;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.description {
  color: #666;
  margin: 10px 0;
  white-space: pre-line;
}

.skill-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f1f1f1;
}

.related-projects,
.certifications {
  color: #666;
  margin: 5px 0;
  font-size: 0.9em;
}

.skill-actions {
  display: flex;
  gap: 10px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.search-highlight {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #e14eca;
    border-radius: 8px;
    animation: highlightBorder 2s ease-out;
  }
}

@keyframes highlightBorder {
  0% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style> 