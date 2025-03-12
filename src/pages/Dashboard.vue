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
          <div class="table-responsive">
            <table class="table tablesorter">
              <thead class="text-primary">
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Technologies</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in latestProjects" :key="project.projectName">
                  <td>{{ project.projectName }}</td>
                  <td>{{ project.projectType }}</td>
                  <td>{{ project.endDate ? 'Completed' : 'Active' }}</td>
                  <td>{{ project.technologies }}</td>
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
  </div>
</template>

<script>
export default {
  name: 'portfolio-dashboard',
  data() {
    return {
      experienceList: [],
      certificateList: [],
      projectList: [],
      skillList: [],
      educationList: []
    }
  },
  computed: {
    // Experience Stats
    experienceCount() {
      return this.experienceList.length
    },
    totalYearsExperience() {
      if (this.experienceList.length === 0) return 'No experience'
      
      let totalMonths = 0
      this.experienceList.forEach(exp => {
        const start = new Date(exp.startDate)
        const end = exp.endDate ? new Date(exp.endDate) : new Date()
        totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
      })
      
      const years = Math.floor(totalMonths / 12)
      const months = totalMonths % 12
      
      if (years === 0) return `${months} months`
      if (months === 0) return `${years} years`
      return `${years} years ${months} months`
    },
    currentPosition() {
      return this.experienceList[0]
    },

    // Certificate Stats
    certificateCount() {
      return this.certificateList.length
    },
    latestCertificate() {
      if (this.certificateList.length === 0) return 'No certificates'
      const sorted = [...this.certificateList].sort((a, b) => 
        new Date(b.issueDate) - new Date(a.issueDate)
      )
      return sorted[0].name
    },
    latestCertificates() {
      return [...this.certificateList]
        .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
        .slice(0, 3)
    },

    // Project Stats
    projectCount() {
      return this.projectList.length
    },
    activeProjectCount() {
      return this.projectList.filter(project => !project.endDate).length
    },
    latestProjects() {
      return [...this.projectList]
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 5)
    },

    // Skill Stats
    skillCount() {
      return this.skillList.length
    },
    topSkillCategory() {
      if (this.skillList.length === 0) return 'No skills'
      const categories = this.skillList.reduce((acc, skill) => {
        acc[skill.category] = (acc[skill.category] || 0) + 1
        return acc
      }, {})
      const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1])
      return sorted[0][0]
    },
    topSkills() {
      return [...this.skillList]
        .sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, 5)
    }
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
  },
  created() {
    // Load all data from localStorage
    const savedExperience = localStorage.getItem('experienceList')
    const savedCertificates = localStorage.getItem('certificateList')
    const savedProjects = localStorage.getItem('projectList')
    const savedSkills = localStorage.getItem('skillList')
    const savedEducation = localStorage.getItem('educationList')

    this.experienceList = savedExperience ? JSON.parse(savedExperience) : []
    this.certificateList = savedCertificates ? JSON.parse(savedCertificates) : []
    this.projectList = savedProjects ? JSON.parse(savedProjects) : []
    this.skillList = savedSkills ? JSON.parse(savedSkills) : []
    this.educationList = savedEducation ? JSON.parse(savedEducation) : []
  }
}
</script>

<style scoped>
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
</style>
