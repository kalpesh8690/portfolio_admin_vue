<template>
  <transition name="fade">
    <div v-if="show" class="icon-picker-modal">
      <div class="modal-backdrop" @click="handleClose"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button class="close-button" @click="handleClose">
            <i class="tim-icons icon-simple-remove"></i>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'IconPickerModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false);
      this.$emit('close');
    }
  },
  watch: {
    show(val) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
}
</script>

<style scoped>
.icon-picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9998;
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  width: 90vw;
  max-width: 1200px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  z-index: 9999;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: #ffffff;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #212529;
  background: #f8f9fa;
}

.modal-body {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

</style> 