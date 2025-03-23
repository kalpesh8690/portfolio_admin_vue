<template>
  <div class="contact-us full-screen">
    <nav class="navbar navbar-ct-default" role="navigation-demo">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#navigation-example-2"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link :to="{ path: '/' }" class="navbar-brand"
            >Site title</router-link
          >
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navigation-example-2">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link :to="{ path: '/' }">Home</router-link>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-->
    </nav>
    <div class="wrapper wrapper-full-page section content">
      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center">
              <h2 class="title text-danger">404 Not Found</h2>
              <h2 class="title">
                Oops! It seems that this page does not exist.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer-demo">
      <div class="container">
        <nav class="pull-left">
          <ul>
            <li>
              <router-link :to="{ path: '/' }">Home</router-link>
            </li>
            <li>
              <router-link :to="{ path: '/register' }">Register</router-link>
            </li>
          </ul>
        </nav>
        <div class="copyright pull-right">
          &copy; 2018, made with
          <i class="fa fa-heart heart"></i> by Black admin
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
.contact-us {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.navbar {
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  
  .navbar-brand {
    color: var(--text-color);
  }
  
  .nav li a {
    color: var(--text-color);
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.wrapper-full-page {
  background-color: var(--bg-color);
  color: var(--text-color);
  
  .title {
    color: var(--text-color);
    
    &.text-danger {
      color: var(--danger-color);
    }
  }
}

.footer-demo {
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  
  nav ul li a {
    color: var(--text-color);
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  .copyright {
    color: var(--text-color-secondary);
  }
}

/* Add transitions for smooth theme switching */
.contact-us,
.navbar,
.wrapper-full-page,
.footer-demo {
  transition: background-color 0.3s, color 0.3s;
}

.navbar-brand,
.nav li a,
.title,
.footer-demo nav ul li a,
.copyright {
  transition: color 0.3s;
}
</style>
