<template>
  <base-card>
    <h6 slot="header" class="title">{{ isEditing ? 'Edit Certificate' : 'Add Certificate' }}</h6>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Certificate Name"
            v-model="certificateForm.name"
            placeholder="Enter certificate name"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Category"
            v-model="certificateForm.category"
            placeholder="e.g. Web Development, Cloud Computing"
            required
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-input
            label="Issuing Organization"
            v-model="certificateForm.issuer"
            placeholder="Enter issuing organization"
            required
          >
          </base-input>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-datepicker
            label="Issue Date"
            v-model="certificateForm.issueDate"
            required
          >
          </base-datepicker>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pr-md-1">
          <base-datepicker
            label="Expiry Date"
            v-model="certificateForm.expiryDate"
          >
          </base-datepicker>
        </div>
        <div class="col-md-6 pl-md-1">
          <base-input
            label="Credential ID"
            v-model="certificateForm.credentialId"
            placeholder="Enter credential ID"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            label="Credential URL"
            v-model="certificateForm.credentialUrl"
            placeholder="Enter credential verification URL"
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
              v-model="certificateForm.description"
              placeholder="Describe what you learned and the skills acquired"
            ></textarea>
          </base-input>
        </div>
      </div>

      <div slot="footer" class="row">
        <div class="col-md-12">
          <base-button type="primary" native-type="submit" fill>
            {{ isEditing ? 'Update' : 'Add' }}
          </base-button>
          <base-button type="default" fill @click="resetForm" v-if="isEditing">
            Cancel
          </base-button>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'edit-certificate-form',
  props: {
    certificate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      certificateForm: {
        name: '',
        category: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        description: ''
      },
      isEditing: false,
      editIndex: -1
    }
  },
  watch: {
    certificate(newVal) {
      if (newVal) {
        this.certificateForm = { ...newVal }
        this.isEditing = true
        this.editIndex = newVal.index
      } else {
        this.resetForm()
      }
    }
  },
  methods: {
    handleSubmit() {
      const certificate = { ...this.certificateForm }
      this.$emit('save-certificate', { certificate, index: this.editIndex })
      this.resetForm()
    },
    resetForm() {
      this.certificateForm = {
        name: '',
        category: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        description: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 1rem;
}

textarea.form-control {
  padding: 10px;
}

.base-button {
  margin-right: 10px;
}
</style> 