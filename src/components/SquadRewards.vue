<template>
  <div class="squads-rewards" v-if="squads_rewards">
    <center>
      <p class="date">
        {{ selected_date ? days[selected_date.getDay()] : "" }}
      </p>

      <v-carousel
        v-model="model"
        hide-delimiter-background
        hide-delimiters
        :style="window_width > 1100 ? 'height:30vh' : 'height:35vh'"
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
            <div class="image first" :class="rewardClass(image_index(model - 1))">
              <img
                :src="jeec_brain_url + squads_rewards[image_index(model - 1)].reward.image"
                alt="reward"
              />
              <img
                v-if="rewardClass(image_index(model - 1)) === 'lost_reward'"
                src="../assets/icons/cross.svg"
                class="small-cross"
              />
            </div>

            <span class="rect"></span>

            <div class="image second" :class="rewardClass(model)">
              <img
                :src="jeec_brain_url + squads_rewards[model].reward.image"
                alt="reward"
              />
              <img
                v-if="rewardClass(model) === 'lost_reward'"
                src="../assets/icons/cross.svg"
                class="cross"
              />
            </div>

            <span class="rect"></span>

            <div class="image third" :class="rewardClass(image_index(model + 1))">
              <img
                :src="jeec_brain_url + squads_rewards[image_index(model + 1)].reward.image"
                alt="reward"
              />
              <img
                v-if="rewardClass(image_index(model + 1)) === 'lost_reward'"
                src="../assets/icons/cross.svg"
                class="small-cross"
              />
            </div>
          </div>

        <v-carousel-item v-for="(squad_reward, i) in squads_rewards" :key="i" class="mobile">
          <div class="image-wrapper">
            <div class="image second" :class="rewardClass(i)">
              <img
                :src="jeec_brain_url + squad_reward.reward.image"
                alt="reward"
              />
              <img
                v-if="rewardClass(i) === 'lost_reward'"
                src="../assets/icons/cross.svg"
                class="cross"
              />
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>

      <div class="name">{{ squads_rewards[model].reward.name }}</div>
      <div v-if="squads_rewards[model].winner" class="congratulations">
        Congratulations!
      </div>
      <div
        v-if="
          rewardClass(model) === 'current_reward' || rewardClass(model) === 'future_reward'
        "
        class="today-points"
      >
        Today's Points:
      </div>
      <div v-if="rewardClass(model) === 'current_reward'" class="xp-wrapper">
        <div class="points">{{ squad_points }}</div>
        <div class="xp">xp</div>
      </div>
      <div v-if="rewardClass(model) === 'future_reward'" class="points">--</div>
    </center>
  </div>
</template>

<script>
export default {
  name: "SquadRewards",
  props: {
    squads_rewards: Array,
    squad_points: Number,
  },
  data() {
    return {
      model: 0,
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      now: new Date(),
    };
  },
  computed: {
    window_width() {
      return window.innerHeight;
    },
    selected_date() {
      return this.squads_rewards[this.model]
        ? new Date(this.squads_rewards[this.model].date.substring(0, 11))
        : null;
    },
  },
  methods: {
    image_index(i) {
      return (i + this.squads_rewards.length) % this.squads_rewards.length;
    },
    rewardClass(index) {
      if (this.squads_rewards[index].winner) return "win_reward";

      var selected_date = this.squads_rewards[index]
        ? new Date(this.squads_rewards[index].date.substring(0, 11))
        : null;

      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = this.now.getTime() - selected_date.getTime();
      var days = millisBetween / millisecondsPerDay;

      days = Math.floor(days);

      if (days > 0) return "lost_reward";
      else if (days < 0) return "future_reward";
      else return "current_reward";
    },
  },
  created() {
    var now = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );
        var event_day = this.squads_rewards.map((day) => new Date(day.date.substring(0, 11)).getTime()).indexOf(now.getTime());
        this.model = event_day !== -1 ? event_day : 0;
  },
};
</script>

<style scoped>
.squads-rewards {
  font-weight: 600;
}

.date {
  font-size: 5.5vh;
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
  margin: 3vh;
  padding: 1vh;
  background-color: white;
  overflow: hidden;
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

.cross {
  height: 17vh;
  width: 17vh;
}

.small-cross {
  height: 11vh;
  width: 11vh;
}

.current_reward {
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.7vh #27ade4;
}

.lost_reward {
  border: 0.5vh solid #e42727;
  box-shadow: 0 0 2.5vh 0.7vh #e42727;
}

.win_reward {
  border: 0.5vh solid #27e453;
  box-shadow: 0 0 2.5vh 0.7vh #27e453;
}

.level {
  font-size: 5vh;
}

.name {
  font-size: 5vh;
  margin-top: -2vh;
}

.congratulations {
  font-size: 2.8vh;
  font-weight: 700;
  color: #27ade4;
}

.today-points {
  font-size: 4vh;
  font-weight: 700;
  margin-top: 2vh;
}

.xp-wrapper {
  display: flex;
  justify-content: center;
}

.points {
  font-size: 9vh;
  line-height: 9vh;
}

.xp {
  font-size: 2.5vh;
  font-weight: 700;
  line-height: 13vh;
}

.next-points {
  color: #aaadb0;
}

@media screen and (max-width: 1100px) {
  .first,
  .third,
  .rect,
  .browser {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .mobile {
    display: none;
  }

  .squads-rewards {
    margin-top: 18vh !important;
  }

  .date {
    margin-bottom: 2vh;
  }

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

  .first img,
  .third img {
    max-height: 15vh;
    max-width: 15vh;
  }

  .second {
    height: 28vh;
    width: 28vh;
  }

  .second img {
    max-height: 24vh;
    max-width: 24vh;
  }

  .rect {
    width: 10vw;
    margin-left: -5vw;
    margin-right: -5vw;
    height: 0.5vh;
    background-color: #27ade4;
  }

  .name {
    margin-top: 0;
  }

  /* .other-points {
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
  } */
}
</style>
