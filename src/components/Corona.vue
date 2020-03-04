<template>
  <v-alert v-model="alert" text dismissible color="info" class="mb-0">
    <span style="color: #000 !important">
      <v-icon color="red">error</v-icon>
      <span v-if="loading"
        ><v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular
      ></span>
      <span v-else v-html="corona.html"></span>
    </span>
  </v-alert>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      alert: true,
      loading: true,
      corona: null
    };
  },
  async created() {
    this.loading = true;
    let { data } = await axios.get(`${this.$myApp.lambdaPath}/corona`);
    this.corona = data;
    this.loading = false;
  },
  methods: {
    reset() {
      this.alert = true;
    }
  },
  props: {}
};
</script>
