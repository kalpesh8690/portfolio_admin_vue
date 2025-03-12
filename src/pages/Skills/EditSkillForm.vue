<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Skill' : 'Add Skill' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Skill Name"
            v-model="skillForm.skillName"
            placeholder="Enter skill name"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Category"
            v-model="skillForm.category"
            placeholder="e.g. Programming, Design, Tools"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <label class="form-control-label">Proficiency Level</label>
          <div class="proficiency-slider">
            <input 
              type="range" 
              v-model.number="skillForm.proficiency" 
              min="1" 
              max="5" 
              class="form-control"
            >
            <div class="proficiency-labels">
              <span>Beginner</span>
              <span>Advanced</span>
            </div>
            <div class="proficiency-value">Level: {{ skillForm.proficiency }}/5</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="Description">
            <textarea
              rows="3"
              class="form-control"
              v-model="skillForm.description"
              placeholder="Describe your experience with this skill"
              required
            ></textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Related Projects/Experience"
            v-model="skillForm.relatedProjects"
            placeholder="List projects or experiences where you've used this skill"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Certifications/Achievements"
            v-model="skillForm.certifications"
            placeholder="Any certifications or achievements related to this skill"
          >
          </base-input>
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
export default {
  name: 'edit-skill-form',
  data() {
    return {
      skillForm: {
        skillName: '',
        category: '',
        proficiency: 3,
        description: '',
        relatedProjects: '',
        certifications: ''
      },
      isEditing: false,
      editIndex: -1
    }
  },
  methods: {
    handleSubmit() {
      const skill = { ...this.skillForm }
      this.$emit('save-skill', { skill, index: this.editIndex })
      this.resetForm()
    },
    resetForm() {
      this.skillForm = {
        skillName: '',
        category: '',
        proficiency: 3,
        description: '',
        relatedProjects: '',
        certifications: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel-edit')
    },
    editSkill(skill, index) {
      this.skillForm = { ...skill }
      this.isEditing = true
      this.editIndex = index
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 1rem;
}

textarea.form-control {
  padding: 10px;
}

.base-button {
  margin-right: 10px;
}

.proficiency-slider {
  padding: 10px 0;
}

.proficiency-slider input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

.proficiency-labels {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9em;
}

.proficiency-value {
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
}
</style>

 