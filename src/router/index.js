import VueRouter from "vue-router";
import routes from "./routes";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // You can replace this with your auth check
  
  // Handle public routes (like login)
  if (to.matched.some(record => record.meta.public)) {
    if (isAuthenticated && to.name === 'login') {
      // If already authenticated and trying to access login, redirect to dashboard
      return next({ name: 'dashboard' })
    }
    return next()
  }

  // Handle protected routes
  if (!isAuthenticated) {
    // Save the location we were trying to access
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }

  // If authenticated and accessing a protected route, allow access
  return next()
})

export default router;
