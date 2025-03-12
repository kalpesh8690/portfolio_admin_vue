import { 
  skillsData, 
  certificatesData, 
  educationData, 
  experienceData, 
  projectsData,
  profileData
} from '@/data/demoData'

export default function createDemoDataPlugin() {
  return store => {
    // Subscribe to mutations
    store.subscribe((mutation, state) => {
      const [, action] = mutation.type.split('/')

      // Map of actions to their corresponding data and dispatch actions
      const actionMap = {
        'SET_EXPERIENCE_LIST': {
          isEmpty: state.experience.experienceList.length === 0,
          data: experienceData,
          dispatch: 'experience/saveExperience'
        },
        'SET_CERTIFICATE_LIST': {
          isEmpty: state.certificates.certificateList.length === 0,
          data: certificatesData,
          dispatch: 'certificates/saveCertificates'
        },
        'SET_PROJECT_LIST': {
          isEmpty: state.projects.projectList.length === 0,
          data: projectsData,
          dispatch: 'projects/saveProjects'
        },
        'SET_SKILL_LIST': {
          isEmpty: state.skills.skillList.length === 0,
          data: skillsData,
          dispatch: 'skills/saveSkills'
        },
        'SET_EDUCATION_LIST': {
          isEmpty: state.education.educationList.length === 0,
          data: educationData,
          dispatch: 'education/saveEducation'
        },
        'SET_PROFILE': {
          isEmpty: Object.keys(state.profile.profile).every(key => !state.profile.profile[key] || 
            (Array.isArray(state.profile.profile[key]) && state.profile.profile[key].length === 0)),
          data: profileData,
          dispatch: 'profile/saveProfile'
        }
      }

      // If action exists in map and the corresponding list is empty, load demo data
      if (actionMap[action] && actionMap[action].isEmpty) {
        store.dispatch(actionMap[action].dispatch, actionMap[action].data)
      }
    })
  }
} 