const config = {
  // App Information
  app: {
    title: process.env.VUE_APP_TITLE || 'Portfolio Admin Dashboard',
    description: process.env.VUE_APP_DESCRIPTION || 'Manage your professional portfolio with ease',
  },

  // API Configuration
  api: {
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
    timeout: parseInt(process.env.VUE_APP_API_TIMEOUT || '30000', 10),
  },

  // Feature Flags
  features: {
    enableDemoData: process.env.VUE_APP_ENABLE_DEMO_DATA === 'true',
    enableNotifications: process.env.VUE_APP_ENABLE_NOTIFICATIONS === 'true',
    enableLogs: process.env.VUE_APP_ENABLE_LOGS === 'true',
    enableErrorReporting: process.env.VUE_APP_ENABLE_ERROR_REPORTING === 'true',
    mockApi: process.env.VUE_APP_MOCK_API === 'true',
  },

  // Storage Configuration
  storage: {
    prefix: process.env.VUE_APP_STORAGE_PREFIX || 'portfolio_',
    tokenKey: process.env.VUE_APP_TOKEN_KEY || 'auth_token',
  },

  // Analytics and Monitoring
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    googleAnalyticsId: process.env.VUE_APP_ANALYTICS_ID,
    sentryDSN: process.env.VUE_APP_SENTRY_DSN,
  },

  // Environment Information
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },

  // Helper Methods
  getStorageKey(key) {
    return `${this.storage.prefix}${key}`;
  },

  isFeatureEnabled(featureName) {
    return this.features[featureName] || false;
  },
};

export default config; 