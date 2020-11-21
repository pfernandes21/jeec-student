<template>
  <div class="team-reward">
    <center>
      <p class="name">{{ rewards[model].name }}</p>

      <v-carousel
        v-model="model"
        style="height: 31vh"
        hide-delimiters
        hide-delimiter-background
      >
        <v-carousel-item v-for="(reward, i) in rewards" :key="i"
          ><div class="image"><img :src="reward.src" alt="reward" /></div
        ></v-carousel-item>
      </v-carousel>

      <p class="level">Level {{ rewards[model].level }}</p>

      <Expbar
        :xp="xp"
        :progress="5"
        :end_points="rewards[model].level * 100"
        width="65vw"
      />

    </center>
  </div>
</template>

<script>
import Expbar from "@/components/Expbar.vue";

export default {
  name: "TeamReward",
  components: {
    Expbar,
  },
  props: {
    name: String,
    rewards: Array,
    xp: Number,
  },
  data() {
    return {
      model: 0,
    };
  },
};
</script>

<style scoped>
.team-reward {
  font-weight: 600;
}

.name {
  font-size: 4vh;
  margin: 0;
  margin-top: 2vh;
}

.image {
  align-self: center;
  position: relative;
  width: 25vh;
  height: 25vh;
  border-radius: 50%;
  border: 0.7vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.7vh #27ade4;
  margin: 3vh;
  padding: 1vh;
  background-color: white;
}

.image img {
  position: absolute;
  margin: auto;
  height: 16vh;
  width: 16vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.level {
  font-size: 5vh;
}
</style>
