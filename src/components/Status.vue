<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div v-if="!loading">
            {{ status }}
          </div>
          <div v-else class="text-center mt-12">
            <v-progress-circular
              indeterminate
              color="primary"
              size="50"
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import NProgress from "nprogress";
export default {
  data() {
    return {
      alert: true,
      loading: true,
      status: null
    };
  },

  async created() {
    this.loading = true;
    NProgress.start();
    let { data } = await axios.get(`${this.$myApp.lambdaPath}/status`);
    this.status = data;
    this.loading = false;
    NProgress.done();
  },
  methods: {},
  props: {}
};
</script>
