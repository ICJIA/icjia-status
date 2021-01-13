<template>
  <div>
    <v-container class="markdown-body">
      <v-row>
        <v-col>
          <div v-if="!loading && items">
            <div
              class="text-left mb-2 mt-2"
              style="font-size: 14px; font-weight: 700"
            >
              Monitoring {{ statusLength }} ICJIA API servers and sites.
            </div>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="-1"
              class="elevation-3 hover mb-8"
              show-expand
              item-key="name"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              @click:row="clicked"
              hide-default-footer
            >
              <template v-slot:item.name="{ item }">
                <strong>{{ item.name }}</strong>
              </template>

              <template v-slot:item.badgeID="{ item }">
                <img
                  v-if="item.badgeID"
                  :src="`https://api.netlify.com/api/v1/badges/${item.badgeID}/deploy-status`"
                  alt="Netlify Status"
                />
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip class="ma-2" dark :color="getStatusColor(item.status)">
                  <strong> {{ item.status }}</strong>
                </v-chip>
              </template>
              <template v-slot:item.url="{ item }">
                <v-btn
                  text
                  small
                  @click.stop="gotoSite(item.url)"
                  v-if="item.displayURL"
                  >SITE
                  <v-icon right>open_in_new</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.github="{ item }">
                <v-btn
                  text
                  small
                  @click.stop="gotoSite(item.github)"
                  v-if="item.github"
                >
                  <v-icon>fab fa-github</v-icon>
                </v-btn>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length + 2">
                  <v-card class="py-2" color="grey lighten-4">
                    <div class="px-5 py-5">
                      <h2
                        style="
                          margin: 0;
                          padding: 5px;
                          font-size: 14px;
                          color: #222;
                        "
                        class="mb-5"
                      >
                        STATUS RESPONSE:
                      </h2>
                      <div style="12px;">{{ item }}</div>
                    </div>
                  </v-card>
                </td>
              </template>
            </v-data-table>
          </div>
          <div v-if="loading" class="text-center mt-12">
            <div style="font-weight: 900; font-size: 14px">Fetching status</div>
            <v-progress-circular
              indeterminate
              color="primary"
              size="50"
              class="mt-12"
            ></v-progress-circular>
          </div>
          <div v-if="errorMsg && !items" class="text-center">
            <v-alert type="error"> {{ errorMsg }} </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import NProgress from "nprogress";
export default {
  data() {
    return {
      alert: true,
      loading: true,
      items: null,
      errorMsg: null,
      expanded: [],
      singleExpand: true,
      statusLength: null,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },

        { text: "Status", value: "status", align: "center" },
        { text: "Response", value: "duration", align: "center" },
        { text: "Build Status", value: "badgeID", align: "center" },
        { text: "Github", value: "github", align: "center" },
        { text: "URL", value: "url", align: "center" },
      ],
    };
  },

  async created() {
    this.loading = true;
    NProgress.start();
    try {
      let { data } = await axios.get(`${this.$myApp.config.statusServerURL}`);
      let status = data;

      let items = status.map((item) => {
        if (typeof item.status === "object") {
          if (item.status.code) {
            item.status = item.status.code;
          } else {
            item.status = null;
          }
        }

        item.url = `${item.proto}://${item.options.hostname}`;

        if (item.category !== "api") {
          item.url = item.url + item.options.path;
        }

        return item;
      });
      this.items = _.orderBy(items, "name", "asc");
      this.statusLength = this.items.length;
    } catch (e) {
      this.errorMsg = e.toString();
    }

    this.loading = false;
    NProgress.done();
  },
  methods: {
    gotoSite(url) {
      window.open(url);
    },
    getStatusColor(status) {
      if (this.$myApp.config.greenStatus.includes(status)) {
        return "green darken-2";
      } else {
        return "red darken-2";
      }
    },

    clicked(value) {
      if (value === this.expanded[0]) {
        this.expanded = [];
      } else {
        if (this.expanded.length) {
          this.expanded.shift();
          this.expanded.push(value);
        } else {
          this.expanded.push(value);
        }
      }
    },
  },
  props: {},
};
</script>

<style>
td {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.02);
}
.bold {
  font-weight: bold;
}
</style>
