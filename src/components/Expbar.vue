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
    height: {
      type: Number,
      default: 30,
    },
  },
  data: function () {
    return {};
  },
  mounted() {
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
