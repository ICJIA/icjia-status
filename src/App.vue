<template>
  <v-app>
    <AppNav></AppNav>

    <v-main>
      <Corona v-if="$myApp.config.showCoronaInfo"></Corona>
      <h1 class="aria-hidden">ICJIA Status Page</h1>
      <router-view></router-view>
    </v-main>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  mounted() {},

  data() {
    return {
      loading: true,
      coronaContent: null,
    };
  },
};
</script>
