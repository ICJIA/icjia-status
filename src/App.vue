<template>
  <v-app>
    <AppNav></AppNav>

    <v-content>
      <Corona v-if="$myApp.config.showCoronaInfo"></Corona>
      <router-view></router-view>
    </v-content>
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
      coronaContent: null
    };
  }
};
</script>
