<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
export default {
  name: "DashboardContent",
  components: {
    FadeTransition,
  },
};
</script>

<style>
.content {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  min-height: calc(100vh - 70px - 60px); // viewport height - navbar - footer
}
</style>
