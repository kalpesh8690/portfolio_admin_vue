<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <edit-skill-form
          :skill="currentSkill"
          @save-skill="saveSkill"
          @cancel="cancelEdit"
        />
      </div>
      <div class="col-md-4">
        <base-card>
          <h6 slot="header" class="title">Skills Summary</h6>
          <div class="summary-items">
            <div class="summary-item">
              <div class="label">Total Skills</div>
              <div class="value">{{ skillCount }}</div>
            </div>
            <div class="summary-item">
              <div class="label">Categories</div>
              <div class="value">{{ categoryCount }}</div>
            </div>
            <div class="summary-item">
              <div class="label">Top Category</div>
              <div class="value">{{ topCategory }}</div>
            </div>
          </div>
        </base-card>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <skill-list
          :skill-list="skillList"
          @edit-skill="editSkill"
          @delete-skill="deleteSkill"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditSkillForm from './Skills/EditSkillForm.vue'
import SkillList from './Skills/SkillList.vue'

export default {
  name: 'skill-manager',
  components: {
    EditSkillForm,
    SkillList
  },
  data() {
    return {
    
      currentSkill: null
    }
  },
  computed: {
    ...mapState('skills', ['skillList', 'loading', 'error']),
    skillCount() {
      
      return this.skillList.length
    },
    categoryCount() {
      const categories = new Set(this.skillList.map(skill => skill.category))
      return categories.size
    },
    topCategory() {
      if (this.skillList.length === 0) return 'No skills'
      
      const categoryCount = this.skillList.reduce((acc, skill) => {
        const category = skill.category || 'Other'
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {})

      const sortedCategories = Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)

      return sortedCategories[0][0]
    }
  },
  methods: {
    saveSkill({ skill, index }) {
      if (index !== -1) {
        // Update existing skill
        this.skillList.splice(index, 1, skill)
      } else {
        // Add new skill
        this.skillList.push(skill)
      }
      this.currentSkill = null
      this.saveToLocalStorage()
    },
    editSkill(skill, index) {
      this.currentSkill = { ...skill, index }
    },
    deleteSkill(index) {
      this.skillList.splice(index, 1)
      this.saveToLocalStorage()
    },
    cancelEdit() {
      this.currentSkill = null
    },
    saveToLocalStorage() {
      localStorage.setItem('skillList', JSON.stringify(this.skillList))
    }
  },
  mounted(){
    console.log(this.skillList,"skillList")
  }
  
}
</script>

<style scoped>
.summary-items {
  padding: 10px;
}

.summary-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-item .label {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.summary-item .value {
  color: #333;
  font-size: 1.2em;
  font-weight: bold;
}
</style> 