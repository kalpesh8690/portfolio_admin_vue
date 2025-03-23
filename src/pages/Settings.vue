<template>
    <div class="content">
      <div class="settings-container">
        <!-- Header -->
        <div class="settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>
  
        <!-- Main Content -->
        <div class="settings-main">
          <!-- Settings Navigation -->
          <div class="settings-nav">
            <div 
              v-for="section in sections" 
              :key="section.id"
              class="nav-item"
              :class="{ active: activeSection === section.id }"
              @click="activeSection = section.id"
            >
              <div class="nav-icon">
                <i :class="section.icon"></i>
              </div>
              <div class="nav-content">
                <span class="nav-title">{{ section.name }}</span>
                <span class="nav-description">{{ section.description }}</span>
              </div>
            </div>
          </div>
  
          <!-- Settings Content -->
          <div class="settings-content">
            <!-- Account Settings -->
            <div v-if="activeSection === 'account'" class="settings-section">
              <div class="section-header">
                <h2>Account Settings</h2>
                <p>Update your personal information and profile picture</p>
              </div>
              <div class="settings-form">
                <div class="form-group profile-picture">
                  <label>Profile Picture</label>
                  <div class="avatar-upload">
                    <div class="avatar-preview">
                      <img :src="user?.profile || '/default-avatar.png'" alt="Profile Picture">
                      <div class="avatar-overlay">
                        <i class="fas fa-camera"></i>
                      </div>
                    </div>
                    <div class="avatar-actions">
                      <input 
                        type="file" 
                        accept="image/*" 
                        @change="handleImageUpload" 
                        ref="fileInput"
                        style="display: none"
                      >
                      <base-button @click="$refs.fileInput.click()" type="primary" class="btn-simple">
                        Change Photo
                      </base-button>
                      <p class="avatar-hint">Recommended: Square image, max 2MB</p>
                    </div>
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
              <div class="section-header">
                <h2>Security Settings</h2>
                <p>Manage your password and security preferences</p>
              </div>
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
                  <p class="input-hint">Password must be at least 8 characters long</p>
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
              <div class="section-header">
                <h2>Notification Settings</h2>
                <p>Configure how you want to receive updates</p>
              </div>
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
              <div class="section-header">
                <h2>Appearance Settings</h2>
                <p>Customize the look and feel of your dashboard</p>
              </div>
              <div class="settings-form">
                <div class="theme-group">
                  <h4>Theme Mode</h4>
                  <div class="theme-options">
                    <div 
                      class="theme-option" 
                      :class="{ active: !isDarkMode }"
                      @click="setTheme(false)"
                    >
                      <div class="theme-icon">
                        <i class="fas fa-sun"></i>
                      </div>
                      <div class="theme-content">
                        <span class="theme-title">Light Mode</span>
                        <span class="theme-description">Clean and bright interface</span>
                      </div>
                    </div>
                    <div 
                      class="theme-option" 
                      :class="{ active: isDarkMode }"
                      @click="setTheme(true)"
                    >
                      <div class="theme-icon">
                        <i class="fas fa-moon"></i>
                      </div>
                      <div class="theme-content">
                        <span class="theme-title">Dark Mode</span>
                        <span class="theme-description">Easier on the eyes</span>
                      </div>
                    </div>
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
  import { mapState, mapActions } from 'vuex'
  import BaseInput from '@/components/Inputs/BaseInput.vue'
  import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue'
  import BaseButton from '@/components/BaseButton.vue'
  
  export default {
    name: 'SettingsPage',
    components: {
      BaseInput,
      BaseCheckbox,
      BaseButton
    },
    data() {
      return {
        activeSection: 'account',
        sections: [
          { 
            id: 'account', 
            name: 'Account', 
            icon: 'fas fa-user',
            description: 'Manage your profile information'
          },
          { 
            id: 'security', 
            name: 'Security', 
            icon: 'fas fa-shield-alt',
            description: 'Password and security settings'
          },
          { 
            id: 'notifications', 
            name: 'Notifications', 
            icon: 'fas fa-bell',
            description: 'Configure notification preferences'
          },
          { 
            id: 'appearance', 
            name: 'Appearance', 
            icon: 'fas fa-paint-brush',
            description: 'Customize the interface'
          }
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
        },
        isDarkMode: false
      }
    },
    computed: {
      ...mapState('auth', ['user'])
    },
    methods: {
      ...mapActions('auth', ['updateUser']),
      async handleImageUpload(event) {
        const file = event.target.files[0]
        if (!file) return
  
        try {
          const formData = new FormData()
          formData.append('profile', file)
          await this.updateUser(formData)
          // Show success notification
        } catch (error) {
          console.error('Failed to upload image:', error)
          // Show error notification
        }
      },
      async saveAccountSettings() {
        try {
          await this.updateUser(this.formData)
          // Show success notification
        } catch (error) {
          console.error('Failed to update account settings:', error)
          // Show error notification
        }
      },
      async changePassword() {
        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          // Show error notification
          return
        }
  
        try {
          await this.updateUser({
            currentPassword: this.passwordForm.currentPassword,
            newPassword: this.passwordForm.newPassword
          })
          // Show success notification
          // Clear password form
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
        } catch (error) {
          console.error('Failed to change password:', error)
          // Show error notification
        }
      },
      async saveNotificationSettings() {
        try {
          await this.updateUser({ notificationSettings: this.notificationSettings })
          // Show success notification
        } catch (error) {
          console.error('Failed to save notification settings:', error)
          // Show error notification
        }
      },
      setTheme(isDark) {
        if (this.isDarkMode !== isDark) {
          this.isDarkMode = isDark
          // Implement theme toggle logic
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .settings-header {
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }
  
    p {
      color: var(--text-color-secondary);
      font-size: 1.1rem;
    }
  }
  
  .settings-main {
    display: flex;
    gap: 2rem;
    background: var(--bg-color);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .settings-nav {
    width: 280px;
    background: var(--bg-color-secondary);
    padding: 1.5rem;
    border-right: 1px solid var(--border-color);
  
    .nav-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      cursor: pointer;
      border-radius: 12px;
      transition: all 0.3s ease;
      color: var(--text-color);
      margin-bottom: 0.5rem;
  
      .nav-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-color);
        border-radius: 10px;
        color: var(--primary-color);
        font-size: 1.2rem;
      }
  
      .nav-content {
        flex: 1;
  
        .nav-title {
          display: block;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
  
        .nav-description {
          display: block;
          font-size: 0.9rem;
          color: var(--text-color-secondary);
        }
      }
  
      &:hover {
        background: var(--bg-color-hover);
      }
  
      &.active {
        background: var(--primary-color);
        color: white;
  
        .nav-icon {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
  
        .nav-description {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
  
  .settings-content {
    flex: 1;
    padding: 2rem;
    min-height: 600px;
  }
  
  .section-header {
    margin-bottom: 2rem;
  
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }
  
    p {
      color: var(--text-color-secondary);
    }
  }
  
  .settings-form {
    .form-group {
      margin-bottom: 2rem;
  
      label {
        display: block;
        margin-bottom: 0.75rem;
        color: var(--text-color);
        font-weight: 500;
      }
  
      .input-hint {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-color-secondary);
      }
    }
  }
  
  .profile-picture {
    .avatar-upload {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
  
      .avatar-preview {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid var(--primary-color);
  
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
        .avatar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          font-size: 1.5rem;
        }
  
        &:hover .avatar-overlay {
          opacity: 1;
        }
      }
  
      .avatar-actions {
        flex: 1;
  
        .avatar-hint {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-color-secondary);
        }
      }
    }
  }
  
  .notification-group {
    margin-bottom: 2rem;
  
    h4 {
      color: var(--text-color);
      margin-bottom: 1rem;
      font-weight: 500;
    }
  }
  
  .notification-option {
    margin-bottom: 1.5rem;
  
    .option-description {
      margin-top: 0.5rem;
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
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
  
      .theme-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-color);
        border-radius: 12px;
        color: var(--primary-color);
        font-size: 1.5rem;
      }
  
      .theme-content {
        flex: 1;
  
        .theme-title {
          display: block;
          font-weight: 500;
          margin-bottom: 0.25rem;
          color: var(--text-color);
        }
  
        .theme-description {
          display: block;
          font-size: 0.9rem;
          color: var(--text-color-secondary);
        }
      }
  
      &:hover {
        transform: translateY(-2px);
      }
  
      &.active {
        background: var(--primary-color);
  
        .theme-icon {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
  
        .theme-title,
        .theme-description {
          color: white;
        }
      }
    }
  }
  
  .settings-actions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }
  
  @media screen and (max-width: 768px) {
    .settings-container {
      padding: 1rem;
    }
  
    .settings-main {
      flex-direction: column;
    }
  
    .settings-nav {
      width: 100%;
      padding: 1rem;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
  
      .nav-item {
        padding: 0.75rem;
      }
    }
  
    .settings-content {
      padding: 1.5rem;
    }
  
    .profile-picture .avatar-upload {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .theme-options {
      flex-direction: column;
    }
  }
  </style>