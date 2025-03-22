<template>
  <div class="content">
    <!-- Overview Stats -->
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <base-card class="card-stats">
          <div class="row" slot="header">
            <div class="col-5 col-md-4">
              <div class="icon-big text-center icon-primary">
                <i class="tim-icons icon-briefcase-24"></i>
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
            <i class="tim-icons icon-watch-time"></i> {{ totalYearsExperience }}
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
            <i class="tim-icons icon-trophy"></i> {{ latestCertificate }}
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
            <i class="tim-icons icon-bulb-63"></i> {{ activeProjectCount }} Active Projects
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
            <i class="tim-icons icon-chart-bar-32"></i> {{ topSkillCategory }}
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
                  <th>Type</th>
                  <th>Status</th>
                  <th>Technologies</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in latestProjects" :key="project.projectName">
                  <td>
                    <div class="project-name">{{ project.projectName }}</div>
                  </td>
                  <td>
                    <span class="project-type">{{ project.projectType }}</span>
                  </td>
                  <td>
                    <span class="status-badge" :class="{ 'status-active': !project.endDate, 'status-completed': project.endDate }">
                      {{ project.endDate ? 'Completed' : 'Active' }}
                    </span>
                  </td>
                  <td>
                    <div class="tech-stack">
                      {{ project.technologies }}
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
            <div v-for="cert in latestCertificates" :key="cert.name" class="certificate-item">
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
            <p class="company">{{ currentPosition.companyName }}</p>
            <p class="location">{{ currentPosition.location }}</p>
            <p class="duration">{{ formatDuration(currentPosition) }}</p>
            <p class="technologies">{{ currentPosition.technologies }}</p>
          </div>
        </base-card>
      </div>

      <div class="col-lg-6">
        <base-card>
          <h4 slot="header" class="card-title">Top Skills</h4>
          <div class="skill-list">
            <div v-for="skill in topSkills" :key="skill.skillName" class="skill-item">
              <div class="skill-info">
                <span class="skill-name">{{ skill.skillName }}</span>
                <span class="skill-category">{{ skill.category }}</span>
              </div>
              <div class="skill-proficiency">
                <div class="progress">
                  <div class="progress-bar" :style="{ width: (skill.proficiency * 20) + '%' }"></div>
                </div>
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
            <div v-for="edu in educationByDate" :key="edu.institution" class="education-item">
              <div class="education-header">
                <h5>{{ edu.degree }}</h5>
                <span class="institution">{{ edu.institution }}</span>
              </div>
              <div class="education-details">
                <p class="field">{{ edu.fieldOfStudy }}</p>
                <p class="duration">{{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}</p>
                <p class="description" v-if="edu.description">{{ edu.description }}</p>
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

export default {
  name: 'portfolio-dashboard',
  computed: {
    ...mapGetters('experience', [
      'experienceCount',
      'totalYearsExperience',
      'currentPosition'
    ]),
    ...mapGetters('certificates', [
      'certificateCount',
      'latestCertificate',
      'latestCertificates'
    ]),
    ...mapGetters('projects', [
      'projectCount',
      'activeProjectCount',
      'latestProjects'
    ]),
    ...mapGetters('skills', [
      'skillCount',
      'topSkillCategory',
      'topSkills'
    ]),
    ...mapGetters('education', [
      'educationCount',
      'latestEducation',
      'educationByDate'
    ])
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    },
    formatDuration(experience) {
      if (!experience) return ''
      const start = new Date(experience.startDate)
      const end = experience.endDate ? new Date(experience.endDate) : new Date()
      const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12
      
      if (years === 0) return `${remainingMonths} months`
      if (remainingMonths === 0) return `${years} years`
      return `${years} years ${remainingMonths} months`
    }
  }
}
</script>

<style lang="scss">
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
  color: #9A9A9A;
  font-size: 0.9em;
}

.card-stats .stats {
  color: #9A9A9A;
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
  border-bottom: 1px solid #e9ecef;
}

.certificate-item:last-child {
  border-bottom: none;
}

.cert-name {
  font-weight: 600;
  color: #333;
}

.cert-issuer {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}

.cert-date {
  color: #9A9A9A;
  font-size: 0.85em;
}

.current-position {
  padding: 15px 0;
}

.current-position h5 {
  color: #333;
  margin-bottom: 10px;
}

.current-position .company {
  font-weight: 600;
  color: #666;
  margin: 5px 0;
}

.current-position .location,
.current-position .duration {
  color: #9A9A9A;
  font-size: 0.9em;
  margin: 5px 0;
}

.current-position .technologies {
  color: #666;
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
  color: #333;
  font-weight: 600;
}

.skill-category {
  color: #9A9A9A;
  font-size: 0.9em;
}

.skill-proficiency {
  margin-top: 5px;
}

.progress {
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  background-color: #e14eca;
  height: 100%;
  transition: width 0.3s ease;
}

.icon-primary {
  color: #e14eca;
}

.icon-success {
  color: #00f2c3;
}

.icon-warning {
  color: #ff8d72;
}

.icon-info {
  color: #1d8cf8;
}

.education-timeline {
  padding: 20px 0;
}

.education-item {
  padding: 20px;
  margin-bottom: 20px;
  border-left: 3px solid #e14eca;
  background-color: rgba(225, 78, 202, 0.05);
  border-radius: 0 8px 8px 0;
}

.education-item:last-child {
  margin-bottom: 0;
}

.education-header {
  margin-bottom: 15px;
}

.education-header h5 {
  color: #333;
  margin: 0 0 5px 0;
}

.institution {
  color: #666;
  font-weight: 600;
}

.education-details .field {
  color: #333;
  margin: 5px 0;
}

.education-details .duration {
  color: #9A9A9A;
  font-size: 0.9em;
  margin: 5px 0;
}

.education-details .description {
  color: #666;
  font-size: 0.95em;
  margin: 10px 0 0 0;
  line-height: 1.5;
}

.modern-table-wrapper {
  background: rgba(32, 32, 32, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
      color: #9A9A9A;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.75rem;
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      text-align: left;
    }
  }
  
  tbody {
    tr {
      transition: background-color 0.2s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }
    
    td {
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #ffffff;
      font-size: 0.875rem;
      
      &:first-child {
        font-weight: 600;
      }
    }
  }
}

.project-name {
  color: #e14eca;
  font-weight: 600;
}

.project-type {
  color: #9A9A9A;
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
    background: rgba(0, 242, 195, 0.1);
    color: #00f2c3;
  }
  
  &.status-completed {
    background: rgba(29, 140, 248, 0.1);
    color: #1d8cf8;
  }
}

.tech-stack {
  color: #9A9A9A;
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
