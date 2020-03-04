<template>
  <div class="home">
    <Status></Status>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted() {
    this.$ga.page({
      page: this.$route.path,
      title: "Home",
      location: window.location.href
    });
  }
};
</script>
