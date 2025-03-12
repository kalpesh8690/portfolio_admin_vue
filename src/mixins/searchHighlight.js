export default {
  props: {
    searchTerm: {
      type: String,
      default: ''
    },
    highlightId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      highlightedElement: null,
      highlightTimeout: null
    };
  },

  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        if (query.highlight || query.search) {
          this.$nextTick(() => {
            this.handleSearchHighlight(query.highlight, query.search);
          });
        }
      }
    }
  },

  methods: {
    handleSearchHighlight(highlightId, searchTerm) {
      // Clear any existing timeouts
      if (this.highlightTimeout) {
        clearTimeout(this.highlightTimeout);
      }

      // Remove previous highlight if exists
      if (this.highlightedElement) {
        this.highlightedElement.classList.remove('search-highlight');
        // Force a reflow to restart the animation
        void this.highlightedElement.offsetWidth;
      }

      if (!highlightId && !searchTerm) return;

      // Find element to highlight
      let element = null;

      if (highlightId) {
        // Try different selectors to find the element
        const selectors = [
          `#${highlightId}`,
          `[data-id="${highlightId}"]`,
          `[data-name="${highlightId}"]`,
          `[title="${highlightId}"]`,
          `.item-title:contains("${highlightId}")`,
          // Add more selectors as needed
        ];

        for (const selector of selectors) {
          element = document.querySelector(selector);
          if (element) break;
        }
      }

      // If no element found by ID, try searching by content
      if (!element && searchTerm) {
        const elements = document.querySelectorAll('.searchable-item');
        for (const el of elements) {
          if (el.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            element = el;
            break;
          }
        }
      }

      if (element) {
        // Store reference to highlighted element
        this.highlightedElement = element;

        // Scroll element into view
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });

        // Add highlight class after a small delay to ensure scroll is complete
        setTimeout(() => {
          // Force a reflow to ensure animation plays
          void element.offsetWidth;
          element.classList.add('search-highlight');
          
          // Remove highlight after animation
          this.highlightTimeout = setTimeout(() => {
            element.classList.remove('search-highlight');
          }, 2000);
        }, 100);
      }
    }
  },

  beforeDestroy() {
    // Clean up any remaining timeouts
    if (this.highlightTimeout) {
      clearTimeout(this.highlightTimeout);
    }
  }
}; 