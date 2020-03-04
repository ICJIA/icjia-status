<template>
  <div>
    <v-container class="markdown-body">
      <v-row>
        <v-col>
          <div v-if="!loading">
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="-1"
              class="elevation-3 hover my-8"
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
                <span v-html="generateNetlifyBadge(item)"></span>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip class="ma-2" dark :color="getStatusColor(item.status)">
                  <strong> {{ item.status }}</strong>
                </v-chip>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length + 2">
                  <v-card class="py-2" color="grey lighten-4">
                    <div class="px-5 py-5">
                      <h2
                        style="margin: 0; padding: 5px; font-size: 14px; color: #222"
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
          <div v-else class="text-center mt-12">
            <div style="font-weight: 900; font-size: 14px;">
              Fetching status
            </div>
            <v-progress-circular
              indeterminate
              color="primary"
              size="50"
              class="mt-12"
            ></v-progress-circular>
          </div>
          <div v-if="errorMsg" class="text-center">
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
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name"
        },

        { text: "Status", value: "status", align: "center" },
        { text: "Response", value: "duration", align: "center" },
        { text: "Build Status", value: "badgeID", align: "center" }
      ]
    };
  },

  async created() {
    this.loading = true;
    NProgress.start();
    try {
      let { data } = await axios.get(`${this.$myApp.lambdaPath}/status`);
      let status = data;

      let items = status.map(item => {
        if (typeof item.status === "object") {
          if (item.status.code) {
            item.status = item.status.code;
          } else {
            item.status = null;
          }
        }

        return item;
      });
      this.items = _.orderBy(items, "name", "asc");
    } catch (e) {
      this.errorMsg = e;
    }

    this.loading = false;
    NProgress.done();
  },
  methods: {
    getStatusColor(status) {
      if (this.$myApp.config.greenStatus.includes(status)) {
        return "green darken-2";
      } else {
        return "red darken-2";
      }
    },
    generateNetlifyBadge(item) {
      if (!item.badgeID) return;
      return `  <img
              src="https://camo.githubusercontent.com/2c5ec3a1c1131650d17ff965fcb971dfe7ecdd58/68747470733a2f2f6170692e6e65746c6966792e636f6d2f6170692f76312f6261646765732f63356262343932392d643430362d346366302d613832632d6538303363336561656233342f6465706c6f792d737461747573"
              alt="Netlify Status"
              data-canonical-src="https://api.netlify.com/api/v1/badges/${item.badgeID}/deploy-status"
              style="max-width:100%;"
            />`;
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
    }
  },
  props: {}
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
