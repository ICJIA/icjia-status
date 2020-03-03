<template>
  <div>
    <v-app-bar app clipped-left :flat="flat" color="white" height="90">
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        aria-label="Click to toggle menu"
      />
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-2 mr-2 hover"
          contain
          :src="require('@/assets/img/icjia-logo-blue.png')"
          transition="scale-transition"
          :width="logoWidth()"
          @click="
            $router.push('/').catch(err => {
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
              this.$vuetify.breakpoint.xl
          }"
          style="font-weight: 900; text-transform: uppercase"
          @click="
            $router.push('/').catch(err => {
              $vuetify.goTo(0);
            })
          "
        >
          {{ appTitle }}
        </div>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        :to="link.path === '/home' ? '/' : `${link.path}`"
        text
        class="hidden-sm-and-down"
        style="font-weight: 900"
        :aria-label="link.attributes.title"
        v-for="link in nav"
        :key="link.attributes.title"
      >
        <span v-if="link.attributes.menuTitle" style="font-size: 12px">{{
          link.attributes.menuTitle
        }}</span>
        <span v-else style="font-size: 12px">{{ link.attributes.title }}</span>
      </v-btn>

      <v-col class="hidden-sm-and-down">
        <div style="width: 250px" class="">
          <Search></Search>
        </div>
      </v-col>
      <v-btn text @click="toggleSearch()" class="hidden-md-and-up">
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus";
export default {
  data() {
    return {
      extended: false,
      flat: false,
      dialog: false,
      nav: []
    };
  },
  created() {
    let nav = [];
    this.siteMeta.forEach(item => {
      if (item.attributes.showInNav) nav.push(item);
    });
    let sortedNav = _.orderBy(nav, ["attributes.menuRank"], ["asc"]);
    //console.log(nav);

    this.nav = sortedNav;
  },
  computed: {
    addAppAttr() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs) {
        return false;
      } else {
        return true;
      }
    },
    appTitle() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs) {
        return this.$myApp.config.siteTitleMobile;
      } else {
        return this.$myApp.config.siteTitle;
      }
    }
  },

  mounted() {
    EventBus.$on("unflattenNav", () => {
      this.flat = false;
    });
    document.addEventListener("DOMContentLoaded", () => {
      let arr = [
        ...document.getElementsByClassName("v-carousel__controls__item")
      ];
      arr.forEach(item => {
        item.setAttribute("aria-label", "navigation button");
      });
    });
  },
  props: {
    siteMeta: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toggleSearch() {
      this.$router.push("/search").catch(() => {
        this.$vuetify.goTo(0);
      });
    },
    toggleDrawer() {
      EventBus.$emit("toggleDrawer");
    },
    logoWidth() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return 70;
      } else {
        return 90;
      }
    }
  }
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
