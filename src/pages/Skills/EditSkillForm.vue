<template>
  <div class="icon-picker-container">
    <base-icon-picker
        :model-value="{ icon: skillForm.icon, color: skillForm.color }"
        @update="updateIconAndColor"
        :show="isPickerDialogOpen"
        @update:show="isPickerDialogOpen = $event"
        title="Select Icon and Color"
        @close="closePickerDialog"
      />
      <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Skill' : 'Add Skill' }}</h6>
    <form @submit.prevent="handleSubmit" class="skill-form">
      <div class="form-section">
        <div class="row">
          <div class="col-md-6 pr-md-1">
            <base-input
              label="Skill Name"
              v-model="skillForm.name"
              placeholder="Enter skill name"
              required
            >
            </base-input>
          </div>
          <div class="col-md-6 pl-md-1">
            <base-input
              label="Category"
              v-model="skillForm.category"
              required
            >
              <div class="category-selector">
                <div class="category-header" @click="toggleCategoryDropdown">
                  <div class="selected-category" v-if="skillForm.category">
                    <i :class="getCategoryIcon(skillForm.category)"></i>
                    <span>{{ skillForm.category }}</span>
                  </div>
                  <div class="placeholder" v-else>
                    <i class="fas fa-folder"></i>
                    <span>Select a category</span>
                  </div>
                  <i class="fas fa-chevron-down dropdown-icon" :class="{ 'open': isCategoryDropdownOpen }"></i>
                </div>
                <div class="category-dropdown" v-if="isCategoryDropdownOpen">
                  <div class="category-search">
                    <i class="fas fa-search search-icon"></i>
                    <input 
                      type="text" 
                      v-model="categorySearch" 
                      placeholder="Search categories..."
                      @click.stop
                    >
                  </div>
                  <div class="category-list">
                    <div 
                      v-for="category in filteredCategories" 
                      :key="category.value"
                      class="category-option"
                      :class="{ 'active': skillForm.category === category.value }"
                      @click="selectCategory(category.value)"
                    >
                      <i :class="category.icon"></i>
                      <span>{{ category.label }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="skill-preview" @click="showPickerDialog">
              <div class="preview-content">
                <div class="preview-icon" :style="{ backgroundColor: skillForm.color || '#5e72e4' }">
                  <i :class="skillForm.icon || 'fas fa-plus'"></i>
                </div>
                <div class="preview-info">
                  <span class="preview-label">Click to select icon and color</span>
                  <span class="preview-hint">Current: {{ skillForm.icon ? getIconName(skillForm.icon) : 'No icon selected' }}</span>
                </div>
              </div>
              <i class="fas fa-chevron-right preview-arrow"></i>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label class="form-control-label">Proficiency Level</label>
              <div class="proficiency-slider">
                <input 
                  type="range" 
                  v-model.number="skillForm.proficiency" 
                  min="0" 
                  max="100" 
                  step="5"
                  class="proficiency-input"
                >
                <div class="proficiency-labels">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
                <div class="proficiency-value">
                  {{ skillForm.proficiency }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 pr-md-1">
            <base-input
              label="Years of Experience"
              v-model.number="skillForm.yearsOfExperience"
              type="number"
              placeholder="Enter years of experience"
            >
            </base-input>
          </div>
          <div class="col-md-6 pl-md-1">
            <base-input
              label="Order"
              v-model.number="skillForm.order"
              type="number"
              placeholder="Display order"
              required
            >
            </base-input>
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
            ></textarea>
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
            <div class="form-group">
              <div class="toggle-switch">
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="skillForm.featured"
                  >
                  <span class="slider round"></span>
                </label>
                <span class="toggle-label">Featured Skill</span>
              </div>
        </div>
      </div>
        </div>
      </div>

      <!-- Replace the modal section with BaseIconPicker -->
      

      <div slot="footer" class="form-footer">
          <base-button type="primary" native-type="submit" fill>
            {{ isEditing ? 'Update' : 'Add' }}
          </base-button>
          <base-button type="default" fill @click="resetForm" v-if="isEditing">
            Cancel
          </base-button>
      </div>
    </form>
  </base-card>
</div>
 
</template>

<script>
import BaseIconPicker from '@/components/BaseIconPicker.vue'

export default {
  name: 'EditSkillForm',
  components: {
    BaseIconPicker
  },
  data() {
    return {
      skillForm: {
        name: '',
        category: '',
        proficiency: 50,
        icon: '',
        color: '#5e72e4',
        featured: false,
        order: 0,
        yearsOfExperience: 0,
        description: ''
      },
      isEditing: false,
      editIndex: -1,
      icons: [],
      iconSearch: '',
      selectedCategory: 'all',
      categories: ['all', 'brands', 'regular', 'solid'],
      isLoading: false,
      isCategoryDropdownOpen: false,
      categorySearch: '',
      skillCategories: [
        { value: 'Programming', icon: 'fas fa-code', label: 'Programming' },
        { value: 'Design', icon: 'fas fa-paint-brush', label: 'Design' },
        { value: 'Database', icon: 'fas fa-database', label: 'Database' },
        { value: 'DevOps', icon: 'fas fa-server', label: 'DevOps' },
        { value: 'Mobile', icon: 'fas fa-mobile-alt', label: 'Mobile' },
        { value: 'Cloud', icon: 'fas fa-cloud', label: 'Cloud' },
        { value: 'Security', icon: 'fas fa-shield-alt', label: 'Security' },
        { value: 'Tools', icon: 'fas fa-tools', label: 'Tools' },
        { value: 'Networking', icon: 'fas fa-network-wired', label: 'Networking' },
        { value: 'AI/ML', icon: 'fas fa-robot', label: 'AI/ML' },
        { value: 'Analytics', icon: 'fas fa-chart-line', label: 'Analytics' },
        { value: 'Gaming', icon: 'fas fa-gamepad', label: 'Gaming' },
        { value: 'Photography', icon: 'fas fa-camera', label: 'Photography' },
        { value: 'Video', icon: 'fas fa-video', label: 'Video' },
        { value: 'Languages', icon: 'fas fa-language', label: 'Languages' },
        { value: 'Other', icon: 'fas fa-ellipsis-h', label: 'Other' }
      ],
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
      ],
      iconCache: new Map(), // Cache for loaded icons
      iconLoadingError: false,
      isPickerDialogOpen: false,
      tempIcon: '',
      tempColor: '',
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
    },
    filteredCategories() {
      return this.skillCategories.filter(category => 
        category.label.toLowerCase().includes(this.categorySearch.toLowerCase())
      );
    },
    iconPickerModel: {
      get() {
        return {
          icon: this.skillForm.icon,
          color: this.skillForm.color
        };
      },
      set(value) {
        this.skillForm.icon = value.icon;
        this.skillForm.color = value.color;
      }
    }
  },
  methods: {
    getCategoryIcon(category) {
      const found = this.skillCategories.find(c => c.value === category);
      return found ? found.icon : 'fas fa-folder';
    },
    async loadIcons() {
      if (this.iconCache.size > 0) {
        this.icons = Array.from(this.iconCache.values());
        return;
      }

      this.isLoading = true;
      this.iconLoadingError = false;

      try {
        // Load icons in parallel
        const [solidResponse, regularResponse, brandsResponse] = await Promise.all([
          fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json'),
          fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json'),
          fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json')
        ]);

        const [solidData, regularData, brandsData] = await Promise.all([
          solidResponse.json(),
          regularResponse.json(),
          brandsResponse.json()
        ]);

        // Process icons in chunks for better performance
        const processIcons = (data, prefix) => {
          return Object.entries(data)
            .slice(0, 100) // Limit to first 100 icons for better performance
            .map(([name, data]) => ({
              value: `${prefix} fa-${name}`,
              label: data.label,
              category: prefix.replace('fa', ''),
              searchTerms: `${data.label} ${name}`.toLowerCase()
            }));
        };

        const solidIcons = processIcons(solidData, 'fas');
        const regularIcons = processIcons(regularData, 'far');
        const brandIcons = processIcons(brandsData, 'fab');

        // Combine and sort icons
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
   async  handleSubmit() {
      const skill = { ...this.skillForm }
      if (this.isEditing) {
        // If editing, emit the update event
        this.$emit('save-skill', { skill, index: this.editIndex })
      } else {
        // If creating new, dispatch the createSkill action
        // console.log(skill,"skilldata")
        await this.$store.dispatch('skills/createSkill', skill)
        this.resetForm()
      }
    },
    resetForm() {
      this.skillForm = {
        name: '',
        category: '',
        proficiency: 50,
        icon: '',
        color: '#5e72e4',
        featured: false,
        order: 0,
        yearsOfExperience: 0,
        description: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel-edit')
    },
    editSkill(skill, index) {
      this.skillForm = { ...skill }
      this.isEditing = true
      this.editIndex = index
    },
    validateColor(event) {
      const color = event.target.value;
      // Check if it's a valid hex color
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        this.tempColor = color;
      }
    },
    getIconName(iconClass) {
      if (!iconClass) return '';
      return iconClass.split('fa-')[1].split(' ')[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    getIconCategory(iconClass) {
      if (!iconClass) return '';
      const prefix = iconClass.split(' ')[0];
      const categories = {
        'fas': 'Solid',
        'far': 'Regular',
        'fab': 'Brand'
      };
      return categories[prefix] || 'Solid';
    },
    toggleCategoryDropdown() {
      this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
    },
    selectCategory(category) {
      this.skillForm.category = category;
      this.isCategoryDropdownOpen = false;
      this.categorySearch = '';
    },
    showPickerDialog() {
      this.isPickerDialogOpen = true;
    },
    closePickerDialog() {
      this.isPickerDialogOpen = false;
    },
    applyPickerSelection() {
      this.skillForm.icon = this.tempIcon;
      this.skillForm.color = this.tempColor;
      this.closePickerDialog();
    },
    updateIconAndColor(value) {
      console.log(value,"value")
      this.skillForm.icon = value.icon;
      this.skillForm.color = value.color;
    },
  },
  mounted() {
    this.loadIcons();
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.category-selector')) {
        this.isCategoryDropdownOpen = false;
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
</script>

<style scoped>
.icon-picker-container{
  
}
.skill-form {
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

.form-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.row {
  margin-bottom: 2rem;
}

.row:last-child {
  margin-bottom: 0;
}

.form-control-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: block;
}

.form-group {
  margin-bottom: 1rem;
}

.proficiency-slider {
  padding: 1rem;
  background: var(--input-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.proficiency-input {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: var(--border-color);
  border-radius: 3px;
  outline: none;
  margin: 1rem 0;
}

.proficiency-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.proficiency-input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(94, 114, 228, 0.1);
}

.proficiency-labels {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.proficiency-value {
  text-align: center;
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

textarea.form-control {
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  transition: all 0.3s ease;
}

textarea.form-control:focus {
  border-color: #5e72e4;
  box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.1);
  outline: none;
}

.form-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.base-button {
  min-width: 120px;
}

/* Update existing styles */
.icon-selector,
.color-picker,
.category-selector {
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
}

.icon-header,
.color-header,
.category-header {
  border-bottom: 1px solid var(--border-color);
  padding: 15px;
}

.icon-grid,
.category-list,
.preset-colors {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 12px;
}

.icon-option,
.category-option,
.color-option {
  transition: all 0.2s ease;
}

.icon-option:hover,
.category-option:hover,
.color-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.icon-selector {
  position: relative;
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  max-height: 500px;
  display: flex;
  flex-direction: column;
}

.icon-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
  background: var(--card-bg);
  position: sticky;
  top: 0;
  z-index: 10;
}

.selected-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  padding: 8px;
  background: var(--input-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.icon-preview {
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  border: 2px solid var(--border-color);
}

.icon-preview i {
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.icon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
}

.icon-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon-category {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.icon-search {
  flex: 1;
  position: relative;
  max-width: 300px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.icon-search input {
  padding-left: 35px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  height: 40px;
  width: 100%;
  transition: all 0.3s ease;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 0.875rem;
}

.icon-search input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
}

.icon-categories {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
  background: var(--card-bg);
  position: sticky;
  top: 60px;
  z-index: 9;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--input-bg);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  min-width: 100px;
  justify-content: center;
}

.category-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.category-btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.icon-container {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 300px;
  max-height: 400px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
  padding: 15px;
  height: 100%;
  overflow-y: auto;
}

.icon-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--input-bg);
  gap: 8px;
}

.icon-option:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow);
  border-color: var(--primary-color);
}

.icon-option.selected {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(94, 114, 228, 0.1);
}

.icon-option i {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: all 0.2s ease;
}

.icon-option.selected i {
  color: var(--primary-color);
}

.icon-label {
  font-size: 0.75rem;
  text-align: center;
  color: var(--text-color);
  word-break: break-word;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.icon-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: var(--text-muted);
  padding: 2rem;
}

.icon-loading i {
  font-size: 2.5rem;
  color: var(--primary-color);
  animation: spin 1s linear infinite;
}

.icon-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: #f5365c;
  text-align: center;
  padding: 2rem;
}

.icon-error i {
  font-size: 2.5rem;
}

.no-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: var(--text-muted);
  padding: 2rem;
}

.no-icons i {
  font-size: 2.5rem;
  color: var(--text-muted);
}

/* Scrollbar styling */
.icon-grid::-webkit-scrollbar {
  width: 6px;
}

.icon-grid::-webkit-scrollbar-track {
  background: var(--input-bg);
  border-radius: 3px;
}

.icon-grid::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.icon-grid::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 8px;
    padding: 10px;
  }

  .icon-option {
    padding: 8px;
  }

  .icon-option i {
    font-size: 1.2rem;
  }

  .icon-label {
    font-size: 0.7rem;
  }

  .category-btn {
    min-width: 80px;
    padding: 4px 8px;
  }
}

.color-picker {
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  padding: 15px;
}

.color-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
}

