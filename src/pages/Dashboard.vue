<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <base-card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-category">
                  Total Shipments
                </h5>
                <h2 class="card-title">Performance</h2>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <h4>Performance Statistics</h4>
            <p>Chart visualization removed</p>
          </div>
        </base-card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <base-card type="chart">
          <template slot="header">
            <h5 class="card-category">Total Shipments</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> 763,215
            </h3>
          </template>
          <div class="chart-area">
            <h4>Shipment Statistics</h4>
            <p>Chart visualization removed</p>
          </div>
        </base-card>
      </div>
      <div class="col-lg-4">
        <base-card type="chart">
          <template slot="header">
            <h5 class="card-category">Daily Sales</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info"></i> 3,500€
            </h3>
          </template>
          <div class="chart-area">
            <h4>Daily Sales Statistics</h4>
            <p>Chart visualization removed</p>
          </div>
        </base-card>
      </div>
      <div class="col-lg-4">
        <base-card type="chart">
          <template slot="header">
            <h5 class="card-category">Completed Tasks</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success"></i> 12,100K
            </h3>
          </template>
          <div class="chart-area">
            <h4>Completed Tasks Statistics</h4>
            <p>Chart visualization removed</p>
          </div>
        </base-card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <base-card type="tasks">
          <template slot="header">
            <h6 class="title d-inline">Tasks (5)</h6>
            <p class="card-category d-inline">Today</p>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">Action</a>
              <a class="dropdown-item" href="#pablo">Another Action</a>
              <a class="dropdown-item" href="#pablo">Something else</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </base-card>
      </div>
      <div class="col-lg-6 col-md-12">
        <base-card class="card">
          <h4 slot="header" class="card-title">Simple Table</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>
<script>
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";

export default {
  name: "AdminDashboard",
  components: {
    TaskList,
    UserTable
  },
  data() {
    return {
      // Removed chart-related data
    };
  },
  computed: {
    bigLineChartCategories() {
      return ["Accounts", "Purchases", "Sessions"];
    }
  },
  methods: {
    // Removed chart-related methods
  }
};
</script>
<style></style>
