<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search across all sections..."
        @input="handleSearch"
      />
      <i class="fas fa-search search-icon"></i>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery && searchResults.length > 0" class="search-results">
      <div v-for="(section, sectionName) in groupedResults" :key="sectionName" class="result-section">
        <h3 class="section-title">{{ formatSectionName(sectionName) }}</h3>
        <div v-for="result in section" :key="result.id" class="result-item" @click="navigateToItem(result, sectionName)">
          <div class="result-content">
            <h4>{{ result.title || result.name || result.degree || result.company }}</h4>
            <p v-if="result.description" class="result-description">{{ truncateText(result.description) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-else-if="searchQuery && !isLoading" class="no-results">
      No results found for "{{ searchQuery }}"
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      skills: state => state.skills.skills,
      certificates: state => state.certificates.certificates,
      education: state => state.education.education,
      experience: state => state.experience.experience,
      projects: state => state.projects.projects,
      profile: state => state.profile.profile,
    }),
    groupedResults() {
      return this.searchResults.reduce((acc, item) => {
        if (!acc[item.section]) {
          acc[item.section] = [];
        }
        acc[item.section].push(item);
        return acc;
      }, {});
    },
  },
  methods: {
    handleSearch() {
      if (!this.searchQuery) {
        this.searchResults = [];
        return;
      }

      this.isLoading = true;
      const query = this.searchQuery.toLowerCase();

      // Search in all sections
      const results = [];

      // Search in skills
      this.skills.forEach(skill => {
        if (this.matchesSearch(skill, query)) {
          results.push({ ...skill, section: 'skills' });
        }
      });

      // Search in certificates
      this.certificates.forEach(cert => {
        if (this.matchesSearch(cert, query)) {
          results.push({ ...cert, section: 'certificates' });
        }
      });

      // Search in education
      this.education.forEach(edu => {
        if (this.matchesSearch(edu, query)) {
          results.push({ ...edu, section: 'education' });
        }
      });

      // Search in experience
      this.experience.forEach(exp => {
        if (this.matchesSearch(exp, query)) {
          results.push({ ...exp, section: 'experience' });
        }
      });

      // Search in projects
      this.projects.forEach(project => {
        if (this.matchesSearch(project, query)) {
          results.push({ ...project, section: 'projects' });
        }
      });

      this.searchResults = results;
      this.isLoading = false;
    },
    matchesSearch(item, query) {
      return Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(query)
      );
    },
    formatSectionName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    truncateText(text, length = 100) {
      if (!text) return '';
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
    navigateToItem(item, section) {
      // Navigate to the specific section and item
      this.$router.push({ 
        name: this.formatSectionName(section),
        params: { id: item.id }
      });
      this.searchQuery = ''; // Clear search after navigation
    },
  },
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
}

.result-section {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.result-section:last-child {
  border-bottom: none;
}

.section-title {
  color: #42b983;
  font-size: 14px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-item {
  padding: 8px;
  margin: 4px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.result-item:hover {
  background-color: #f5f5f5;
}

.result-content h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.result-description {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}

.no-results {
  padding: 16px;
  text-align: center;
  color: #666;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
}
</style> 