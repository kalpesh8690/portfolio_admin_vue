<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <edit-experience-form
          ref="experienceForm"
          @save-experience="saveExperience"
          @cancel-edit="cancelEdit"
        />
        <experience-list
          :experience-list="experienceList"
          @edit-experience="editExperience"
          @delete-experience="deleteExperience"
        />
      </div>
      <div class="col-md-4">
        <base-card>
          <template slot="header">
            <h4 class="card-title">Experience Summary</h4>
          </template>
          <div class="experience-summary">
            <div class="summary-item">
              <i class="tim-icons icon-briefcase-24 text-primary"></i>
              <h3>{{ experienceCount }}</h3>
              <p>Work Experience Entries</p>
            </div>
            <div class="summary-item" v-if="latestExperience">
              <h5>Current/Latest Position</h5>
              <p class="position">{{ latestExperience.position }}</p>
              <p class="company">{{ latestExperience.companyName }}</p>
              <p class="duration" v-if="experienceDuration">{{ experienceDuration }}</p>
            </div>
            <div class="summary-item" v-if="totalYearsExperience">
              <h5>Total Experience</h5>
              <p class="total-years">{{ totalYearsExperience }}</p>
            </div>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import EditExperienceForm from './Experience/EditExperienceForm.vue';
import ExperienceList from './Experience/ExperienceList.vue';

export default {
  name: 'experience-page',
  components: {
    EditExperienceForm,
    ExperienceList
  },
  data() {
    return {
      experienceList: []
    };
  },
  computed: {
    experienceCount() {
      return this.experienceList.length;
    },
    latestExperience() {
      return this.experienceList[0];
    },
    experienceDuration() {
      if (!this.latestExperience) return '';
      const start = new Date(this.latestExperience.startDate);
      const end = this.latestExperience.endDate ? new Date(this.latestExperience.endDate) : new Date();
      const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      } else if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      }
    },
    totalYearsExperience() {
      if (this.experienceList.length === 0) return '';
      
      let totalMonths = 0;
      this.experienceList.forEach(exp => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : new Date();
        totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      });
      
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      
      if (years === 0) {
        return `${months} month${months !== 1 ? 's' : ''}`;
      } else if (months === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
      }
    }
  },
  methods: {
    saveExperience({ experience, index }) {
      if (index !== -1) {
        // Update existing experience
        this.experienceList[index] = experience;
      } else {
        // Add new experience at the beginning of the list
        this.experienceList.unshift(experience);
      }
      this.saveToLocalStorage();
    },
    editExperience(experience, index) {
      this.$refs.experienceForm.editExperience(experience, index);
    },
    deleteExperience(index) {
      this.experienceList.splice(index, 1);
      this.saveToLocalStorage();
    },
    cancelEdit() {
      // Handle cancel if needed
    },
    saveToLocalStorage() {
      localStorage.setItem('experienceList', JSON.stringify(this.experienceList));
    }
  },
  created() {
    const savedExperience = localStorage.getItem('experienceList');
    if (savedExperience) {
      this.experienceList = JSON.parse(savedExperience);
    }
  }
};
</script>

<style scoped>
.experience-summary {
  padding: 20px;
}

.summary-item {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.summary-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.summary-item i {
  font-size: 2rem;
  margin-bottom: 10px;
}

.summary-item h3 {
  color: #333;
  margin: 10px 0;
}

.summary-item h5 {
  color: #666;
  margin-bottom: 10px;
}

.position {
  font-weight: 600;
  color: #333;
  margin: 5px 0;
}

.company {
  color: #666;
  margin: 5px 0;
}

.duration {
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

.total-years {
  color: #333;
  font-size: 1.2em;
  font-weight: 600;
}
</style> 