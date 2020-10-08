<template>
  <div class="home">
    <div class="mt-8 text-center">
      For more information on status codes, please see:
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
        >https://developer.mozilla.org/en-US/docs/Web/HTTP/Status</a
      >
    </div>
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
