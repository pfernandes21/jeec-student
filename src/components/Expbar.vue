<template>
  <div class="expbar" :style="'width:' + width">
    <v-progress-linear
      class="bar"
      v-model="xp"
      height="30"
      light
      color="secundary"
      ><p class="xp">{{ xp }} / {{ next_xp }}</p></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "Expbar",
  props: {
    xp: Number,
    next_xp: Number,
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
