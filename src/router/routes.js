import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import LoginPage from "@/pages/Login.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "admin-profile" */ "@/pages/Profile.vue");
const Settings = () =>
  import(/* webpackChunkName: "settings" */ "@/pages/Settings.vue");
const Education = () =>
  import(/* webpackChunkName: "education" */ "@/pages/Education.vue");
const Experience = () =>
  import(/* webpackChunkName: "experience" */ "@/pages/Experience.vue");
const Notifications = () =>
  import(/* webpackChunkName: "admin-notifications" */ "@/pages/Notifications.vue");
const Projects = () =>
  import(/* webpackChunkName: "projects" */ "@/pages/Projects.vue");
const Skills = () =>
  import(/* webpackChunkName: "skills" */ "@/pages/Skills.vue");
const Certificates = () =>
  import(/* webpackChunkName: "certificates" */ "@/pages/Certificates.vue");

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { public: true }
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
      },
      {
        path: "education",
        name: "education",
        component: Education,
      },
      {
        path: "experience",
        name: "experience",
        component: Experience,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "projects",
        name: "projects",
        component: Projects,
      },
      {
        path: "skills",
        name: "skills",
        component: Skills,
      },
      {
        path: "certificates",
        name: "certificates",
        component: Certificates,
      }
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
