import axios from 'axios';
import config from '../config/index.js';
import { 
  profileData, 
  skillsData, 
  certificatesData, 
  educationData, 
  experienceData, 
  projectsData 
} from '@/data/demoData';

// Mock API handlers for demo data
const mockAPI = {
  profile: {
    get: () => Promise.resolve({ data: profileData }),
    update: (data) => Promise.resolve({ data }),
  },
  skills: {
    get: () => Promise.resolve({ data: skillsData }),
    create: (data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
    update: (id, data) => Promise.resolve({ data }),
    delete: (id) => Promise.resolve({ data: { id } }),
  },
  certificates: {
    get: () => Promise.resolve({ data: certificatesData }),
    create: (data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
    update: (id, data) => Promise.resolve({ data }),
    delete: (id) => Promise.resolve({ data: { id } }),
  },
  education: {
    get: () => Promise.resolve({ data: educationData }),
    create: (data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
    update: (id, data) => Promise.resolve({ data }),
    delete: (id) => Promise.resolve({ data: { id } }),
  },
  experience: {
    get: () => Promise.resolve({ data: experienceData }),
    create: (data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
    update: (id, data) => Promise.resolve({ data }),
    delete: (id) => Promise.resolve({ data: { id } }),
  },
  projects: {
    get: () => Promise.resolve({ data: projectsData }),
    create: (data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
    update: (id, data) => Promise.resolve({ data }),
    delete: (id) => Promise.resolve({ data: { id } }),
  },
};

// Create axios instance with base URL and default headers
const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(config.storage.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (config.features.enableLogs) {
      console.error('API Error:', error);
    }
    
    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem(config.storage.tokenKey);
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden access
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to determine if we should use mock API
const useMockAPI = () => config.features.enableDemoData || config.features.mockApi;

// Profile API
export const profileAPI = {
  getProfile: () => useMockAPI() 
    ? mockAPI.profile.get()
    : apiClient.get('/profile'),
  updateProfile: (data) => useMockAPI()
    ? mockAPI.profile.update(data)
    : apiClient.put('/profile', data),
};

// Skills API
export const skillsAPI = {
  getSkills: () => useMockAPI()
    ? mockAPI.skills.get()
    : apiClient.get('/skills'),
  createSkill: (data) => useMockAPI()
    ? mockAPI.skills.create(data)
    : apiClient.post('/skills', data),
  updateSkill: (id, data) => useMockAPI()
    ? mockAPI.skills.update(id, data)
    : apiClient.put(`/skills/${id}`, data),
  deleteSkill: (id) => useMockAPI()
    ? mockAPI.skills.delete(id)
    : apiClient.delete(`/skills/${id}`),
};

// Certificates API
export const certificatesAPI = {
  getCertificates: () => useMockAPI()
    ? mockAPI.certificates.get()
    : apiClient.get('/certificates'),
  createCertificate: (data) => useMockAPI()
    ? mockAPI.certificates.create(data)
    : apiClient.post('/certificates', data),
  updateCertificate: (id, data) => useMockAPI()
    ? mockAPI.certificates.update(id, data)
    : apiClient.put(`/certificates/${id}`, data),
  deleteCertificate: (id) => useMockAPI()
    ? mockAPI.certificates.delete(id)
    : apiClient.delete(`/certificates/${id}`),
};

// Education API
export const educationAPI = {
  getEducation: () => useMockAPI()
    ? mockAPI.education.get()
    : apiClient.get('/education'),
  createEducation: (data) => useMockAPI()
    ? mockAPI.education.create(data)
    : apiClient.post('/education', data),
  updateEducation: (id, data) => useMockAPI()
    ? mockAPI.education.update(id, data)
    : apiClient.put(`/education/${id}`, data),
  deleteEducation: (id) => useMockAPI()
    ? mockAPI.education.delete(id)
    : apiClient.delete(`/education/${id}`),
};

// Experience API
export const experienceAPI = {
  getExperience: () => useMockAPI()
    ? mockAPI.experience.get()
    : apiClient.get('/experience'),
  createExperience: (data) => useMockAPI()
    ? mockAPI.experience.create(data)
    : apiClient.post('/experience', data),
  updateExperience: (id, data) => useMockAPI()
    ? mockAPI.experience.update(id, data)
    : apiClient.put(`/experience/${id}`, data),
  deleteExperience: (id) => useMockAPI()
    ? mockAPI.experience.delete(id)
    : apiClient.delete(`/experience/${id}`),
};

// Projects API
export const projectsAPI = {
  getProjects: () => useMockAPI()
    ? mockAPI.projects.get()
    : apiClient.get('/projects'),
  createProject: (data) => useMockAPI()
    ? mockAPI.projects.create(data)
    : apiClient.post('/projects', data),
  updateProject: (id, data) => useMockAPI()
    ? mockAPI.projects.update(id, data)
    : apiClient.put(`/projects/${id}`, data),
  deleteProject: (id) => useMockAPI()
    ? mockAPI.projects.delete(id)
    : apiClient.delete(`/projects/${id}`),
};

export default {
  profile: profileAPI,
  skills: skillsAPI,
  certificates: certificatesAPI,
  education: educationAPI,
  experience: experienceAPI,
  projects: projectsAPI,
}; 