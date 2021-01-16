<template>
  <div class="squads-rewards" v-if="squads_rewards[model]">
    <center>
      <p class="date">
        {{ selected_date ? days[selected_date.getDay()] : "" }}
      </p>

      <v-carousel
        v-model="model"
        style="height: 24vh"
        hide-delimiters
        hide-delimiter-background
      >
        <v-carousel-item v-for="(squad_reward, i) in squads_rewards" :key="i"
          ><div class="image" :class="rewardClass">
            <img
              :src="jeec_brain_url + squad_reward.reward.image"
              alt="reward"
            />
            <img v-if="rewardClass === 'lost_reward'" src="../assets/icons/cross.svg" class="cross"></div
        ></v-carousel-item>
      </v-carousel>

      <div class="name">{{ squads_rewards[model].reward.name }}</div>
      <div v-if="squads_rewards[model].winner" class="congratulations">
        Congratulations!
      </div>
      <div
        v-if="
          rewardClass === 'current_reward' || rewardClass === 'future_reward'
        "
        class="today-points"
      >
        Today's Points:
      </div>
      <div v-if="rewardClass === 'current_reward'" class="xp-wrapper">
        <div class="points">{{ squad_points }}</div>
        <div class="xp">xp</div>
      </div>
      <div v-if="rewardClass === 'future_reward'" class="points">--</div>
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
    selected_date() {
      return this.squads_rewards[this.model]
        ? new Date(this.squads_rewards[this.model].date.substring(0, 11))
        : null;
    },
    rewardClass() {
      var selected_date = this.squads_rewards[this.model]
        ? new Date(this.squads_rewards[this.model].date.substring(0, 11))
        : null;

      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = this.now.getTime() - selected_date.getTime();
      var days = millisBetween / millisecondsPerDay;

      days = Math.floor(days);

      if (this.squads_rewards[this.model].winner) return "win_reward";
      else if (days > 0) return "lost_reward";
      else if (days < 0) return "future_reward";
      else return "current_reward";
    },
  },
};
</script>

<style scoped>
.squads-rewards {
  font-weight: 600;
}

.date {
  font-size: 6vh;
  font-weight: 600;
  margin: 0;
  margin-top: 2vh;
}

.image {
  align-self: center;
  position: relative;
  width: 18vh;
  height: 18vh;
  border-radius: 50%;
  margin: 3vh;
  padding: 1vh;
  background-color: white;
  overflow: hidden;
}

.image img {
  position: absolute;
  margin: auto;
  max-height: 13vh;
  max-width: 13vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.cross {
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
  font-size: 3.5vh;
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
</style>
