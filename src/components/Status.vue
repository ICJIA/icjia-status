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
              class="elevation-1 hover"
              show-expand
              item-key="name"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              @click:row="clicked"
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length + 2">
                  <v-card class="py-2" color="grey lighten-3">
                    <div class="px-5 py-5">
                      <h2
                        style="margin: 0; padding: 5px; font-size: 14px; color: #222"
                        class="mb-5"
                      >
                        Response:
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
              Checking status
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
        { text: "Category", value: "category" },
        { text: "Status", value: "status" },
        { text: "Duration", value: "duration" },
        { text: "", value: "badgeID" }
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
    clicked(value) {
      if (value === this.expanded[0]) {
        this.expanded = [];
      } else {
        if (this.expanded.length) {
          this.expanded.shift();
          this.expanded.push(value);
          //console.log("send preview event here: ", this.expanded[0].title);
          if (this.expanded[0].title) {
            // this.$ga.event({
            //   eventCategory: "Resource",
            //   eventAction: "Preview",
            //   eventLabel: "Preview: " + this.expanded[0].title
            // });
          }
        } else {
          this.expanded.push(value);
          //console.log("send preview event here: ", this.expanded[0].title);
          if (this.expanded[0].title) {
            // this.$ga.event({
            //   eventCategory: "Resource",
            //   eventAction: "Preview",
            //   eventLabel: "Preview: " + this.expanded[0].title
            // });
          }
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
