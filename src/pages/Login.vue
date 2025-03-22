<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Please sign in to continue</p>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :class="{ 'is-invalid': v$.form.email.$error }"
            placeholder="Enter your email"
            required
          />
          <div class="error-message" v-if="v$.form.email.$error">
            {{ v$.form.email.$errors[0].$message }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              :class="{ 'is-invalid': v$.form.password.$error }"
              placeholder="Enter your password"
              required
            />
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🔒' : '👁️' }}
            </button>
          </div>
          <div class="error-message" v-if="v$.form.password.$error">
            {{ v$.form.password.$errors[0].$message }}
          </div>
        </div>

        <div class="form-group remember-me">
          <label class="checkbox-container">
            <input type="checkbox" v-model="form.rememberMe">
            <span class="checkmark"></span>
            Remember me
          </label>
        </div>

        <div class="form-group">
          <button type="submit" class="login-button" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { ref, reactive } from 'vue'

export default {
  name: 'LoginPage',
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
    async handleLogin() {
      this.error = null
      const isFormCorrect = await this.v$.$validate()
      
      if (!isFormCorrect) return
      
      this.loading = true
      try {
        // Simulate login API call
        // In a real app, this would be an API call that returns a token
        const token = 'dummy-token' // Replace with actual API call
        
        // Store the token
        localStorage.setItem('token', token)
        
        // Get redirect path from query parameters or default to dashboard
        const redirectPath = this.$route.query.redirect || '/dashboard'
        await this.$router.push(redirectPath)
      } catch (err) {
        this.error = err.message || 'Failed to login. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 24px;
}

.login-header p {
  color: #718096;
  font-size: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.is-invalid {
  border-color: #e53e3e;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: #4a5568;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.login-button:hover {
  background: #5a67d8;
}

.login-button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  margin-top: 4px;
}

.alert {
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
}

.alert-danger {
  background: #fff5f5;
  color: #e53e3e;
  border: 1px solid #feb2b2;
}
</style> 