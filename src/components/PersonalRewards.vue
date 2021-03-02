<template>
  <div class="personal-reward" v-if="levels[model]">
    <center>
      <p class="name">
        {{ levels[model].reward ? levels[model].reward.name : " " }}
      </p>

      <v-carousel
        v-model="model"
        hide-delimiter-background
        hide-delimiters
        :style="xpbar_width === '65vw' ? 'height:30vh' : 'height:35vh'"
      >
        <template v-slot:prev="{ on, attrs }">
          <v-btn
            depressed
            color="#27ADE4"
            class="arrow-btn"
            v-bind="attrs"
            v-on="on"
            ><v-icon class="arrow" color="blue">mdi-chevron-left</v-icon></v-btn
          >
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn
            depressed
            color="#27ADE4"
            class="arrow-btn"
            v-bind="attrs"
            v-on="on"
            ><v-icon class="arrow" color="blue"
              >mdi-chevron-right</v-icon
            ></v-btn
          >
        </template>

        <div class="image-wrapper browser">
          <div
            class="image first"
            :class="[
              user_points >= levels[image_index(model - 1)].end_points
                ? 'image_done'
                : '',
              user_level < levels[image_index(model - 1)].value
                ? 'next_reward'
                : '',
            ]"
            :style="
              'background-image:' +
              'url(' +
              jeec_brain_url +
              levels[image_index(model - 1)].reward.image +
              ')'
            "
          ></div>
          <span class="rect"></span>
          <div
            class="image second"
            :class="[
              user_points >= levels[model].end_points ? 'image_done' : '',
              user_level < levels[model].value ? 'next_reward' : '',
            ]"
            :style="
              'background-image:' +
              'url(' +
              jeec_brain_url +
              levels[model].reward.image +
              ')'
            "
          ></div>
          <span class="rect"></span>
          <div
            class="image third"
            :class="[
              user_points >= levels[image_index(model + 1)].end_points
                ? 'image_done'
                : '',
              user_level < levels[image_index(model + 1)].value
                ? 'next_reward'
                : '',
            ]"
            :style="
              'background-image:' +
              'url(' +
              jeec_brain_url +
              levels[image_index(model + 1)].reward.image +
              ')'
            "
          ></div>
        </div>
        <v-carousel-item v-for="(level, i) in levels" :key="i" class="mobile">
          <div class="image-wrapper">
            <div
              class="image"
              :class="[
                user_points >= levels[model].end_points ? 'image_done' : '',
                user_level < levels[model].value ? 'next_reward' : '',
              ]"
              :style="
                'background-image:' +
                'url(' +
                jeec_brain_url +
                level.reward.image +
                ')'
              "
            ></div>
          </div>
        </v-carousel-item>
      </v-carousel>

      <div class="other-points">
        <div>
          <p
            class="level"
            :class="{
              level_done:
                user_points >= levels[image_index(model - 1)].end_points,
            }"
          >
            Level {{ levels[image_index(model - 1)].value }}
          </p>
          <div
            v-if="user_points >= levels[image_index(model - 1)].end_points"
            class="done"
          >
            Done!
          </div>

          <div
            v-if="user_level < levels[image_index(model - 1)].value"
            class="points"
          >
            {{ user_points }}/{{ levels[image_index(model - 1)].end_points }}
            points
          </div>
        </div>

        <div>
          <p
            class="level"
            :class="{
              level_done:
                user_points >= levels[image_index(model + 1)].end_points,
            }"
          >
            Level {{ levels[image_index(model + 1)].value }}
          </p>
          <div
            v-if="user_points >= levels[image_index(model + 1)].end_points"
            class="done"
          >
            Done!
          </div>

          <div
            v-if="user_level < levels[image_index(model + 1)].value"
            class="points"
          >
            {{ user_points }}/{{ levels[image_index(model + 1)].end_points }}
            points
          </div>
        </div>
      </div>

      <p
        class="level"
        :class="{ level_done: user_points >= levels[model].end_points }"
      >
        Level {{ levels[model].value }}
      </p>

      <div v-if="user_points >= levels[model].end_points" class="done">
        Done!
      </div>

      <Expbar
        v-if="user_level === levels[model].value"
        :xp="user_points"
        :progress="(user_points / levels[model].end_points) * 100"
        :end_points="levels[model].end_points"
        class="xpbar"
        :width="xpbar_width"
        :height="height"
      />

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
      model: this.user_level ? this.user_level - 1 : 0,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      xpbar_width: "65vw",
      height: 30,
    };
  },
  methods: {
    image_index(i) {
      return (i + this.levels.length) % this.levels.length;
    },
    resize() {
      if (window.innerWidth < 1100) {
        this.xpbar_width = "65vw";
      } else {
        this.xpbar_width = "40vw";
      }

      if (window.innerWidth < 600) {
        this.height = 30;
      } else if (window.innerWidth < 1100) {
        this.height = 35;
      } else if (window.innerWidth < 1500) {
        this.height = 45;
      } else {
        this.height = 60;
      }
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);

    this.resize();
  },
};
</script>

<style scoped>
.personal-reward {
  font-weight: 600;
}

.name {
  font-size: 5.5vh;
  line-height: 5.5vh;
  min-height: 11vh;
  margin: 0;
  margin-top: 2vh;
  color: black;
}

.arrow-btn {
  width: 0 !important;
  height: 0 !important;
}

.arrow {
  font-size: 15vh !important;
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
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
}

.image_done {
  border: 0.5vh solid #27e453;
  box-shadow: 0 0 2.5vh 0.7vh #27e453;
}

.next_reward {
  border: 0.5vh solid rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 2.5vh 0.7vh rgba(0, 0, 0, 0.261);
  filter: gray;
  -webkit-filter: grayscale(10);
  filter: grayscale(10);
  /* filter: blur(2px); */
}

.level {
  font-size: 5vh;
  margin: 0;
  color: black;
}

.level_done {
  color: #27ade4;
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
  color: black;
}

@media screen and (max-width: 1100px) {
  .first,
  .third,
  .rect,
  .other-points,
  .browser {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .mobile {
    display: none;
  }

  /* .name {
    margin-bottom: 2vh;
  } */

  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .first,
  .third {
    height: 18vh;
    width: 18vh;
  }

  .second {
    height: 28vh;
    width: 28vh;
  }

  .rect {
    width: 10vw;
    margin-left: -5vw;
    margin-right: -5vw;
    height: 0.5vh;
    background-color: #27ade4;
  }

  .level {
    margin-top: 1vh;
  }

  .xpbar {
    margin-top: 1vh;
  }

  .other-points {
    width: 82vh;
    display: flex;
    justify-content: space-between;
    margin-top: -6vh;
  }

  .other-points > div {
    width: 24vh;
  }

  .other-points .level {
    font-size: 3vh;
  }

  .other-points .points,
  .other-points .done {
    font-size: 2vh;
  }
}
</style>
