<!-- eslint-disable vue/no-mutating-props -->
<template>
  <base-card>
    <h4 slot="header" class="card-title">Edit Profile</h4>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <!-- Basic Information -->
        <div class="col-md-6">
          <base-input
            label="First Name"
            type="text"
            v-model="formData.firstName"
            placeholder="First Name"
          />
        </div>
        <div class="col-md-6">
          <base-input
            label="Last Name"
            type="text"
            v-model="formData.lastName"
            placeholder="Last Name"
          />
        </div>
        <div class="col-md-12">
          <base-input
            label="Professional Title"
            type="text"
            v-model="formData.title"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>

        <!-- Contact Information -->
        <div class="col-md-4">
          <base-input
            label="Email"
            type="email"
            v-model="formData.email"
            placeholder="email@example.com"
          />
        </div>
        <div class="col-md-4">
          <base-input
            label="Phone"
            type="tel"
            v-model="formData.phone"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div class="col-md-4">
          <base-input
            label="Location"
            type="text"
            v-model="formData.location"
            placeholder="City, Country"
          />
        </div>

        <!-- Social Links -->
        <div class="col-md-4">
          <base-input
            label="Website"
            type="url"
            v-model="formData.website"
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div class="col-md-4">
          <base-input
            label="GitHub"
            type="url"
            v-model="formData.github"
            placeholder="https://github.com/username"
          />
        </div>
        <div class="col-md-4">
          <base-input
            label="LinkedIn"
            type="url"
            v-model="formData.linkedin"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <!-- Avatar URL -->
        <div class="col-md-12">
          <base-input
            label="Profile Picture URL"
            type="url"
            v-model="formData.avatar"
            placeholder="https://example.com/your-photo.jpg"
          />
        </div>

        <!-- Availability -->
        <div class="col-md-12">
          <base-input
            label="Availability Status"
            type="text"
            v-model="formData.availability"
            placeholder="e.g. Open to opportunities"
          />
        </div>

        <!-- Bio -->
        <div class="col-md-12">
          <div class="form-group">
            <label>Professional Bio</label>
            <textarea
              class="form-control"
              v-model="formData.bio"
              rows="5"
              placeholder="Write a brief professional bio..."
            ></textarea>
          </div>
        </div>

        <!-- Interests -->
        <div class="col-md-12">
          <div class="form-group">
            <label>Interests (comma-separated)</label>
            <base-input
              type="text"
              v-model="interestsInput"
              placeholder="e.g. Cloud Computing, Web Development, AI"
            />
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12 text-right">
          <base-button type="default" @click="resetForm">
            Reset
          </base-button>
          <base-button type="primary" native-type="submit">
            Save Changes
          </base-button>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'edit-profile-form',
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
        bio: '',
        avatar: '',
        availability: '',
        interests: []
      },
      interestsInput: ''
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapActions('profile', ['updateProfile']),
    handleSubmit() {
      // Convert comma-separated interests to array
      const formDataWithInterests = {
        ...this.formData,
        interests: this.interestsInput.split(',').map(item => item.trim()).filter(item => item)
      };
      
      this.updateProfile(formDataWithInterests);
      this.$notify({
        type: 'success',
        message: 'Profile updated successfully!',
        icon: 'tim-icons icon-check-2'
      });
    },
    resetForm() {
      this.loadProfileData();
      this.$notify({
        type: 'info',
        message: 'Form reset to original values',
        icon: 'tim-icons icon-refresh-01'
      });
    },
    loadProfileData() {
      this.formData = { ...this.profile };
      this.interestsInput = this.profile.interests.join(', ');
    }
  },
  created() {
    this.loadProfileData();
  }
}
</script>

<style scoped>
.form-group textarea {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #2b3553;
  border-radius: 0.4285rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: normal;
  font-size: 0.875rem;
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.form-group textarea:focus {
  border-color: #e14eca;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}
</style>
