<template>
  <div class="expbar" :style="'width:' + width">
    <v-progress-linear
      class="bar"
      :value="progress"
      height="30"
      light
      color="secundary"
      ><p class="xp">{{ xp }} / {{ end_points }}</p></v-progress-linear>
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
