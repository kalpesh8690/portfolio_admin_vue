<template>
  <div class="content">
    <div class="row">
      <!-- Profile Overview Card -->
      <div class="col-lg-4">
        <base-card>
          <div class="text-center">
            <img :src="profile.avatar" alt="Profile Avatar" class="profile-avatar">
            <h3 class="mt-3">{{ fullName }}</h3>
            <p class="title">{{ profile.title }}</p>
            <p class="availability">{{ profile.availability }}</p>
            <base-button type="primary" class="btn-simple" @click="showEditForm = true">
              <i class="tim-icons icon-pencil"></i> Edit Profile
            </base-button>
          </div>
          <div class="profile-section">
            <h6 class="section-title">Contact Information</h6>
            <div class="info-item">
              <i class="tim-icons icon-email-85"></i>
              <span>{{ contactInfo.email }}</span>
            </div>
            <div class="info-item">
              <i class="tim-icons icon-mobile"></i>
              <span>{{ contactInfo.phone }}</span>
            </div>
            <div class="info-item">
              <i class="tim-icons icon-pin"></i>
              <span>{{ contactInfo.location }}</span>
            </div>
          </div>
          <div class="profile-section">
            <h6 class="section-title">Social Links</h6>
            <div class="info-item">
              <i class="tim-icons icon-world"></i>
              <a :href="socialLinks.website" target="_blank">Personal Website</a>
            </div>
            <div class="info-item">
              <i class="tim-icons icon-cloud-download-93"></i>
              <a :href="socialLinks.github" target="_blank">GitHub</a>
            </div>
            <div class="info-item">
              <i class="tim-icons icon-single-02"></i>
              <a :href="socialLinks.linkedin" target="_blank">LinkedIn</a>
            </div>
          </div>
        </base-card>
      </div>

      <!-- Bio and Interests -->
      <div class="col-lg-8">
        <base-card v-if="!showEditForm">
          <h4 slot="header" class="card-title">About Me</h4>
          <div class="bio-section">
            <p class="bio">{{ profile.bio }}</p>
          </div>
          <div class="interests-section">
            <h5>Interests</h5>
            <div class="interests-list">
              <span v-for="interest in profile.interests" 
                    :key="interest" 
                    class="interest-tag">
                {{ interest }}
              </span>
            </div>
          </div>
        </base-card>

        <!-- Edit Form -->
        <edit-profile-form v-if="showEditForm" @submit="handleEditSubmit" />

        <!-- Professional Summary -->
        <base-card class="mt-4" v-if="!showEditForm">
          <h4 slot="header" class="card-title">Professional Summary</h4>
          <div class="row summary-stats">
            <div class="col-md-3">
              <div class="stat-item">
                <h3>{{ experienceCount }}</h3>
                <p>Work Experiences</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-item">
                <h3>{{ skillCount }}</h3>
                <p>Skills</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-item">
                <h3>{{ certificateCount }}</h3>
                <p>Certificates</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-item">
                <h3>{{ projectCount }}</h3>
                <p>Projects</p>
              </div>
            </div>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditProfileForm from './Profile/EditProfileForm.vue'

export default {
  name: 'profile-page',
  components: {
    EditProfileForm
  },
  data() {
    return {
      showEditForm: false
    }
  },
  computed: {
    ...mapGetters('profile', [
      'fullName',
      'profile',
      'socialLinks',
      'contactInfo'
    ]),
    ...mapGetters('experience', ['experienceCount']),
    ...mapGetters('skills', ['skillCount']),
    ...mapGetters('certificates', ['certificateCount']),
    ...mapGetters('projects', ['projectCount'])
  },
  methods: {
    handleEditSubmit() {
      this.showEditForm = false;
    }
  }
}
</script>

<style scoped>
.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e14eca;
}

.title {
  color: #9A9A9A;
  font-size: 1.1em;
  margin-top: 5px;
}

.availability {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: rgba(225, 78, 202, 0.1);
  color: #e14eca;
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 15px;
}

.profile-section {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.section-title {
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-item i {
  font-size: 1.2em;
  margin-right: 10px;
  color: #e14eca;
  width: 20px;
}

.info-item a {
  color: #1d8cf8;
  text-decoration: none;
}

.info-item a:hover {
  text-decoration: underline;
}

.bio {
  font-size: 1.1em;
  line-height: 1.6;
  color: #333;
}

.interests-section {
  margin-top: 25px;
}

.interests-section h5 {
  color: #333;
  margin-bottom: 15px;
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interest-tag {
  padding: 5px 15px;
  background-color: rgba(225, 78, 202, 0.1);
  color: #e14eca;
  border-radius: 15px;
  font-size: 0.9em;
}

.summary-stats {
  text-align: center;
}

.stat-item {
  padding: 20px;
  background-color: rgba(225, 78, 202, 0.05);
  border-radius: 8px;
}

.stat-item h3 {
  color: #e14eca;
  margin: 0;
  font-size: 2em;
}

.stat-item p {
  color: #666;
  margin: 5px 0 0 0;
  font-size: 0.9em;
}
</style>
