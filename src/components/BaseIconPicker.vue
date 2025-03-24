<template>
  <icon-picker-modal 
    :show="show"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
    :title="title"
  >
    <div class="icon-picker-container">
      <div class="preview-section">
        <div class="preview-card">
          <div class="icon-preview" :style="{ backgroundColor: modelValue?.color || '#5e72e4' }">
            <i :class="[modelValue?.icon || 'fas fa-plus', 'preview-icon']"></i>
          </div>
          <div class="preview-info">
            <span class="preview-name">
              {{ modelValue?.icon ? getIconName(modelValue.icon) : 'Select an icon' }}
            </span>
            <span class="preview-color">
              {{ modelValue?.color || '#5e72e4' }}
            </span>
          </div>
        </div>
        <div class="controls-section">
          <div class="color-controls">
            <input
              type="color"
              v-model="tempColor"
              class="color-picker"
            >
            <input
              type="text"
              v-model="tempColor"
              placeholder="#000000"
              class="color-input"
              @input="validateColor"
            >
          </div>
          <div class="search-control">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              v-model="iconSearch" 
              placeholder="Search icons..."
              class="search-input"
            >
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="categories-sidebar">
          <button 
            v-for="category in categories" 
            :key="category"
            class="category-button"
            :class="{ 'category-button-active': selectedCategory === category }"
            @click="selectedCategory = category"
          >
            <i :class="getCategoryIcon(category)"></i>
            {{ category }}
          </button>
        </div>

        <div class="icons-grid-container">
          <div v-if="isLoading" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading icons...</span>
          </div>
          <div v-else-if="iconLoadingError" class="error-state">
            <i class="fas fa-exclamation-circle"></i>
            <span>Failed to load icons. Using fallback icons.</span>
          </div>
          <div class="icons-grid" v-else-if="filteredIcons.length">
            <div 
              v-for="icon in filteredIcons" 
              :key="icon.value" 
              class="icon-card"
              :class="{ 'icon-card-active': tempIcon === icon.value }"
              @click="selectIcon(icon.value)"
              @keydown.enter="selectIcon(icon.value)"
              @keydown.space="selectIcon(icon.value)"
              tabindex="0"
              role="button"
              :aria-label="icon.label"
              :aria-selected="tempIcon === icon.value"
              :data-icon-value="icon.value"
            >
              <div class="icon-display" :style="{ backgroundColor: tempColor || '#5e72e4' }">
                <i :class="[icon.value, 'icon']"></i>
              </div>
              <span class="icon-label">{{ icon.label }}</span>
            </div>
          </div>
          <div v-else class="empty-state">
            <i class="fas fa-search"></i>
            <span>No icons found</span>
          </div>
        </div>

        <div class="colors-sidebar">
          <div class="color-section">
            <div class="color-section-title">Theme Colors</div>
            <div class="color-grid">
              <button
                v-for="color in themeColors"
                :key="color"
                class="color-button"
                :class="{ 'color-button-active': tempColor === color }"
                :style="{ backgroundColor: color }"
                @click="handleColorSelect(color)"
              >
                <i class="fas fa-check" v-if="tempColor === color"></i>
              </button>
            </div>
          </div>
          <div class="color-section">
            <div class="color-section-title">Basic Colors</div>
            <div class="color-grid">
              <button
                v-for="color in basicColors"
                :key="color"
                class="color-button"
                :class="{ 'color-button-active': tempColor === color }"
                :style="{ backgroundColor: color }"
                @click="handleColorSelect(color)"
              >
                <i class="fas fa-check" v-if="tempColor === color"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <base-button type="warning" @click="handleClose">Cancel</base-button>
      <base-button type="primary" @click="handleApply">Apply</base-button>
    </template>
  </icon-picker-modal>
</template>

