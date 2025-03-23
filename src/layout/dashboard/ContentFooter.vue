<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            Admin
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://blog.creative-tim.com"> Blog </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://www.creative-tim.com/license">
            Licenses
          </a>
        </li>
      </ul>
      <div class="copyright">
        © {{ year }} made with <i class="tim-icons icon-heart-2"></i> by
        <a href="https://www.binarcode.com" target="_blank" rel="noopener"
          >Binar Code</a
        >&nbsp;&
        <a href="https://www.creative-tim.com" target="_blank" rel="noopener"
          >Creative Tim</a
        >
        for a better web.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style>
.footer {
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  padding: 1rem 0;
  transition: background-color 0.3s, border-color 0.3s;

  .nav {
    margin-bottom: 0.5rem;

    .nav-item {
      .nav-link {
        color: var(--text-color);
        transition: color 0.3s;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }

  .copyright {
    color: var(--text-color-secondary);
    font-size: 0.875rem;
    transition: color 0.3s;

    a {
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: var(--primary-color-dark);
      }
    }

    .icon-heart-2 {
      color: var(--danger-color);
    }
  }
}
</style>
