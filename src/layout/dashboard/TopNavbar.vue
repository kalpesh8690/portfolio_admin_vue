<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#">{{ routeName }}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav ml-auto">
            <!-- Search -->
            <li class="search-bar input-group">
              <button
                class="btn btn-link"
                id="search-button"
                @click="searchModalVisible = true"
              >
                <i class="tim-icons icon-zoom-split"></i>
                <span class="d-lg-none d-md-block">Search</span>
              </button>
            </li>

            <!-- Notifications -->
            <base-dropdown
              tag="li"
              title-tag="a"
              class="nav-item"
            >
              <template slot="title">
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-sound-wave"></i>
                <p class="d-lg-none">Notifications</p>
              </template>
              <a href="#" class="dropdown-item">
                <i class="tim-icons icon-bell-55"></i> New order received
              </a>
              <a href="#" class="dropdown-item">
                <i class="tim-icons icon-chart-pie-36"></i> Sales report is ready
              </a>
              <a href="#" class="dropdown-item">
                <i class="tim-icons icon-single-02"></i> 5 new users joined
              </a>
              <a href="#" class="dropdown-item">
                <i class="tim-icons icon-pin"></i> Server maintenance scheduled
              </a>
            </base-dropdown>

            <!-- User Profile -->
            <base-dropdown
              tag="li"
              title-tag="a"
              class="nav-item"
              menu-classes="dropdown-navbar"
            >
              <template slot="title">
                <div class="photo">
                  <img :src="profile.avatar" :alt="fullName" />
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">{{ fullName }}</p>
              </template>
              <div class="dropdown-header">
                <div class="profile-info">
                  <h6>{{ fullName }}</h6>
                  <p>{{ profile.title }}</p>
                </div>
              </div>
              <router-link to="/profile" class="dropdown-item">
                <i class="tim-icons icon-single-02"></i> My Profile
              </router-link>
              <a href="#" class="dropdown-item">
                <i class="tim-icons icon-settings-gear-63"></i> Settings
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">
                <i class="tim-icons icon-log-out"></i> Log out
              </a>
            </base-dropdown>
          </ul>
        </div>
      </collapse-transition>
    </div>

    <!-- Search Modal -->
    <modal
      :show.sync="searchModalVisible"
      class="modal-search"
      id="searchModal"
      :centered="false"
      :show-close="true"
    >
      <input
        slot="header"
        v-model="searchQuery"
        type="text"
        class="form-control"
        id="inlineFormInputGroup"
        placeholder="SEARCH"
        @keyup.enter="performSearch"
      />
    </modal>
  </nav>
</template>

<script>
import { CollapseTransition } from "vue2-transitions";
import Modal from "@/components/Modal";
import { mapGetters } from 'vuex';

export default {
  components: {
    CollapseTransition,
    Modal,
  },
  computed: {
    ...mapGetters('profile', [
      'fullName',
      'profile'
    ]),
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    performSearch() {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
      this.searchModalVisible = false;
      this.searchQuery = '';
    }
  },
};
</script>

<style lang="scss">
.navbar {
  .photo {
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    vertical-align: middle;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dropdown-navbar {
    .dropdown-item {
      i {
        margin-right: 10px;
      }
    }

    .dropdown-header {
      padding: 10px 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      
      .profile-info {
        h6 {
          margin: 0;
          color: #222a42;
          font-weight: 600;
        }
        
        p {
          margin: 0;
          font-size: 0.8em;
          color: #9A9A9A;
        }
      }
    }
  }

  .notification {
    position: absolute;
    top: 5px;
    border: 1px solid #e14eca;
    right: 10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #e14eca;
  }
}

.modal-search {
  .modal-dialog {
    max-width: 100%;
    margin: 0;
    margin-top: 0;
  }

  .modal-content {
    background-color: transparent;
    border: none;
  }

  .modal-header {
    padding: 0;
    border: none;

    input {
      padding: 20px;
      font-size: 24px;
      background: rgba(255, 255, 255, 0.95);
      border: none;
      border-radius: 0;

      &:focus {
        box-shadow: none;
        border: none;
      }
    }
  }
}
</style>
