<template>
  <div>
    <v-app-bar app clipped-left color="white" height="90">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-2 mr-2 hover"
          contain
          :src="require('@/assets/img/icjia-logo-blue.png')"
          transition="scale-transition"
          :width="logoWidth()"
          @click="
            $router.push('/').catch((err) => {
              $vuetify.goTo(0);
            })
          "
        />
        <div
          class="ml-4 hover"
          :class="{
            smallTitle:
              this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs,
            largeTitle:
              this.$vuetify.breakpoint.md ||
              this.$vuetify.breakpoint.lg ||
              this.$vuetify.breakpoint.xl,
          }"
          style="font-weight: 900; text-transform: uppercase"
          @click="
            $router.push('/').catch((err) => {
              $vuetify.goTo(0);
            })
          "
        >
          {{ appTitle }}
        </div>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
// import _ from "lodash";
// import { EventBus } from "@/event-bus";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    appTitle() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs) {
        return this.$myApp.config.siteTitleMobile;
      } else {
        return this.$myApp.config.siteTitle;
      }
    },
  },

  mounted() {},
  props: {},
  methods: {
    logoWidth() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return 70;
      } else {
        return 90;
      }
    },
  },
};
</script>

<style>
.nav-title {
  font-weight: 900;
  font-size: 24px;
}
.nav-title.small {
  font-size: 15px;
}

.v-card.searchCard {
  background: #ccc !important;
}
.smallTitle {
  font-size: 24px !important;
}

.largeTitle {
  font-size: 26px !important;
}
</style>
