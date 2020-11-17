<template>
  <div class="expbar" :style="'width:' + width">
    <v-progress-linear
      class="bar"
      v-model="progress"
      height="30"
      light
      color="secundary"
      ><p class="xp">{{ xp }} / {{ level.end_points }}</p></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "Expbar",
  props: {
    xp: Number,
    progress: Number,
    level: Object,
    width: String,
  },
};
</script>

<style scoped>
.bar {
  border-radius: 5vw;
}

.xp{
  margin: 0;
  font-weight: 700;
}
</style>
