<template>
  <base-card type="user">
    <div slot="header" class="image">
      <img :src="img" alt="..." />
    </div>

    <div class="author">
      <h5 class="title">{{ name }}</h5>
      <p class="description">{{ title }}</p>
    </div>
    <p class="description text-center">
      {{ description }}
    </p>
  </base-card>
</template>

<script>
export default {
  name: "user-card",
  props: {
    name: String,
    title: String,
    description: String,
    img: String
  }
};
</script>

<style></style>
