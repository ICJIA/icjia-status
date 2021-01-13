<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" height="200px">
        <div class="py-5" style="">
          You're using
          <span style="font-weight: 900">Internet Explorer</span>.<br />
          Internet Explorer
          <span style="font-weight: 900">will not</span> display the R3 website
          correctly. ICJIA recommends updating to a secure, modern browser.<br />Please
          download the latest version of
          <a
            class="warning-link"
            href="https://www.google.com/chrome"
            target="_blank"
            rel="noreferrer"
            >Chrome</a
          >,
          <a
            href="https://www.mozilla.org/en-US/firefox/new/"
            target="_blank"
            rel="noreferrer"
            class="warning-link"
            >Firefox</a
          >, or
          <a
            href="https://www.microsoft.com/en-us/windows/microsoft-edge"
            rel="noreferrer"
            target="_blank"
            class="warning-link"
            >Microsoft Edge</a
          >.
          <br />
          <v-btn class="mt-6" color="error" @click="closeWarning">got it</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheet: true,
    };
  },
  methods: {
    closeWarning() {
      this.$store.dispatch("warningSeen", true);
      this.sheet = !this.sheet;
    },
  },
};
</script>

<style lang="scss" scoped></style>
