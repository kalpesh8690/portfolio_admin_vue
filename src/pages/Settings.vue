<template>
  <div class="content">
    <div class="settings-container">
      <!-- Settings Navigation -->
      <div class="settings-nav">
        <div 
          v-for="section in sections" 
          :key="section.id"
          class="nav-item"
          :class="{ active: activeSection === section.id }"
          @click="activeSection = section.id"
        >
          <i :class="section.icon"></i>
          <span>{{ section.name }}</span>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="settings-content">
        <!-- Account Settings -->
        <div v-if="activeSection === 'account'" class="settings-section">
          <h2>Account Settings</h2>
          <div class="settings-form">
            <div class="form-group">
              <label>Profile Picture</label>
              <div class="avatar-upload">
                <img :src="user.profile || '/default-avatar.png'" alt="Profile Picture">
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="handleImageUpload" 
                  ref="fileInput"
                  style="display: none"
                >
                <base-button @click="$refs.fileInput.click()" type="primary" class="btn-simple">
                  <i class="fas fa-camera"></i> Change Photo
                </base-button>
              </div>
            </div>
            <div class="form-group">
              <label>Name</label>
              <base-input v-model="formData.firstName" placeholder="Enter your name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <base-input v-model="formData.email" type="email" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              <label>Mobile</label>
              <base-input v-model="formData.mobile" placeholder="Enter your mobile number" />
            </div>
          </div>
          <div class="settings-actions">
            <base-button @click="saveAccountSettings" type="primary">
              Save Changes
            </base-button>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeSection === 'security'" class="settings-section">
          <h2>Security Settings</h2>
          <div class="settings-form">
            <div class="form-group">
              <label>Current Password</label>
              <base-input 
                v-model="passwordForm.currentPassword" 
                type="password" 
                placeholder="Enter current password" 
              />
            </div>
            <div class="form-group">
              <label>New Password</label>
              <base-input 
                v-model="passwordForm.newPassword" 
                type="password" 
                placeholder="Enter new password" 
              />
            </div>
            <div class="form-group">
              <label>Confirm New Password</label>
              <base-input 
                v-model="passwordForm.confirmPassword" 
                type="password" 
                placeholder="Confirm new password" 
              />
            </div>
          </div>
          <div class="settings-actions">
            <base-button @click="changePassword" type="primary">
              Update Password
            </base-button>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeSection === 'notifications'" class="settings-section">
          <h2>Notification Settings</h2>
          <div class="settings-form">
            <div class="notification-group">
              <h4>Email Notifications</h4>
              <div class="notification-option">
                <base-checkbox v-model="notificationSettings.emailUpdates">
                  Portfolio Updates
                </base-checkbox>
                <p class="option-description">Receive updates about your portfolio changes</p>
              </div>
              <div class="notification-option">
                <base-checkbox v-model="notificationSettings.emailSecurity">
                  Security Alerts
                </base-checkbox>
                <p class="option-description">Get notified about security-related events</p>
              </div>
            </div>
            <div class="notification-group">
              <h4>Push Notifications</h4>
              <div class="notification-option">
                <base-checkbox v-model="notificationSettings.pushUpdates">
                  Portfolio Updates
                </base-checkbox>
                <p class="option-description">Receive push notifications for portfolio changes</p>
              </div>
              <div class="notification-option">
                <base-checkbox v-model="notificationSettings.pushSecurity">
                  Security Alerts
                </base-checkbox>
                <p class="option-description">Get push notifications for security events</p>
              </div>
            </div>
          </div>
          <div class="settings-actions">
            <base-button @click="saveNotificationSettings" type="primary">
              Save Preferences
            </base-button>
          </div>
        </div>

        <!-- Theme Settings -->
        <div v-if="activeSection === 'appearance'" class="settings-section">
          <h2>Appearance Settings</h2>
          <div class="settings-form">
            <div class="theme-group">
              <h4>Theme Mode</h4>
              <div class="theme-options">
                <div 
                  class="theme-option" 
                  :class="{ active: !isDarkMode }"
                  @click="setTheme(false)"
                >
                  <i class="fas fa-sun"></i>
                  <span>Light Mode</span>
                </div>
                <div 
                  class="theme-option" 
                  :class="{ active: isDarkMode }"
                  @click="setTheme(true)"
                >
                  <i class="fas fa-moon"></i>
                  <span>Dark Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'settings-page',
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton
  },
  data() {
    return {
      activeSection: 'account',
      sections: [
        { id: 'account', name: 'Account', icon: 'fas fa-user' },
        { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
        { id: 'notifications', name: 'Notifications', icon: 'fas fa-bell' },
        { id: 'appearance', name: 'Appearance', icon: 'fas fa-paint-brush' }
      ],
      formData: {
        firstName: '',
        email: '',
        mobile: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      notificationSettings: {
        emailUpdates: true,
        emailSecurity: true,
        pushUpdates: true,
        pushSecurity: true
      }
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('theme', ['isDarkMode'])
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    ...mapActions('theme', ['toggleTheme']),
    async handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        // Create FormData
        const formData = new FormData()
        formData.append('profile', file)

        // Update user profile picture
        await this.updateUser(formData)
        this.$notify({
          type: 'success',
          message: 'Profile picture updated successfully!'
        })
      } catch (error) {
        console.error('Failed to upload image:', error)
        this.$notify({
          type: 'error',
          message: 'Failed to update profile picture. Please try again.'
        })
      }
    },
    async saveAccountSettings() {
      try {
        await this.updateUser(this.formData)
        this.$notify({
          type: 'success',
          message: 'Account settings updated successfully!'
        })
      } catch (error) {
        console.error('Failed to update account settings:', error)
        this.$notify({
          type: 'error',
          message: 'Failed to update account settings. Please try again.'
        })
      }
    },
    async changePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$notify({
          type: 'error',
          message: 'New passwords do not match!'
        })
        return
      }

      try {
        await this.updateUser({
          currentPassword: this.passwordForm.currentPassword,
          newPassword: this.passwordForm.newPassword
        })
        this.$notify({
          type: 'success',
          message: 'Password updated successfully!'
        })
        // Clear password form
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      } catch (error) {
        console.error('Failed to change password:', error)
        this.$notify({
          type: 'error',
          message: 'Failed to update password. Please try again.'
        })
      }
    },
    async saveNotificationSettings() {
      try {
        await this.updateUser({ notificationSettings: this.notificationSettings })
        this.$notify({
          type: 'success',
          message: 'Notification preferences saved successfully!'
        })
      } catch (error) {
        console.error('Failed to save notification settings:', error)
        this.$notify({
          type: 'error',
          message: 'Failed to save notification preferences. Please try again.'
        })
      }
    },
    setTheme(isDark) {
      if (this.isDarkMode !== isDark) {
        this.toggleTheme()
      }
    }
  },
  created() {
    // Initialize form data with user data
    if (this.user) {
      this.formData = {
        firstName: this.user.firstName || '',
        email: this.user.email || '',
        mobile: this.user.mobile || ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.settings-nav {
  width: 250px;
  background: var(--bg-color-secondary);
  border-radius: 12px;
  padding: 1rem;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: var(--text-color);

    i {
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }

    &:hover {
      background: var(--bg-color-hover);
    }

    &.active {
      background: var(--primary-color);
      color: white;
    }
  }
}

.settings-content {
  flex: 1;
  min-height: 600px;
}

.settings-section {
  h2 {
    margin-bottom: 2rem;
    color: var(--text-color);
    font-weight: 600;
  }
}

.settings-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      font-weight: 500;
    }
  }
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary-color);
  }
}

.notification-group {
  margin-bottom: 2rem;

  h4 {
    color: var(--text-color);
    margin-bottom: 1rem;
  }
}

.notification-option {
  margin-bottom: 1rem;

  .option-description {
    margin-top: 0.25rem;
    color: var(--text-color-secondary);
    font-size: 0.9rem;
  }
}

.theme-options {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  .theme-option {
    flex: 1;
    padding: 1.5rem;
    border-radius: 12px;
    background: var(--bg-color-secondary);
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;

    i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--primary-color);
    }

    span {
      display: block;
      color: var(--text-color);
      font-weight: 500;
    }

    &:hover {
      transform: translateY(-2px);
    }

    &.active {
      background: var(--primary-color);
      color: white;

      i, span {
        color: white;
      }
    }
  }
}

.settings-actions {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

@media screen and (max-width: 768px) {
  .settings-container {
    flex-direction: column;
    padding: 1rem;
  }

  .settings-nav {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 0.5rem;

    .nav-item {
      flex: 0 0 auto;
      padding: 0.75rem 1rem;
    }
  }

  .theme-options {
    flex-direction: column;
  }
}
</style> 