.color-input-group {
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-input {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: var(--card-shadow);
}

.hex-input {
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
  color: var(--text-color);
  background: var(--input-bg);
  transition: all 0.3s ease;
}

.hex-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
  outline: none;
}

.color-categories {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
}

.preset-colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  gap: 8px;
  padding: 8px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: var(--card-shadow);
}

.color-option:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
}

.color-option.active {
  border-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 6px rgba(94, 114, 228, 0.2);
}

.color-option i {
  color: #fff;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* Add a white border for light colors */
.color-option[style*="background-color: #ffffff"],
.color-option[style*="background-color: #fff"] {
  border: 1px solid #e9ecef;
}

.color-preview[style*="background-color: #ffffff"],
.color-preview[style*="background-color: #fff"] {
  border: 1px solid #e9ecef;
}

.color-input::-webkit-color-swatch[style*="background-color: #ffffff"],
.color-input::-webkit-color-swatch[style*="background-color: #fff"] {
  border: 1px solid #e9ecef;
}

.selected-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}

.icon-preview {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  border: 2px solid var(--border-color);
}

.icon-preview i {
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.icon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.icon-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
}

.icon-category {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Add a white border for light colors */
.icon-preview[style*="background-color: #ffffff"],
.icon-preview[style*="background-color: #fff"] {
  border: 1px solid #e9ecef;
}

.icon-preview[style*="background-color: #ffffff"] i,
.icon-preview[style*="background-color: #fff"] i {
  color: #333;
  text-shadow: none;
}

.category-selector {
  position: relative;
  width: 100%;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  background: var(--input-bg);
  transition: all 0.3s ease;
}

.category-header:hover {
  border-color: var(--primary-color);
}

.selected-category,
.placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
}

