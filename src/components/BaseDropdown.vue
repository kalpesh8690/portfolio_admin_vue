<template>
  <component
    :is="tag"
    class="dropdown"
    :class="{ show: isOpen }"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title-container" :is-open="isOpen">
      <component
        :is="titleTag"
        class="dropdown-toggle btn-rotate"
        :class="titleClasses"
        :aria-expanded="isOpen"
        :aria-label="title || ariaLabel"
        data-toggle="dropdown"
      >
        <slot name="title" :is-open="isOpen">
          <i :class="icon || 'fas fa-chevron-down'"></i>
          <span class="dropdown-title">{{ title }}</span>
        </slot>
      </component>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[
        { show: isOpen },
        { 'dropdown-menu-right': menuOnRight },
        menuClasses,
      ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>
<script>
export default {
  name: "base-dropdown",
  props: {
    tag: {
      type: String,
      default: "div",
      description: "Dropdown html tag (e.g div, ul etc)",
    },
    titleTag: {
      type: String,
      default: "button",
      description: "Dropdown title (toggle) html tag",
    },
    title: {
      type: String,
      description: "Dropdown title",
    },
    icon: {
      type: String,
      description: "Dropdown icon",
    },
    titleClasses: {
      type: [String, Object, Array],
      description: "Title css classes",
    },
    menuClasses: {
      type: [String, Object],
      description: "Menu css classes",
    },
    menuOnRight: {
      type: Boolean,
      description: "Whether menu should appear on the right",
    },
    ariaLabel: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.$emit("change", this.isOpen);
    },
    closeDropDown() {
      this.isOpen = false;
      this.$emit("change", false);
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-color);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-toggle:hover {
  background-color: var(--hover-bg);
  border-color: var(--primary-color);
}

.dropdown-toggle i {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.dropdown-toggle.btn-rotate i {
  transform: rotate(0deg);
}

.dropdown.show .dropdown-toggle.btn-rotate i {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  min-width: 200px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: var(--shadow);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1000;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu-right {
  left: auto;
  right: 0;
}

.dropdown-menu :deep(li) {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu :deep(button) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-menu :deep(button:hover) {
  background-color: var(--hover-bg);
}

.dropdown-menu :deep(.divider) {
  height: 1px;
  background-color: var(--border-color);
  margin: 0.5rem 0;
}
.dropdown-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
}
</style>
