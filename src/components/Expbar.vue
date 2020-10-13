<template>
  <div class="expbar">
    <v-progress-linear
      class="bar"
      v-model="xp"
      height="30"
      light
      color="secundary"
      >{{ xp }}</v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "Expbar",
  props: {
    xp: Number,
  },
};
</script>

<style scoped>
.expbar {
  width: 50%;
}

.bar {
  border-radius: 5vw;
}
</style>
