<template>
  <div class="content">
    <!-- Overview Stats -->
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <base-card class="card-stats">
          <div class="row" slot="header">
            <div class="col-5 col-md-4">
              <div class="icon-big text-center icon-primary">
                <i class="tim-icons icon-user-run"></i>
              </div>
            </div>
            <div class="col-7 col-md-8">
              <div class="numbers">
                <p class="card-title">{{ experienceCount }}</p>
                <p class="card-category">Experience</p>
              </div>
            </div>
          </div>
          <div slot="footer" class="stats">
            <i class="tim-icons icon-watch-time"></i> {{ currentPosition ? formatDuration(currentPosition) : '0 years' }}
          </div>
        </base-card>
      </div>

      <div class="col-lg-3 col-md-6">
        <base-card class="card-stats">
          <div class="row" slot="header">
            <div class="col-5 col-md-4">
              <div class="icon-big text-center icon-success">
                <i class="tim-icons icon-badge"></i>
              </div>
            </div>
            <div class="col-7 col-md-8">
              <div class="numbers">
                <p class="card-title">{{ certificateCount }}</p>
                <p class="card-category">Certificates</p>
              </div>
            </div>
          </div>
          <div slot="footer" class="stats">
            <i class="tim-icons icon-trophy"></i> {{ latestCertificates.length ? latestCertificates[0].name : 'No certificates' }}
          </div>
        </base-card>
      </div>

      <div class="col-lg-3 col-md-6">
        <base-card class="card-stats">
          <div class="row" slot="header">
            <div class="col-5 col-md-4">
              <div class="icon-big text-center icon-warning">
                <i class="tim-icons icon-components"></i>
              </div>
            </div>
            <div class="col-7 col-md-8">
              <div class="numbers">
                <p class="card-title">{{ projectCount }}</p>
                <p class="card-category">Projects</p>
              </div>
            </div>
          </div>
          <div slot="footer" class="stats">
            <i class="tim-icons icon-bulb-63"></i> {{ latestProjects.length }} Latest Projects
          </div>
        </base-card>
      </div>

      <div class="col-lg-3 col-md-6">
        <base-card class="card-stats">
          <div class="row" slot="header">
            <div class="col-5 col-md-4">
              <div class="icon-big text-center icon-info">
                <i class="tim-icons icon-settings"></i>
              </div>
            </div>
            <div class="col-7 col-md-8">
              <div class="numbers">
                <p class="card-title">{{ skillCount }}</p>
                <p class="card-category">Skills</p>
              </div>
            </div>
          </div>
          <div slot="footer" class="stats">
            <i class="tim-icons icon-chart-bar-32"></i> {{ topSkills.length ? topSkills[0] : 'No skills' }}
          </div>
        </base-card>
      </div>
    </div>

    <!-- Latest Activity -->
    <div class="row">
      <div class="col-lg-8">
        <base-card>
          <h4 slot="header" class="card-title">Latest Projects</h4>
          <div class="modern-table-wrapper">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Technologies</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in latestProjects" :key="project._id">
                  <td>
                    <div class="project-name">{{ project.title }}</div>
                  </td>
                  <td>
                    <span class="project-type">{{ project.category }}</span>
                  </td>
                  <td>
                    <span class="status-badge" :class="{ 'status-active': project.status === 'published', 'status-completed': project.status === 'completed' }">
                      {{ project.status }}
                    </span>
                  </td>
                  <td>
                    <div class="tech-stack">
                      {{ project.technologies.join(', ') }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </base-card>
      </div>

      <div class="col-lg-4">
        <base-card>
          <h4 slot="header" class="card-title">Latest Certificates</h4>
          <div class="certificate-list">
            <div v-for="cert in latestCertificates" :key="cert._id" class="certificate-item">
              <div class="cert-name">{{ cert.name }}</div>
              <div class="cert-issuer">{{ cert.issuer }}</div>
              <div class="cert-date">{{ formatDate(cert.issueDate) }}</div>
            </div>
          </div>
        </base-card>
      </div>
    </div>

    <!-- Skills and Experience -->
    <div class="row">
      <div class="col-lg-6">
        <base-card>
          <h4 slot="header" class="card-title">Current Position</h4>
          <div v-if="currentPosition" class="current-position">
            <h5>{{ currentPosition.position }}</h5>
            <p class="company">{{ currentPosition.company }}</p>
            <p class="location">{{ currentPosition.location }}</p>
            <p class="duration">{{ formatDuration(currentPosition) }}</p>
            <p class="technologies">{{ currentPosition.technologies.join(', ') }}</p>
          </div>
        </base-card>
      </div>

      <div class="col-lg-6">
        <base-card>
          <h4 slot="header" class="card-title">Top Skills</h4>
          <div class="skill-list">
            <div v-for="skill in topSkills" :key="skill" class="skill-item">
              <div class="skill-info">
                <span class="skill-name">{{ skill }}</span>
              </div>
            </div>
          </div>
        </base-card>
      </div>
    </div>

    <!-- Education Section -->
    <div class="row">
      <div class="col-12">
        <base-card>
          <h4 slot="header" class="card-title">Latest Education</h4>
          <div class="education-timeline">
            <div v-for="edu in educationByDate" :key="edu._id" class="education-item">
              <div class="education-content">
                <div class="education-header">
                  <div class="degree-info">
                    <h5>{{ edu.degree }}</h5>
                    <span class="institution">{{ edu.institution }}</span>
                  </div>
                  <div class="education-badge">
                    <i class="fas fa-graduation-cap"></i>
                    <span>{{ edu.fieldOfStudy }}</span>
                  </div>
                </div>
                <div class="education-details">
                  <div class="duration">
                    <i class="far fa-calendar-alt"></i>
                    <span>{{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}</span>
                  </div>
                  <p class="description" v-if="edu.description">{{ edu.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </base-card>
      </div>
    </div>
    <notification-center />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NotificationCenter from '@/components/NotificationCenter.vue'

export default {
  name: 'portfolio-dashboard',
  components: {
    NotificationCenter
  },
  computed: {
    ...mapState('master', [
      'dashboard',
      'loading',
      'error'
    ]),
    experienceCount() {
      return this.dashboard.experiences
    },
    certificateCount() {
      return this.dashboard.certificates
    },
    projectCount() {
      return this.dashboard.projects
    },
    skillCount() {
      return this.dashboard.skills
    },
    latestProjects() {
      return this.dashboard.latestProjects
    },
    latestCertificates() {
      return this.dashboard.latestCertificates
    },
    currentPosition() {
      return this.dashboard.latestExperiences[0]
    },
    topSkills() {
      return this.dashboard.topSkills
    },
    educationByDate() {
      return this.dashboard.latestEducation
    },
    totalYearsExperience() {
      return this.dashboard.totalYearsExperience
    },
    latestCertificate() {
      return this.dashboard.latestCertificate
    },
    activeProjectCount() {
      return this.dashboard.activeProjectCount
    },
    topSkillCategory() {
      return this.dashboard.topSkillCategory
    }
  },
  methods: {
    ...mapActions('master', ['fetchDashboard']),
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatDuration(position) {
      const start = new Date(position.startDate)
      const end = position.endDate ? new Date(position.endDate) : new Date()
      const years = end.getFullYear() - start.getFullYear()
      const months = end.getMonth() - start.getMonth()
      return `${years} years ${months} months`
    }
  },
  created() {
    this.fetchDashboard()
  }
}
</script>

<style lang="scss" scoped>
@use "sass:color";

.card-stats .icon-big {
  font-size: 3em;
  min-height: 64px;
}

.card-stats .numbers {
  text-align: right;
}

.card-stats .numbers p {
  margin: 0;
}

.card-stats .card-title {
  font-size: 1.5em;
  font-weight: bold;
}

.card-stats .card-category {
  color: var(--text-color-secondary);
  font-size: 0.9em;
}

.card-stats .stats {
  color: var(--text-color-secondary);
  font-weight: 300;
}

.card-stats .stats i {
  margin-right: 5px;
}

.table > thead > tr > th {
  border-bottom-width: 1px;
  font-size: 1.1em;
  font-weight: 300;
}

.certificate-list {
  padding: 10px 0;
}

.certificate-item {
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color);
}

.certificate-item:last-child {
  border-bottom: none;
}

.cert-name {
  font-weight: 600;
  color: var(--text-color);
}

.cert-issuer {
  color: var(--text-color-secondary);
  font-size: 0.9em;
  margin: 5px 0;
}

.cert-date {
  color: var(--text-color-secondary);
  font-size: 0.85em;
}

.current-position {
  padding: 15px 0;
}

.current-position h5 {
  color: var(--text-color);
  margin-bottom: 10px;
}

.current-position .company {
  font-weight: 600;
  color: var(--text-color-secondary);
  margin: 5px 0;
}

.current-position .location,
.current-position .duration {
  color: var(--text-color-secondary);
  font-size: 0.9em;
  margin: 5px 0;
}

.current-position .technologies {
  color: var(--text-color-secondary);
  margin-top: 10px;
  font-size: 0.9em;
}

.skill-list {
  padding: 10px 0;
}

.skill-item {
  margin-bottom: 15px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.skill-name {
  color: var(--text-color);
  font-weight: 600;
}

.skill-category {
  color: var(--text-color-secondary);
  font-size: 0.9em;
}

.skill-proficiency {
  margin-top: 5px;
}

.progress {
  height: 4px;
  background-color: var(--bg-color-secondary);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  background-color: var(--primary-color);
  height: 100%;
  transition: width 0.3s ease;
}

.icon-primary {
  color: var(--primary-color);
}

.icon-success {
  color: var(--success-color);
}

.icon-warning {
  color: var(--warning-color);
}

.icon-info {
  color: var(--info-color);
}

.education-timeline {
  position: relative;
  padding: 1rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
  }
}

.education-item {
  position: relative;
  padding-left: 3.5rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 1.25rem;
    top: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--primary-color);
    border: 2px solid var(--card-bg);
    z-index: 1;
  }

  &:hover::before {
    background: var(--primary-color-dark);
    transform: scale(1.2);
    transition: all 0.3s ease;
  }
}

.education-content {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color-light);
  }
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;

  .degree-info {
    h5 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .institution {
      display: block;
      color: var(--text-color-secondary);
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
  }

  .education-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.75rem;
    background: var(--primary-color-light);
    color: var(--primary-color);
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;

    i {
      font-size: 0.9rem;
    }
  }
}

.education-details {
  .duration {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.75rem;

    i {
      color: var(--primary-color);
    }
  }

  .description {
    color: var(--text-color-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .education-timeline {
    &::before {
      left: 1rem;
    }
  }

  .education-item {
    padding-left: 2.5rem;

    &::before {
      left: 0.75rem;
    }
  }

  .education-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .education-badge {
    align-self: flex-start;
  }
}

.modern-table-wrapper {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: var(--shadow);
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  thead {
    tr {
      background: transparent;
    }
    
    th {
      color: var(--text-color-secondary);
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.75rem;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      text-align: left;
    }
  }
  
  tbody {
    tr {
      transition: background-color 0.2s ease;
      
      &:hover {
        background: var(--hover-bg);
      }
    }
    
    td {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      color: var(--text-color);
      font-size: 0.875rem;
      
      &:first-child {
        font-weight: 600;
      }
    }
  }
}

.project-name {
  color: var(--primary-color);
  font-weight: 600;
}

.project-type {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  
  &.status-active {
    background: var(--success-color-light);
    color: var(--success-color);
  }
  
  &.status-completed {
    background: var(--info-color-light);
    color: var(--info-color);
  }
}

.tech-stack {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
