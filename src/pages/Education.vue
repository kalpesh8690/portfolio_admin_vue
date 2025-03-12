<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <edit-education-form
          ref="educationForm"
          @save-education="saveEducation"
          @cancel-edit="cancelEdit"
        ></edit-education-form>
        <education-list
          :education-list="educationList"
          @edit-education="editEducation"
          @delete-education="deleteEducation"
        ></education-list>
      </div>
      <div class="col-md-4">
        <base-card>
          <template slot="header">
            <h4 class="card-title">Education Summary</h4>
          </template>
          <div class="education-summary">
            <div class="summary-item">
              <i class="tim-icons icon-book-bookmark text-primary"></i>
              <h3>{{ educationCount }}</h3>
              <p>Education Entries</p>
            </div>
            <div class="summary-item" v-if="latestEducation">
              <h5>Latest Education</h5>
              <p class="institution">{{ latestEducation.institution }}</p>
              <p class="degree">{{ latestEducation.degree }}</p>
            </div>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import EditEducationForm from './Education/EditEducationForm.vue';
import EducationList from './Education/EducationList.vue';

export default {
  name: 'education-page',
  components: {
    EditEducationForm,
    EducationList
  },
  data() {
    return {
      educationList: []
    };
  },
  computed: {
    educationCount() {
      return this.educationList.length;
    },
    latestEducation() {
      return this.educationList[0];
    }
  },
  methods: {
    saveEducation({ education, index }) {
      if (index !== -1) {
        // Update existing education
        this.educationList[index] = education;
      } else {
        // Add new education at the beginning of the list
        this.educationList.unshift(education);
      }
      this.saveToLocalStorage();
    },
    editEducation(education, index) {
      this.$refs.educationForm.editEducation(education, index);
    },
    deleteEducation(index) {
      this.educationList.splice(index, 1);
      this.saveToLocalStorage();
    },
    cancelEdit() {
      // Handle cancel if needed
    },
    saveToLocalStorage() {
      localStorage.setItem('educationList', JSON.stringify(this.educationList));
    }
  },
  created() {
    // Load education data from localStorage
    const savedEducation = localStorage.getItem('educationList');
    if (savedEducation) {
      this.educationList = JSON.parse(savedEducation);
    }
  },
  watch: {
    // Watch for changes in localStorage
    '$root.$data.educationList': {
      handler(newValue) {
        this.educationList = newValue;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.education-summary {
  padding: 20px;
}

.summary-item {
  text-align: center;
  margin-bottom: 20px;
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

.institution {
  font-weight: 600;
  color: #333;
  margin: 5px 0;
}

.degree {
  color: #666;
}
</style> 