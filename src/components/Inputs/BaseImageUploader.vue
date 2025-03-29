<template>
  <div class="base-image-uploader">
    <div
      class="upload-area"
      :class="{
        'is-dragging': isDragging,
        'has-error': error,
        'is-loading': loading
      }"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileChange"
      />

      <div v-if="!preview && !loading" class="upload-content">
        <i class="fas fa-cloud-upload-alt text-4xl mb-4"></i>
        <p class="text-sm mb-2">{{ placeholder }}</p>
        <p class="text-sm mb-2">
          {{ maxSize ? `Max size: ${maxSize}MB` : '' }}
        </p>
      </div>

      <div v-else-if="loading" class="upload-content">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="text-sm mt-2">Uploading...</p>
      </div>

      <div v-else class="preview-container">
        <img :src="preview" :alt="alt" class="preview-image" />
        <button
          class="remove-button"
          @click.stop="removeImage"
          type="button"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <p v-if="error" class="error-message text-sm text-red-500 mt-2">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseImageUploader',
  props: {
    value: {
      type: [File, null],
      default: null
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    maxSize: {
      type: Number,
      default: 5 // 5MB default
    },
    placeholder: {
      type: String,
      default: 'Drag and drop an image or click to upload'
    },
    alt: {
      type: String,
      default: 'Uploaded image'
    }
  },
  data() {
    return {
      isDragging: false,
      loading: false,
      error: null,
      preview: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          console.log(newValue)
          this.createPreview(newValue)
        } else {
          this.preview = null
        }
      }
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.validateAndProcessFile(file)
      }
    },
    handleDrop(event) {
      this.isDragging = false
      const file = event.dataTransfer.files[0]
      if (file) {
        this.validateAndProcessFile(file)
      }
    },
    validateAndProcessFile(file) {
      this.error = null

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.error = 'Please upload an image file'
        return
      }

      // Validate file size
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        this.error = `File size must be less than ${this.maxSize}MB`
        return
      }

      this.$emit('input', file)
      this.createPreview(file)
    },
    createPreview(file) {
      if (!file) return
      if(file instanceof File){
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        reader.readAsDataURL(file)
      }
      else{
        this.preview = file
      }
      
    },
    removeImage() {
      this.$emit('input', null)
      this.preview = null
      this.error = null
      this.$refs.fileInput.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.base-image-uploader {
  width: 100%;
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--bg-color-secondary);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: var(--text-color-secondary);
  background-color: var(--hover-bg);
}

.upload-area.is-dragging {
  border-color: var(--primary-color);
  background-color: var(--primary-color-light);
}

.upload-area.has-error {
  border-color: var(--danger-color);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.remove-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: var(--text-color);
  color: var(--bg-color);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: var(--text-color-secondary);
}

.hidden {
  display: none;
}

.error-message {
  margin-top: 0.5rem;
  color: var(--danger-color);
}

.text-secondary {
  color: var(--text-color-secondary);
}

.text-4xl {
  color: var(--text-color);
}

.text-sm {
  color: var(--text-color);
}
</style> 