<script>
import IconPickerModal from '@/components/IconPickerModal.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'base-icon-picker',
  components: {
    IconPickerModal,
    BaseButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => ({
        icon: '',
        color: '#5e72e4'
      }),
      validator: (value) => {
        return typeof value === 'object' && 
               'icon' in value && 
               'color' in value
      }
    },
    title: {
      type: String,
      default: 'Select Icon and Color'
    }
  },
  data() {
    return {
      icons: [],
      iconSearch: '',
      selectedCategory: 'all',
      categories: ['all', 'brands', 'regular', 'solid'],
      isLoading: false,
      iconLoadingError: false,
      iconCache: new Map(),
      tempIcon: '',
      tempColor: '',
      themeColors: [
        '#5e72e4', // Primary
        '#2dce89', // Success
        '#ff8d72', // Warning
        '#f5365c', // Danger
        '#11cdef', // Info
        '#8965e0', // Purple
        '#fb6340', // Orange
        '#2bffc6', // Teal
        '#ffd600'  // Yellow
      ],
      basicColors: [
        '#8898aa', // Gray
        '#172b4d', // Dark
        '#ffffff', // White
        '#000000'  // Black
      ]
    }
  },
  computed: {
    filteredIcons() {
      if (!this.iconSearch) {
        return this.selectedCategory === 'all' 
          ? this.icons 
          : this.icons.filter(icon => icon.category === this.selectedCategory);
      }

      const searchTerm = this.iconSearch.toLowerCase();
      return this.icons.filter(icon => 
        icon.searchTerms.includes(searchTerm) &&
        (this.selectedCategory === 'all' || icon.category === this.selectedCategory)
      );
    }
  },
  methods: {
    getCategoryIcon(category) {
      const icons = {
        'all': 'fas fa-th-large',
        'brands': 'fab fa-github',
        'regular': 'far fa-user',
        'solid': 'fas fa-user'
      };
      return icons[category] || 'fas fa-folder';
    },
    async loadIcons() {
      if (this.iconCache.size > 0) {
        this.icons = Array.from(this.iconCache.values());
        return;
      }

      this.isLoading = true;
      this.iconLoadingError = false;

      try {
        // Fetch icons from Font Awesome's metadata
        const response = await fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json');
        if (!response.ok) {
          throw new Error('Failed to fetch icons');
        }
        const data = await response.json();

        const processIcons = (prefix) => {
          return Object.entries(data)
            .filter(([, iconData]) => {
              // Filter out icons that don't support the current style
              if (prefix === 'far' && !iconData.styles.includes('regular')) return false;
              if (prefix === 'fab' && !iconData.styles.includes('brands')) return false;
              if (prefix === 'fas' && !iconData.styles.includes('solid')) return false;
              return true;
            })
            .map(([name, iconData]) => ({
              value: `${prefix} fa-${name}`,
              label: iconData.label,
              category: prefix.replace('fa', ''),
              searchTerms: [
                iconData.label,
                name,
                ...(iconData.aliases || []),
                ...(iconData.search?.terms || [])
              ].join(' ').toLowerCase()
            }));
        };

        // Process icons for each style
        const solidIcons = processIcons('fas');
        const regularIcons = processIcons('far');
        const brandIcons = processIcons('fab');

        // Combine all icons and sort alphabetically
        this.icons = [...solidIcons, ...regularIcons, ...brandIcons]
          .sort((a, b) => a.label.localeCompare(b.label));

        // Cache the icons
        this.icons.forEach(icon => this.iconCache.set(icon.value, icon));

      } catch (error) {
        console.error('Error loading icons:', error);
        this.iconLoadingError = true;
        this.loadFallbackIcons();
      } finally {
        this.isLoading = false;
      }
    },
    loadFallbackIcons() {
      const fallbackIcons = [
        { value: 'fas fa-code', label: 'Code', category: 'solid', searchTerms: 'code programming' },
        { value: 'fas fa-paint-brush', label: 'Design', category: 'solid', searchTerms: 'design art' },
        { value: 'fas fa-database', label: 'Database', category: 'solid', searchTerms: 'database storage' },
        { value: 'fas fa-server', label: 'Server', category: 'solid', searchTerms: 'server hosting' },
        { value: 'fas fa-mobile-alt', label: 'Mobile', category: 'solid', searchTerms: 'mobile app' },
        { value: 'fas fa-cloud', label: 'Cloud', category: 'solid', searchTerms: 'cloud hosting' },
        { value: 'fas fa-shield-alt', label: 'Security', category: 'solid', searchTerms: 'security protection' },
        { value: 'fas fa-tools', label: 'Tools', category: 'solid', searchTerms: 'tools utilities' },
        { value: 'fas fa-network-wired', label: 'Networking', category: 'solid', searchTerms: 'network connection' },
        { value: 'fas fa-robot', label: 'AI/ML', category: 'solid', searchTerms: 'ai machine learning' },
        { value: 'fas fa-chart-line', label: 'Analytics', category: 'solid', searchTerms: 'analytics data' },
        { value: 'fas fa-gamepad', label: 'Gaming', category: 'solid', searchTerms: 'gaming game' },
        { value: 'fas fa-camera', label: 'Photography', category: 'solid', searchTerms: 'photo camera' },
        { value: 'fas fa-video', label: 'Video', category: 'solid', searchTerms: 'video recording' },
        { value: 'fas fa-language', label: 'Languages', category: 'solid', searchTerms: 'language translation' }
      ];

      this.icons = fallbackIcons;
      fallbackIcons.forEach(icon => this.iconCache.set(icon.value, icon));
    },
    validateColor(event) {
      const color = event.target.value;
      // Allow both 3-digit and 6-digit hex colors
      if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
        // Convert 3-digit hex to 6-digit hex
        this.tempColor = color.length === 4 
          ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
          : color;
        // Emit preview update
        this.$emit('preview', {
          icon: this.tempIcon,
          color: this.tempColor
        });
        // Emit v-model update
        this.$emit('update:modelValue', {
          ...this.modelValue,
          color: this.tempColor
        });
      }
    },
    handleColorSelect(color) {
      this.tempColor = color;
      // Emit preview update
      this.$emit('preview', {
        icon: this.tempIcon,
        color: this.tempColor
      });
      // Emit v-model update
      this.$emit('update:modelValue', {
        ...this.modelValue,
        color: this.tempColor
      });
    },
    getIconName(iconClass) {
      if (!iconClass) return '';
      const parts = iconClass.split('fa-');
      if (parts.length < 2) return '';
      return parts[1].split(' ')[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    handleClose() {
      this.$emit('close');
      this.$emit('update:show', false);
      this.tempIcon = this.modelValue?.icon || '';
      this.tempColor = this.modelValue?.color || '#5e72e4';
    },
    handleApply() {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        icon: this.tempIcon,
        color: this.tempColor
      });
      this.handleClose();
    },
    selectIcon(iconValue) {
      this.tempIcon = iconValue;
      // Update preview immediately
      this.$emit('preview', {
        icon: iconValue,
        color: this.tempColor
      });
      // Emit update for v-model
      this.$emit('update:modelValue', {
        ...this.modelValue,
        icon: iconValue,
        color: this.tempColor
      });
      // Focus the selected icon for keyboard navigation
      this.$nextTick(() => {
        const selectedIcon = document.querySelector(`[data-icon-value="${iconValue}"]`);
        if (selectedIcon) {
          selectedIcon.focus();
        }
      });
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.tempIcon = this.modelValue?.icon || '';
        this.tempColor = this.modelValue?.color || '#5e72e4';
        this.loadIcons();
      }
    }
  },
  created() {
    this.tempIcon = this.modelValue?.icon || '';
    this.tempColor = this.modelValue?.color || '#5e72e4';
    this.loadIcons();
  }
}
</script>