.placeholder {
  color: var(--text-muted);
}

.selected-category i,
.placeholder i {
  font-size: 1rem;
  color: var(--primary-color);
}

.dropdown-icon {
  font-size: 0.8rem;
  color: #666;
  transition: transform 0.3s ease;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.category-search {
  position: relative;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
}

.category-search input {
  width: 100%;
  padding: 8px 8px 8px 32px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.category-search input:focus {
  border-color: #5e72e4;
  box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.1);
  outline: none;
}

.search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 0.9rem;
}

.category-list {
  max-height: 250px;
  overflow-y: auto;
}

.category-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-option:hover {
  background: #f8f9fe;
}

.category-option.active {
  background: #f8f9fe;
  color: #5e72e4;
}

.category-option i {
  font-size: 1rem;
  width: 16px;
  text-align: center;
  color: #5e72e4;
}

.category-option.active i {
  color: #5e72e4;
}

/* Scrollbar styling */
.category-list::-webkit-scrollbar {
  width: 6px;
}

.category-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.category-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.category-list::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.skill-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-preview:hover {
  border-color: var(--primary-color);
  background: var(--hover-bg);
}

.preview-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.preview-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  border: 2px solid var(--border-color);
}

.preview-icon i {
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
}

.preview-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.preview-arrow {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: transform 0.3s ease;
}

