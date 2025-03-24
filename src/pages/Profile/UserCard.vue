<template>
  <base-card type="user" class="user-card">
    <div slot="header" class="image">
      <img :src="img" alt="User profile" />
      <div class="image-overlay">
        <div class="social-links">
          <a v-if="github" :href="github" target="_blank" class="social-link">
            <i class="fab fa-github"></i>
          </a>
          <a v-if="linkedin" :href="linkedin" target="_blank" class="social-link">
            <i class="fab fa-linkedin"></i>
          </a>
          <a v-if="twitter" :href="twitter" target="_blank" class="social-link">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="author">
      <h5 class="title">{{ name }}</h5>
      <p class="description">{{ title }}</p>
      <div class="location" v-if="location">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ location }}</span>
      </div>
    </div>

    <p class="description text-center">
      {{ description }}
    </p>

    <div class="stats" v-if="stats">
      <div class="stat-item">
        <span class="stat-value">{{ stats.projects }}</span>
        <span class="stat-label">Projects</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.followers }}</span>
        <span class="stat-label">Followers</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.following }}</span>
        <span class="stat-label">Following</span>
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "user-card",
  props: {
    name: String,
    title: String,
    description: String,
    img: String,
    location: String,
    github: String,
    linkedin: String,
    twitter: String,
    stats: {
      type: Object,
      default: () => ({
        projects: 0,
        followers: 0,
        following: 0
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  mounted(){
    console.log("USERCARD_USER",this.user)
  }
}
</script>

<style lang="scss" scoped>
.user-card {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;

  .image {
    width: 120px;
    height: 120px;
    margin: 0 auto -60px;
    position: relative;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 4px solid var(--card-bg);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;

      .social-links {
        display: flex;
        gap: 1rem;

        .social-link {
          color: white;
          font-size: 1.25rem;
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-3px);
          }
        }
      }
    }

    &:hover {
      img {
        transform: scale(1.05);
      }

      .image-overlay {
        opacity: 1;
      }
    }
  }

  .author {
    padding-top: 60px;
    margin-bottom: 1.5rem;

    .title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    .description {
      font-size: 1rem;
      color: var(--text-color-secondary);
      margin: 0 0 0.75rem;
    }

    .location {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-color-secondary);
      font-size: 0.875rem;

      i {
        color: var(--primary-color);
      }
    }
  }

  .description.text-center {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--text-color-secondary);
    margin: 0 0 1.5rem;
    padding: 0 1.5rem;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .stat-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-color);
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--text-color-secondary);
      }
    }
  }
}
</style>
