<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="#FFE785" absolute>
      <div class="notification">
        <img src="../assets/icons/trophy.svg" />
        <p>
          {{ notification_text }}
        </p>
        <v-icon
          color="#FFB300"
          style="margin-left: 4vw"
          @click.stop="snackbar = false"
          >mdi-close</v-icon
        >
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification_text: String,
  },
  data: function () {
    return {
      timeout: 5000,
      snackbar: true,
    };
  },
  watch: {
    snackbar(val) {
      if (!val) {
        this.$emit("end", this.notification_text);
      }
    },
  },
  methods: {},
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>

<style scoped>
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5vh;
  font-weight: 600;
  color: black;
}

.notification p {
  margin: 0;
  text-align: justify;
}

.notification img {
  height: 3.5vh;
  filter: invert(70%) sepia(67%) saturate(2300%) hue-rotate(359deg)
    brightness(104%) contrast(104%);
  margin-right: 4vw;
}
</style>