.skill-preview:hover .preview-arrow {
  transform: translateX(4px);
}

.picker-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 600px;
  overflow: hidden;
}

.picker-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--input-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.selected-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.preview-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  border: 2px solid var(--border-color);
}

.preview-icon i {
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.preview-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.preview-color {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-family: monospace;
}

.preview-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.color-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  min-width: 200px;
}

.icon-search {
  flex: 1;
  position: relative;
}

.picker-content {
  display: flex;
  gap: 1rem;
  flex: 1;
  overflow: hidden;
  min-height: 400px;
}

.icon-categories {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--input-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  width: 120px;
  overflow-y: auto;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--card-bg);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  text-align: left;
}

.category-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.category-btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.icon-grid-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  overflow-y: auto;
  flex: 1;
}

.icon-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--card-bg);
}

.icon-option:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow);
  border-color: var(--primary-color);
}

.icon-option.selected {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(94, 114, 228, 0.1);
}

.icon-option .icon-preview {
  width: 40px;
  height: 40px;
}

.icon-option .icon-label {
  font-size: 0.75rem;
  text-align: center;
  color: var(--text-color);
  word-break: break-word;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.color-presets {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--input-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  width: 120px;
  overflow-y: auto;
}

.preset-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preset-colors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: var(--card-shadow);
}

.color-option:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
}

.color-option.active {
  border-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 6px rgba(94, 114, 228, 0.2);
}

.color-option i {
  color: #fff;
  font-size: 0.75rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .picker-container {
    padding: 0.5rem;
  }

  .picker-header {
    padding: 0.75rem;
  }

  .preview-controls {
    flex-direction: column;
  }

  .color-input-group {
    width: 100%;
  }

  .picker-content {
    flex-direction: column;
  }

  .icon-categories,
  .color-presets {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 0.5rem;
  }

  .category-btn {
    white-space: nowrap;
  }

  .preset-colors {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Add a white border for light colors */
.color-option[style*="background-color: #ffffff"],
.color-option[style*="background-color: #fff"],
.preview-icon[style*="background-color: #ffffff"],
.preview-icon[style*="background-color: #fff"] {
  border: 1px solid var(--border-color);
}

.color-option[style*="background-color: #ffffff"] i,
.color-option[style*="background-color: #fff"] i,
.preview-icon[style*="background-color: #ffffff"] i,
.preview-icon[style*="background-color: #fff"] i {
  color: var(--text-color);
  text-shadow: none;
}
</style>

 