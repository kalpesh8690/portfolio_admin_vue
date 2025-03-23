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
            class="form-input"
          />
        </div>
        <div class="col-md-6">
          <base-input
            label="Email"
            type="email"
            disabled
            v-model="formData.email"
            placeholder="email@example.com"
            class="form-input"
          />
        </div>
        <div class="col-md-6">
          <base-input
            label="Mobile"
            type="tel"
            disabled
            v-model="formData.mobile"
            placeholder="Mobile Number"
            class="form-input"
          />
        </div>
        <div class="col-md-6">
          <base-input
            label="Profile Picture URL"
            type="url"
            disabled
            v-model="formData.profile"
            placeholder="Profile Picture URL"
            class="form-input"
          />
        </div>

        <!-- Professional Information -->
        <div class="col-md-6">
          <base-input
            label="Position"
            type="text"
            v-model="formData.userDetails.position"
            placeholder="e.g. Senior Developer"
            class="form-input"
          />
        </div>
        <div class="col-md-6">
          <base-input
            label="Company Name"
            type="text"
            v-model="formData.userDetails.companyName"
            placeholder="Company Name"
            class="form-input"
          />
        </div>

        <!-- Address Information -->
        <div class="col-md-12">
          <base-input
            label="Address"
            type="text"
            v-model="formData.userDetails.address"
            placeholder="Street Address"
            class="form-input"
          />
        </div>
        <div class="col-md-3">
          <base-input
            label="City"
            type="text"
            v-model="formData.userDetails.city"
            placeholder="City"
            class="form-input"
          />
        </div>
        <div class="col-md-3">
          <base-input
            label="State"
            type="text"
            v-model="formData.userDetails.state"
            placeholder="State"
            class="form-input"
          />
        </div>
        <div class="col-md-3">
          <base-input
            label="Country"
            type="text"
            v-model="formData.userDetails.country"
            placeholder="Country"
            class="form-input"
          />
        </div>
        <div class="col-md-3">
          <base-input
            label="Pincode"
            type="text"
            v-model="formData.userDetails.pincode"
            placeholder="Pincode"
            class="form-input"
          />
        </div>

        <!-- Social Links -->
        <div class="col-md-12">
          <div class="card social-links-card">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div class="social-icon-wrapper">
                    <i class="tim-icons icon-share-alt"></i>
                  </div>
                  <div class="ml-3">
                    <h5 class="mb-0">Social Links</h5>
                    <small class="text-muted">Add your social media profiles</small>
                  </div>
                </div>
                <base-button type="info" size="sm" @click="addSocialLink" class="add-link-btn">
                  <i class="tim-icons icon-simple-add"></i>
                  <span>Add Social Link</span>
                </base-button>
              </div>
            </div>
            <div class="card-body">
              <div v-if="formData.userDetails.socialLinks.length === 0" class="empty-state">
                <div class="empty-state-icon">
                  <i class="tim-icons icon-share-alt"></i>
                </div>
                <h6>No Social Links</h6>
                <p class="text-muted">Start by adding your social media profiles</p>
                <base-button type="info" size="sm" @click="addSocialLink" class="add-link-btn">
                  <i class="tim-icons icon-simple-add"></i>
                  <span>Add Your First Link</span>
                </base-button>
              </div>
              <div v-else class="social-links-list">
                <div v-for="(link, index) in formData.userDetails.socialLinks" :key="index" class="social-link-item">
                  <div class="social-link-content">
                    <div class="row align-items-center">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="form-control-label">Platform</label>
                          <div class="platform-select-wrapper">
                            <select class="form-control platform-select" v-model="link.platform">
                              <option value="" disabled>Select Platform</option>
                              <option v-for="platform in socialPlatforms" :key="platform.value" :value="platform.value">
                                {{ platform.label }}
                              </option>
                              <option value="other">Other Platform</option>
                            </select>
                            <i class="tim-icons icon-minimal-down select-arrow"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <base-input
                          v-if="link.platform === 'other'"
                          label="Custom Platform"
                          type="text"
                          v-model="link.customPlatform"
                          placeholder="Enter platform name"
                          class="custom-platform-input"
                        />
                      </div>
                      <div class="col-md-5">
                        <base-input
                          label="URL"
                          type="url"
                          v-model="link.url"
                          :placeholder="getPlaceholder(link.platform)"
                          class="url-input"
                        />
                      </div>
                      <div class="col-md-1">
                        <base-button type="danger" size="sm" @click="removeSocialLink(index)" class="btn-icon">
                          <i class="tim-icons icon-simple-remove"></i>
                        </base-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- About -->
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-control-label">About</label>
            <textarea
              class="form-control about-textarea"
              v-model="formData.userDetails.about"
              rows="5"
              placeholder="Write about yourself..."
            ></textarea>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12 text-right">
          <base-button type="default" @click="resetForm" class="mr-2">
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'edit-profile-form',
  data() {
    return {
      formData: {
        firstName: '',
        email: '',
        mobile: '',
        profile: '',
        userDetails: {
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          about: '',
          socialLinks: [],
          position: '',
          companyName: ''
        }
      },
      socialPlatforms: [
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'github', label: 'GitHub' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'youtube', label: 'YouTube' }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('profile', ['updateProfile']),
    handleSubmit() {
      // Convert social links to the required format before submitting
      const formattedSocialLinks = this.formData.userDetails.socialLinks.reduce((acc, link) => {
        const platform = link.platform === 'other' ? link.customPlatform : link.platform;
        if (platform && link.url) {
          acc[platform] = link.url;
        }
        return acc;
      }, {});

      const submitData = {
        ...this.formData,
        userDetails: {
          ...this.formData.userDetails,
          socialLinks: formattedSocialLinks
        }
      };

      console.log(submitData);
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
      console.log(this.user);
      this.formData = { ...this.user };
      // Convert existing social links to array format if they exist
      if (this.formData.userDetails.socialLinks && typeof this.formData.userDetails.socialLinks === 'object') {
        const socialLinksArray = Object.entries(this.formData.userDetails.socialLinks).map(([platform, url]) => {
          const isCustomPlatform = !this.socialPlatforms.some(p => p.value === platform);
          return {
            platform: isCustomPlatform ? 'other' : platform,
            customPlatform: isCustomPlatform ? platform : '',
            url
          };
        });
        this.formData.userDetails.socialLinks = socialLinksArray;
      }
    },
    addSocialLink() {
      this.formData.userDetails.socialLinks.push({
        platform: '',
        customPlatform: '',
        url: ''
      });
    },
    removeSocialLink(index) {
      this.formData.userDetails.socialLinks.splice(index, 1);
    },
    getPlaceholder(platform) {
      const placeholders = {
        linkedin: 'https://linkedin.com/in/username',
        github: 'https://github.com/username',
        twitter: 'https://twitter.com/username',
        facebook: 'https://facebook.com/username',
        instagram: 'https://instagram.com/username',
        youtube: 'https://youtube.com/username'
      };
      return placeholders[platform] || 'https://';
    }
  },
  mounted() {
    console.log(this.user);
    this.loadProfileData();
  }
}
</script>

