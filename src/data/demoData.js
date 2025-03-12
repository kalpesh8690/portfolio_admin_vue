// Demo data for the portfolio admin dashboard

export const profileData = {
  firstName: "John",
  lastName: "Doe",
  title: "Senior Software Engineer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  bio: "Experienced software engineer with a passion for building scalable web applications and mentoring junior developers. Specialized in full-stack development with expertise in modern JavaScript frameworks and cloud technologies.",
  avatar: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1741821934~exp=1741825534~hmac=4655b5d0c3892ca21e12cc88f558a501a6c17e74f6f6ed67c1d7ec56a763f6d7&w=900",
  availability: "Open to opportunities",
  interests: [
    "Cloud Computing",
    "Web Development",
    "Open Source",
    "Tech Mentoring"
  ]
}

export const skillsData = [
  {
    skillName: "Vue.js",
    category: "Frontend Development",
    proficiency: 4,
    description: "Building scalable and responsive web applications using Vue.js framework. Experience with Vue Router, Vuex, and Vue CLI.",
    relatedProjects: "Portfolio Admin Dashboard, E-commerce Platform",
    certifications: "Vue.js Developer Certification"
  },
  {
    skillName: "Node.js",
    category: "Backend Development",
    proficiency: 4,
    description: "Server-side development using Node.js and Express.js. Experience with RESTful APIs and database integration.",
    relatedProjects: "API Gateway, Content Management System",
    certifications: "Node.js Developer Certification"
  },
  {
    skillName: "React",
    category: "Frontend Development",
    proficiency: 5,
    description: "Developing modern web applications using React and its ecosystem. Proficient in React Hooks, Redux, and Next.js.",
    relatedProjects: "Social Media Dashboard, Online Learning Platform",
    certifications: "Meta React Developer"
  },
  {
    skillName: "AWS",
    category: "Cloud Computing",
    proficiency: 3,
    description: "Cloud infrastructure management using AWS services. Experience with EC2, S3, Lambda, and CloudFormation.",
    relatedProjects: "Serverless Application, Cloud Storage Solution",
    certifications: "AWS Certified Developer Associate"
  }
];

export const certificatesData = [
  {
    name: "AWS Certified Developer Associate",
    category: "Cloud Computing",
    issuer: "Amazon Web Services",
    issueDate: "2023-06-15",
    expiryDate: "2026-06-15",
    credentialId: "AWS-DEV-123456",
    credentialUrl: "https://aws.amazon.com/verification",
    description: "Comprehensive certification covering AWS services, architecture, and best practices for cloud development."
  },
  {
    name: "Meta React Developer",
    category: "Frontend Development",
    issuer: "Meta",
    issueDate: "2023-09-01",
    credentialId: "META-REACT-789012",
    credentialUrl: "https://meta.com/certificates/verify",
    description: "Advanced React development certification covering modern React patterns, performance optimization, and best practices."
  },
  {
    name: "Google Cloud Professional Developer",
    category: "Cloud Computing",
    issuer: "Google",
    issueDate: "2023-03-10",
    expiryDate: "2025-03-10",
    credentialId: "GCP-DEV-345678",
    credentialUrl: "https://google.com/certificates/verify",
    description: "Professional certification for developing applications on Google Cloud Platform."
  }
];

export const educationData = [
  {
    institution: "Stanford University",
    degree: "Master of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2020-09-01",
    endDate: "2022-06-30",
    description: "Specialized in Artificial Intelligence and Machine Learning. Completed thesis on Deep Learning applications in Natural Language Processing."
  },
  {
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Engineering",
    startDate: "2016-09-01",
    endDate: "2020-05-30",
    description: "Major in Computer Engineering with minor in Mathematics. Active member of the ACM student chapter."
  }
];

export const experienceData = [
  {
    companyName: "Google",
    position: "Senior Software Engineer",
    location: "Mountain View, CA",
    employmentType: "Full-time",
    startDate: "2022-07-01",
    description: "Leading the development of cloud-native applications and services. Mentoring junior developers and contributing to system architecture decisions.",
    technologies: "Google Cloud Platform, Kubernetes, Go, Python"
  },
  {
    companyName: "Microsoft",
    position: "Software Engineer",
    location: "Redmond, WA",
    employmentType: "Full-time",
    startDate: "2020-06-01",
    endDate: "2022-06-30",
    description: "Developed and maintained cloud services for Azure platform. Implemented microservices architecture and improved system reliability.",
    technologies: "Azure, .NET Core, C#, Docker"
  },
  {
    companyName: "Amazon",
    position: "Software Development Engineer",
    location: "Seattle, WA",
    employmentType: "Full-time",
    startDate: "2018-08-01",
    endDate: "2020-05-30",
    description: "Worked on AWS Lambda service team. Implemented new features and improved service performance.",
    technologies: "AWS, Java, Node.js, DynamoDB"
  }
];

export const projectsData = [
  {
    projectName: "Cloud-Native E-commerce Platform",
    projectType: "Full-stack Application",
    projectUrl: "https://github.com/username/ecommerce-platform",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    description: "Developed a scalable e-commerce platform using microservices architecture. Implemented features like product catalog, shopping cart, and payment processing.",
    technologies: "React, Node.js, MongoDB, Docker, Kubernetes",
    features: "Product management, Order processing, Payment integration, Analytics dashboard"
  },
  {
    projectName: "AI-Powered Content Management System",
    projectType: "Web Application",
    projectUrl: "https://github.com/username/ai-cms",
    startDate: "2022-07-01",
    endDate: "2022-12-31",
    description: "Built a modern CMS with AI capabilities for content optimization and automated tagging.",
    technologies: "Vue.js, Python, TensorFlow, PostgreSQL",
    features: "Content editing, AI-powered suggestions, SEO optimization, Analytics"
  },
  {
    projectName: "Real-time Collaboration Tool",
    projectType: "SaaS Application",
    projectUrl: "https://github.com/username/collab-tool",
    startDate: "2023-07-01",
    description: "Building a real-time collaboration platform for remote teams with features like document sharing and video conferencing.",
    technologies: "React, WebRTC, Socket.io, Express.js, MongoDB",
    features: "Real-time document editing, Video calls, Chat, File sharing"
  }
]; 