<style scoped>
.icon-picker-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  /* overflow: hidden; */
  padding: .5rem;
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.preview-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.preview-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.icon-preview {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
}

.preview-icon {
  font-size: 1.75rem;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
}

.preview-color {
  font-size: 0.875rem;
  color: #6c757d;
  font-family: monospace;
}

.controls-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.color-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  min-width: 200px;
}

.color-picker {
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.color-picker:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.color-input {
  flex: 1;
  height: 48px;
  padding: 0 1rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 0.875rem;
  color: #6c757d;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.color-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
  outline: none;
}

.search-control {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 1rem 0 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 0.875rem;
  color: #6c757d;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
  outline: none;
}

.main-content {
  display: flex;
  gap: 1rem;
  flex: 1;
  overflow: hidden;
  min-height: 400px;
}

.categories-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  min-width: 200px;
  max-width: 250px;
  height: fit-content;
}

.category-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: #ffffff;
  border-radius: 8px;
  color: #495057;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.category-button i {
  font-size: 1.125rem;
  color: #6c757d;
  transition: color 0.2s ease;
}

.category-button:hover {
  background: #f1f3f5;
  transform: translateX(4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.category-button:hover i {
  color: #5e72e4;
}

.category-button-active {
  background: #5e72e4;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(94, 114, 228, 0.2);
}

.category-button-active i {
  color: #ffffff;
}

.category-button-active:hover {
  background: #4c5fd1;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(94, 114, 228, 0.3);
}

.icons-grid-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
  min-height: 300px;
  max-height: 300px;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  padding: 2rem;
  color: #6c757d;
}

.loading-state i,
.error-state i,
.empty-state i {
  font-size: 2.5rem;
}

.error-state {
  color: var(--error-color);
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ffffff;
}

.icon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #5e72e4;
}

.icon-card-active {
  background: #f8f9fa;
  border-color: #5e72e4;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.icon-display {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
}

.icon {
  font-size: 1.5rem;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-label {
  font-size: 0.875rem;
  text-align: center;
  color: #212529;
  line-height: 1.4;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.colors-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e9ecef;
  width: 160px;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.color-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #212529;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.color-button {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.color-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.color-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.color-button:hover::before {
  opacity: 1;
}

.color-button-active {
  border-color: #5e72e4;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(94, 114, 228, 0.2);
}

.color-button-active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.color-button i {
  color: #ffffff;
  font-size: 0.875rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

</style> 