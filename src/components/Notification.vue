<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" absolute>
      <div class="notification">
        <v-icon :color="icon_color" style="font-size: 3.5vh; margin-right: 2vw">{{ icon }}</v-icon>
        <p>
          {{ text }}
        </p>
        <v-icon
          :color="icon_color"
          style="margin-left: 2vw"
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
    text: String,
    type: String,
    id: Number,
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
        this.$emit("end", this.id);
      }
    },
  },
  computed: {
    color() {
      if (this.type === "points") {
        return "#FFE785";
      } else if (this.type === "success") {
        return "#C0FFBC";
      } else if (this.type === "error") {
        return "#FFBCBC";
      } else {
        return "";
      }
    },
    icon() {
      if (this.type === "points") {
        return "mdi-trophy";
      } else if (this.type === "success") {
        return "mdi-check";
      } else if (this.type === "error") {
        return "mdi-alert";
      } else {
        return "";
      }
    },
    icon_color() {
      if (this.type === "points") {
        return "#FFB300";
      } else if (this.type === "success") {
        return "green";
      } else if (this.type === "error") {
        return "red";
      } else {
        return "";
      }
    },
  },
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
  text-align: left;
  line-height: 2.7vh;
}
</style>