<style scoped>
/* Form Input Styles */
.form-input {
  margin-bottom: 1.5rem;
}

.form-control-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: 500;
}

/* About Textarea */
.about-textarea {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #2b3553;
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  width: 100%;
}

.about-textarea:focus {
  border-color: #e14eca;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 0 0 2px rgba(225, 78, 202, 0.2);
}

/* Social Links Card */
.social-links-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.social-links-card .card-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.25rem 1.5rem;
}

.social-icon-wrapper {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #e14eca, #ba54f5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.add-link-btn {
  background: linear-gradient(45deg, #e14eca, #ba54f5);
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.add-link-btn i {
  font-size: 1rem;
}

.add-link-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 78, 202, 0.3);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-state-icon {
  width: 80px;
  height: 80px;
  background: rgba(225, 78, 202, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.empty-state-icon i {
  font-size: 2.5rem;
  color: #e14eca;
}

.empty-state h6 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

/* Social Links List */
.social-links-list {
  padding: 0.5rem;
}

.social-link-item {
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  overflow: hidden;
}

.social-link-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-link-content {
  padding: 1.5rem;
}

/* Platform Select */
.platform-select-wrapper {
  position: relative;
}

.platform-select {
  appearance: none;
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #2b3553;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  width: 100%;
}

.platform-select:focus {
  border-color: #e14eca;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 0 0 2px rgba(225, 78, 202, 0.2);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  transition: transform 0.3s ease;
}

.platform-select:focus + .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

/* Remove Button */
.btn-icon {
  padding: 0.75rem;
  line-height: 1;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  transform: scale(1.1);
  background-color: rgba(220, 53, 69, 0.2);
}

/* Custom Platform Input */
.custom-platform-input,
.url-input {
  margin-top: 0;
}

/* Custom scrollbar for select dropdown */
.platform-select option {
  background-color: #1e1e2f;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem;
  font-size: 0.875rem;
}

.platform-select option:hover {
  background-color: rgba(225, 78, 202, 0.2);
}

/* Animation for adding/removing social links */
.social-link-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .social-link-content {
    padding: 1rem;
  }
  
  .social-icon-wrapper {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
  
  .add-link-btn {
    padding: 0.375rem 1rem;
  }
  
  .add-link-btn span {
    display: none;
  }

  .social-link-content .row {
    flex-direction: column;
  }

  .social-link-content .col-md-3,
  .social-link-content .col-md-5,
  .social-link-content .col-md-1 {
    width: 100%;
    margin-bottom: 1rem;
  }

  .btn-icon {
    align-self: flex-end;
  }

  .form-input {
    margin-bottom: 1rem;
  }
}
</style>
