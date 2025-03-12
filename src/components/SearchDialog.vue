<template>
  <div class="search-dialog">
    <!-- Dialog/Modal Backdrop -->
    <div v-if="show" class="dialog-backdrop" @click="closeDialog"></div>

    <!-- Dialog Content -->
    <div v-if="show" class="dialog-container" :class="{ 'dialog-active': show }">
      <div class="dialog-header">
        <div class="search-input-wrapper">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search across all sections..."
            @input="handleSearch"
            @keydown.esc="closeDialog"
          />
          <i class="tim-icons icon-zoom-split search-icon"></i>
        </div>
        <button class="close-button" @click="closeDialog">
          <i class="tim-icons icon-simple-remove"></i>
        </button>
      </div>

      <div class="dialog-body">
        <!-- Search Results -->
        <div v-if="searchQuery && hasResults" class="search-results">
          <div v-for="(section, sectionName) in groupedResults" :key="sectionName" class="result-section">
            <h3 class="section-title">
              <i :class="getSectionIcon(sectionName)"></i>
              {{ formatSectionName(sectionName) }}
            </h3>
            <div v-for="result in section" :key="result.id" class="result-item" @click="navigateToItem(result, sectionName)">
              <div class="result-content">
                <h4>{{ result.title || result.name || result.degree || result.company }}</h4>
                <p v-if="result.description" class="result-description">{{ truncateText(result.description) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="isSearching" class="loading-state">
          <i class="tim-icons icon-refresh-02 spin"></i>
          <p>Searching...</p>
        </div>

        <!-- No Results Message -->
        <div v-else-if="searchQuery && !isSearching" class="no-results">
          <i class="tim-icons icon-zoom-split"></i>
          <p>No results found for "{{ searchQuery }}"</p>
          <p class="suggestion">Try different keywords or check your spelling</p>
        </div>

        <!-- Initial State -->
        <div v-else class="initial-state">
          <i class="tim-icons icon-zoom-split"></i>
          <p>Start typing to search</p>
          <div class="search-tips">
            <p>Search across:</p>
            <ul>
              <li><i class="tim-icons icon-settings"></i> Skills</li>
              <li><i class="tim-icons icon-badge"></i> Certificates</li>
              <li><i class="tim-icons icon-book-bookmark"></i> Education</li>
              <li><i class="tim-icons icon-user-run"></i> Experience</li>
              <li><i class="tim-icons icon-components"></i> Projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('search', {
      isSearching: state => state.isSearching,
    }),
    ...mapGetters('search', [
      'groupedResults',
      'hasResults'
    ]),
    searchQuery: {
      get() {
        return this.$store.state.search.searchQuery;
      },
      set(value) {
        this.$store.commit('search/SET_SEARCH_QUERY', value);
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      } else {
        this.clearSearch();
      }
    }
  },
  methods: {
    ...mapActions('search', [
      'performSearch',
      'clearSearch'
    ]),
    async handleSearch() {
      // Clear timeout if it exists
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Set a new timeout to debounce the search
      this.searchTimeout = setTimeout(async () => {
        console.log('Search input:', this.searchQuery);
        if (!this.searchQuery?.trim()) {
          this.clearSearch();
          return;
        }
        try {
          await this.performSearch(this.searchQuery.trim());
        } catch (error) {
          console.error('Error performing search:', error);
          this.$notify({
            type: 'danger',
            message: 'An error occurred while searching. Please try again.'
          });
        }
      }, 300); // 300ms debounce
    },
    formatSectionName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    truncateText(text, length = 100) {
      if (!text) return '';
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
    navigateToItem(item, section) {
      console.log('Navigating to:', { item, section });
      
      // Map section names to route names (all lowercase as defined in routes.js)
      const routeMap = {
        skills: 'skills',
        certificates: 'certificates',
        education: 'education',
        experience: 'experience',
        projects: 'projects',
        profile: 'profile'
      };

      const routeName = routeMap[section.toLowerCase()];
      if (!routeName) {
        console.error('Unknown section:', section);
        return;
      }

      // Create unique identifier for the item
      const itemId = item.id || 
        item.skillName || 
        item.name || 
        item.degree || 
        item.companyName || 
        item.projectName;

      // Create the route object with both query parameters
      const route = {
        name: routeName,
        query: {
          highlight: itemId, // Add highlight parameter
          search: this.searchQuery, // Add search term
          _t: Date.now() // Add timestamp to force route change
        }
      };

      console.log('Navigating to route:', route);
      
      // If we're already on the same route, force a reload of the component
      if (this.$route.name === routeName) {
        // Remove highlight from any previously highlighted elements
        const highlighted = document.querySelectorAll('.search-highlight');
        highlighted.forEach(el => el.classList.remove('search-highlight'));
        
        // Force component reload by changing the timestamp
        this.$router.replace({
          ...this.$route,
          query: {
            ...route.query,
            _t: Date.now()
          }
        }).then(() => {
          this.closeDialog();
        });
      } else {
        // Navigate to new route
        this.$router.push(route)
          .then(() => {
            this.closeDialog();
          })
          .catch(err => {
            console.error('Navigation error:', err);
            this.$router.push({ name: routeName }).then(() => {
              this.closeDialog();
            });
          });
      }
    },
    closeDialog() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.clearSearch();
      this.$emit('close');
    },
    getSectionIcon(section) {
      const icons = {
        skills: 'tim-icons icon-settings',
        certificates: 'tim-icons icon-badge',
        education: 'tim-icons icon-book-bookmark',
        experience: 'tim-icons icon-user-run',
        projects: 'tim-icons icon-components',
      };
      return icons[section] || 'tim-icons icon-paper';
    },
  },
  data() {
    return {
      searchTimeout: null
    };
  },
  beforeDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-dialog {
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .dialog-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transition: opacity 0.2s ease;

    &.dialog-active {
      opacity: 1;
    }
  }

  .dialog-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 16px;

    .search-input-wrapper {
      flex: 1;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #e14eca;
        box-shadow: 0 0 0 2px rgba(225, 78, 202, 0.1);
      }
    }

    .search-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .close-button {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: #666;
      transition: color 0.2s ease;

      &:hover {
        color: #333;
      }
    }
  }

  .dialog-body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  }

  .search-results {
    .result-section {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .section-title {
      color: #e14eca;
      font-size: 14px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;

      i {
        font-size: 16px;
      }
    }

    .result-item {
      padding: 12px;
      margin: 8px 0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid #eee;

      &:hover {
        background-color: #f8f9fa;
        border-color: #e14eca;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
    }

    .result-content {
      h4 {
        margin: 0;
        font-size: 16px;
        color: #333;
      }

      .result-description {
        margin: 4px 0 0;
        font-size: 14px;
        color: #666;
      }
    }
  }

  .loading-state,
  .no-results,
  .initial-state {
    text-align: center;
    padding: 40px 20px;
    color: #666;

    i {
      font-size: 24px;
      margin-bottom: 16px;
      color: #e14eca;

      &.spin {
        animation: spin 1s linear infinite;
      }
    }

    p {
      margin: 8px 0;
    }
  }

  .search-tips {
    margin-top: 24px;
    text-align: left;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;

    p {
      margin-bottom: 8px;
      color: #333;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
        color: #666;

        i {
          font-size: 16px;
          margin: 0;
        }
      }
    }
  }

  .suggestion {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes highlightAnimation {
  0% {
    background-color: rgba(225, 78, 202, 0.2);
    transform: scale(1);
  }
  50% {
    background-color: rgba(225, 78, 202, 0.1);
    transform: scale(1.02);
  }
  100% {
    background-color: transparent;
    transform: scale(1);
  }
}

:global(.search-highlight) {
  animation: highlightAnimation 2s ease-out;
}
</style> 