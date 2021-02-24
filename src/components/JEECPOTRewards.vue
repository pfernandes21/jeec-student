<template>
  <div class="jeecpot-rewards" v-if="jeecpot_rewards">
    <center>
      <div class="_title">Students with the most points:</div>
      <div class="squad_rewards">
        <div class="second-squad-reward">
          <div class="image" :class="{ winner: jeecpot_rewards.second_student_winner }">
            <img
              :src="jeec_brain_url + jeecpot_rewards.second_student_reward.image"
              alt=""
              class="reward"
            />
          </div>
          <img src="../assets/icons/silver_crown.svg" alt="" class="crown" />
          <div class="reward-info">
            {{ jeecpot_rewards.second_student_reward.name }}<br />(2nd place)
          </div>
        </div>

        <div class="first-squad-reward">
          <div class="image" :class="{ winner: jeecpot_rewards.first_student_winner }">
            <img
              :src="jeec_brain_url + jeecpot_rewards.first_student_reward.image"
              alt=""
              class="reward"
            />
          </div>
          <img src="../assets/icons/gold_crown.svg" alt="" class="crown first-squad-crown" />
          <div class="reward-info">
            {{ jeecpot_rewards.first_student_reward.name }}<br />(1st place)
          </div>
        </div>

        <div class="third-squad-reward">
          <div class="image" :class="{ winner: jeecpot_rewards.third_student_winner }">
            <img
              :src="jeec_brain_url + jeecpot_rewards.third_student_reward.image"
              alt=""
              class="reward"
            />
          </div>
          <img src="../assets/icons/bronze_crown.svg" alt="" class="crown" />
          <div class="reward-info">
            {{ jeecpot_rewards.third_student_reward.name }}<br />(3rd place)
          </div>
        </div>
      </div>

      <div class="_title">Squads with the most points:</div>
      <div class="squad_rewards">
        <div class="second-squad-reward">
          <div class="image" :class="{ winner: jeecpot_rewards.second_squad_winner }">
            <img
              :src="jeec_brain_url + jeecpot_rewards.second_squad_reward.image"
              alt=""
              class="reward"
            />
          </div>
          <img src="../assets/icons/silver_crown.svg" alt="" class="crown" />
          <div class="reward-info">
            {{ jeecpot_rewards.second_squad_reward.name }}<br />(2nd place)
          </div>
        </div>

        <div class="first-squad-reward">
          <div class="image" :class="{ winner: jeecpot_rewards.first_squad_winner }">
            <img
              :src="jeec_brain_url + jeecpot_rewards.first_squad_reward.image"
              alt=""
              class="reward"
            />
          </div>
          <img src="../assets/icons/gold_crown.svg" alt="" class="crown first-squad-crown" />
          <div class="reward-info">
            {{ jeecpot_rewards.first_squad_reward.name }}<br />(1st place)
          </div>
        </div>

        <div class="third-squad-reward">
          <div class="image" :class="{ winner: jeecpot_rewards.third_squad_winner }">
            <img
              :src="jeec_brain_url + jeecpot_rewards.third_squad_reward.image"
              alt=""
              class="reward"
            />
          </div>
          <img src="../assets/icons/bronze_crown.svg" alt="" class="crown" />
          <div class="reward-info">
            {{ jeecpot_rewards.third_squad_reward.name }}<br />(3rd place)
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "JEECPOTRewards",
  props: {
    jeecpot_rewards: Object,
  },
  data() {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  computed: {},
};
</script>

<style scoped>
.jeecpot-rewards {
  font-weight: 600;
  height: 90vh;
  overflow-y: auto;
}

._title {
  font-size: 2.7vh;
  margin-bottom: 2vh;
}

.image {
  position: relative;
  width: 15vh;
  height: 15vh;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.7vh #27ade4;
  padding: 1vh;
  margin-top: 4vh;
  margin-left: 1vw;
  margin-right: 1vw;
  background-color: white;
  overflow: hidden;
}

.reward {
  position: absolute;
  margin: auto;
  max-height: 11vh;
  max-width: 11vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.winner {
  border: 0.5vh solid #27e453 !important;
  box-shadow: 0 0 2.5vh 0.7vh #27e453 !important;
}

.crown {
  position: absolute;
  width: 8vh;
  top: 0;
  margin-top: 0vh;
  margin-left: -3.8vh;
}

.student-crown {
  margin-top: -5.5vh;
}

.first-squad-crown {
  margin-top: -1.5vh;
}

.reward-info {
  font-size: 2.2vh;
  line-height: 2.2vh;
  margin-top: 1.5vh;
  margin-bottom: 2vh;
}

.squad_rewards {
  display: flex;
  overflow-x: auto;
  justify-content: center;
}

.student-reward,
.first-squad-reward,
.second-squad-reward,
.third-squad-reward {
  position: relative;
}

.second-squad-reward,
.third-squad-reward {
  margin-top: 12vh;
}

.student-reward {
  margin-top: 6vh;
}

@media screen and (max-width: 1100px) {
  .jeecpot-rewards {
    padding-bottom: 8vh;
  }
}
</style>
