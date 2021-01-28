<template>
  <div class="expbar" :style="'width:' + width">
    <v-progress-linear
      class="bar"
      :value="progress"
      :height="height"
      light
      color="secundary"
      ><p class="xp">{{ xp }} / {{ end_points }}</p></v-progress-linear
    >
  </div>
</template>

<script>
export default {
  name: "Expbar",
  props: {
    xp: Number,
    progress: Number,
    end_points: Number,
    width: String,
  },
  data: function () {
    return {
      height: 30,
    };
  },
  methods: {
    resize() {
      if (window.innerWidth < 600) {
        this.height = 30;
      } else if (window.innerWidth < 1100) {
        this.height = 35;
      } else {
        this.height = 40;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  mounted() {
    this.resize();
  },
};
</script>

<style scoped>
.bar {
  border-radius: 5vw;
}

.xp {
  margin: 0;
  font-weight: 700;
  font-size: 3vh;
}

@media screen and (max-width: 600px) {
  .xp {
    font-size: 2.5vh;
  }
}
</style>
