<template>
  <div class="personal-reward" v-if="levels[model]">
    <center>
      <p class="name">
        {{ levels[model].reward ? levels[model].reward.name : " " }}
      </p>

      <v-carousel
        v-model="model"
        style="height: 31vh"
        hide-delimiters
        hide-delimiter-background
      >
        <v-carousel-item v-for="(level, i) in levels" :key="i"
          ><div
            class="image"
            :class="[
              user_level > levels[model].value ? 'image_done' : '',
              user_level < levels[model].value ? 'next_reward' : '',
            ]"
          >
            <img
              v-if="level.reward"
              :class="{ next_image: user_level < levels[model].value }"
              :src="jeec_brain_url + level.reward.image"
              alt="reward"
            /></div
        ></v-carousel-item>
      </v-carousel>

      <p
        class="level"
        :class="{ level_done: user_level > levels[model].value }"
      >
        Level {{ levels[model].value }}
      </p>

      <Expbar
        v-if="user_level == levels[model].value"
        :xp="user_points"
        :progress="user_points / levels[model].end_points"
        :end_points="levels[model].end_points"
        width="65vw"
      />

      <div v-if="user_level > levels[model].value" class="done">Done!</div>

      <div v-if="user_level < levels[model].value" class="points">
        {{ user_points }}/{{ levels[model].end_points }} points
      </div>
    </center>
  </div>
</template>

<script>
import Expbar from "@/components/Expbar.vue";

export default {
  name: "PersonalRewards",
  components: {
    Expbar,
  },
  props: {
    levels: Array,
    user_points: Number,
    user_level: Number,
  },
  data() {
    return {
      model: 0,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
};
</script>

<style scoped>
.personal-reward {
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
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.7vh #27aee4bf;
  margin: 3vh;
  padding: 1vh;
  background-color: white;
  overflow: hidden;
}

.image_done {
  border: 0.5vh solid rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 2.5vh 0.7vh rgba(0, 0, 0, 0.261);
}

.image img {
  position: absolute;
  margin: auto;
  max-height: 20vh;
  max-width: 20vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.next_reward {
  border: 0.5vh solid rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 2.5vh 0.7vh rgba(0, 0, 0, 0.261);
}

.next_reward,
.next_image {
  filter: gray;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
  filter: blur(1px);
}

.level {
  font-size: 5vh;
  margin: 0;
}

.level_done {
  color: rgba(0, 0, 0, 0.44);
}

.done {
  font-size: 3.3vh;
  font-weight: 700;
  color: rgba(88, 185, 224, 0.638);
  line-height: 2vh;
}

.points {
  line-height: 1.7vh;
  font-size: 2.2vh;
  font-weight: 700;
}
</style>
