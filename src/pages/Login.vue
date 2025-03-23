<template>
  <div class="login-page">
    <div class="login-split">
      <!-- Left side - Brand Section -->
      <div class="brand-section">
        <div class="brand-content">
          <div class="logo-wrapper">
            <img src="@/assets/logo.svg" alt="Logo" class="logo">
            <div class="logo-glow"></div>
          </div>
          <h1 class="brand-name">Portfolio Admin</h1>
          <p class="brand-slogan">Manage your portfolio with ease</p>
          <div class="brand-features">
            <div class="feature-item">
              <i class="fas fa-paint-brush"></i>
              <span>Beautiful Designs</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-mobile-alt"></i>
              <span>Responsive Layout</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-shield-alt"></i>
              <span>Secure Platform</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side - Login Form -->
      <div class="login-section">
        <div class="login-container">
          <div class="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to continue</p>
          </div>
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <BaseInput
                v-model="form.email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                :error="v$.form.email.$error ? v$.form.email.$errors[0].$message : ''"
                required
              >
                <template #prefix>
                  <i class="fas fa-envelope"></i>
                </template>
              </BaseInput>
            </div>
            
            <div class="form-group">
              <BaseInput
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                placeholder="Enter your password"
                :error="v$.form.password.$error ? v$.form.password.$errors[0].$message : ''"
                required
              >
                <template #prefix>
                  <i class="fas fa-lock"></i>
                </template>
                <template #suffix>
                  <button 
                    type="button" 
                    class="toggle-password"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </template>
              </BaseInput>
            </div>

            <div class="remember-forgot">
              <div class="remember-me">
                <BaseCheckbox
                  v-model="form.rememberMe"
                  label="Remember me"
                />
              </div>
              <a href="#" class="forgot-password">Forgot Password?</a>
            </div>

            <div class="form-group">
              <BaseButton variant="info"  type="submit" @click="handleLogin" class="login-button" :disabled="loading">
                <i class="fas fa-sign-in-alt"></i>
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </BaseButton>
            </div>

            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { ref, reactive } from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton
  },
  setup() {
    const loading = ref(false)
    const error = ref(null)
    const showPassword = ref(false)
    
    const form = reactive({
      email: '',
      password: '',
      rememberMe: false
    })

    const rules = {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    }

    const v$ = useVuelidate(rules, { form })

    return {
      form,
      loading,
      error,
      showPassword,
      v$
    }
  },
  methods: {
    ...mapActions('auth', ['loginWithPass']),
    async handleLogin() {
      this.error = null
      const isFormCorrect = await this.v$.$validate()
      
      if (!isFormCorrect) return
      
      this.loading = true
      try {
        const result = await this.loginWithPass({
          email: this.form.email,
          password: this.form.password
        })

        // Store user data and token
        if (result.data) {
          const { token, ...userData } = result.data
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(userData))
        }

        if (this.form.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        } else {
          localStorage.removeItem('rememberMe')
        }

        const redirectPath = this.$route.query.redirect || '/dashboard'
        await this.$router.push(redirectPath)
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to login. Please try again.'
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    // Check if remember me was previously set
    const rememberMe = localStorage.getItem('rememberMe')
    if (rememberMe === 'true') {
      this.form.rememberMe = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-color) 0%, var(--bg-color-secondary) 100%);
  padding: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, var(--primary-color-light) 0%, transparent 50%);
    opacity: 0.15;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, var(--primary-color-light) 0%, transparent 70%);
    opacity: 0.08;
    animation: rotate 30s linear infinite;
  }

  .login-split {
    display: flex;
    width: 100%;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  .brand-section {
    flex: 1;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.15;
    }

    .brand-content {
      text-align: center;
      color: white;
      position: relative;
      z-index: 1;
      max-width: 450px;
      width: 100%;

      .logo-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 2.5rem;

        .logo {
          width: 140px;
          height: 140px;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;

          &:hover {
            transform: scale(1.08) rotate(8deg);
          }
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, transparent 70%);
          opacity: 0.6;
          filter: blur(20px);
          z-index: 0;
          animation: pulse 3s ease-in-out infinite;
        }
      }

      .brand-name {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1.25rem;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        letter-spacing: -0.5px;
      }

      .brand-slogan {
        font-size: 1.35rem;
        opacity: 0.95;
        margin-bottom: 3.5rem;
        font-weight: 300;
      }

      .brand-features {
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
        text-align: left;

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);

          &:hover {
            transform: translateX(12px);
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.2);
          }

          i {
            font-size: 1.75rem;
            opacity: 0.95;
          }

          span {
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: 0.2px;
          }
        }
      }
    }
  }

  .login-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);

    .login-container {
      width: 100%;
      max-width: 450px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      border-radius: 28px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      padding: 3rem;
      position: relative;
      z-index: 1;
      transform: translateY(0);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.15);

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
      }

      .login-header {
        text-align: center;
        margin-bottom: 2.5rem;

        h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text-color);
        }

        p {
          font-size: 1.1rem;
          color: var(--text-color-secondary);
          opacity: 0.8;
        }
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .remember-forgot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        .forgot-password {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;

          &:hover {
            color: var(--primary-color-dark);
          }
        }
      }

      .login-button {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
      }

      .alert {
        margin-top: 1.5rem;
        padding: 1rem;
        border-radius: 12px;
        font-weight: 500;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .login-page {
    .login-split {
      flex-direction: column;
    }

    .brand-section {
      padding: 4rem 2rem;
      min-height: auto;

      .brand-content {
        .logo-wrapper {
          .logo {
            width: 100px;
            height: 100px;
          }

          .logo-glow {
            width: 130px;
            height: 130px;
          }
        }

        .brand-name {
          font-size: 2.5rem;
        }

        .brand-slogan {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .brand-features {
          .feature-item {
            padding: 1rem;
            font-size: 1rem;
          }
        }
      }
    }

    .login-section {
      padding: 2rem 1.5rem;
      min-height: auto;

      .login-container {
        padding: 2.5rem;
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
}
</style> 