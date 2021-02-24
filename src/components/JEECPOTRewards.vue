<template>
  <div class="jeecpot-rewards" v-if="jeecpot_rewards">
    <center class="rewards-wrapper">
      <div class="top-rewards-wrapper">
        <div>
          <div class="_title">Top 3 Players of the week</div>
          <div class="top_rewards">
            <div class="second-top-reward">
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.second_student_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.second_student_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/silver_crown.svg"
                alt=""
                class="crown"
              />
              <div class="reward-info">
                {{ jeecpot_rewards.second_student_reward.name }}<br />(2nd
                place)
              </div>
            </div>

            <div class="first-top-reward">
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.first_student_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.first_student_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/gold_crown.svg"
                alt=""
                class="crown first-top-crown"
              />
              <div class="reward-info">
                {{ jeecpot_rewards.first_student_reward.name }}<br />(1st place)
              </div>
            </div>

            <div class="third-top-reward">
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.third_student_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.third_student_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/bronze_crown.svg"
                alt=""
                class="crown"
              />
              <div class="reward-info">
                {{ jeecpot_rewards.third_student_reward.name }}<br />(3rd place)
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="_title">Top 3 Squads of the week</div>
          <div class="top_rewards">
            <div class="second-top-reward">
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.second_squad_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.second_squad_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/silver_crown.svg"
                alt=""
                class="crown"
              />
              <div class="reward-info">
                {{ jeecpot_rewards.second_squad_reward.name }}<br />(2nd place)
              </div>
            </div>

            <div class="first-top-reward">
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.first_squad_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.first_squad_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/gold_crown.svg"
                alt=""
                class="crown first-top-crown"
              />
              <div class="reward-info">
                {{ jeecpot_rewards.first_squad_reward.name }}<br />(1st place)
              </div>
            </div>

            <div class="third-top-reward">
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.third_squad_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.third_squad_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/bronze_crown.svg"
                alt=""
                class="crown"
              />
              <div class="reward-info">
                {{ jeecpot_rewards.third_squad_reward.name }}<br />(3rd place)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="king-rewards">
          <div class="king-reward">
            <div>
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.king_job_fair_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.king_job_fair_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/gold_crown.svg"
                alt=""
                class="crown king-crown"
              />
            </div>
            <div class="reward-info">
              <p>King of Job Fair</p>
              <p>{{ jeecpot_rewards.king_job_fair_reward.name }}</p>
            </div>
          </div>

          <div class="king-reward">
            <div class="reward-info">
              <p>King of Knowledge</p>
              <p>{{ jeecpot_rewards.king_knowledge_reward.name }}</p>
            </div>

            <div>
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.king_knowledge_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.king_knowledge_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/gold_crown.svg"
                alt=""
                class="crown king-crown"
              />
            </div>
          </div>

          <div class="king-reward">
            <div>
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.king_hacking_winner }"
              >
                <img
                  :src="
                    jeec_brain_url + jeecpot_rewards.king_hacking_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/gold_crown.svg"
                alt=""
                class="crown king-crown"
              />
            </div>
            <div class="reward-info">
              <p>King of Hacking</p>
              <p>{{ jeecpot_rewards.king_hacking_reward.name }}</p>
            </div>
          </div>

          <div class="king-reward">
            <div class="reward-info">
              <p>King of Networking</p>
              <p>{{ jeecpot_rewards.king_networking_reward.name }}</p>
            </div>

            <div>
              <div
                class="image"
                :class="{ winner: jeecpot_rewards.king_networking_winner }"
              >
                <img
                  :src="
                    jeec_brain_url +
                    jeecpot_rewards.king_networking_reward.image
                  "
                  alt=""
                  class="reward"
                />
              </div>
              <img
                src="../assets/icons/gold_crown.svg"
                alt=""
                class="crown king-crown"
              />
            </div>
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

.rewards-wrapper > div > div {
  background-color: #f1f1f1;
  padding-top: 1vh;
}

.rewards-wrapper > div:not(:first-of-type) {
  margin-top: 1vh;
}

._title {
  font-size: 2.7vh;
  margin-bottom: 2vh;
}

.image {
  position: relative;
  width: 28vw;
  height: 28vw;
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
  max-height: 23vw;
  max-width: 23vw;
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

.first-top-crown {
  margin-top: -1.5vh;
}

.reward-info {
  font-size: 2.2vh;
  line-height: 2.2vh;
  margin-top: 1.5vh;
  margin-bottom: 2vh;
}

.top_rewards {
  display: flex;
  overflow-x: auto;
  justify-content: center;
}

.student-reward,
.first-top-reward,
.second-top-reward,
.third-top-reward {
  position: relative;
}

.second-top-reward,
.third-top-reward {
  margin-top: 12vh;
}

.student-reward {
  margin-top: 6vh;
}

.king-rewards {
  padding-bottom: 3vh;
}

.king-reward {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1vh;
}

.king-reward p {
  margin: 0;
  margin-top: 3vh;
}

.king-reward:nth-of-type(odd) > div:last-of-type > p:first-of-type,
.king-reward:nth-of-type(even) > div:first-of-type > p:first-of-type {
  font-size: 3vh;
  margin-bottom: -1vh;
}

.king-reward:nth-of-type(odd) > div:last-of-type > p:last-of-type,
.king-reward:nth-of-type(even) > div:first-of-type > p:last-of-type {
  font-size: 2.5vh;
}

.king-reward:nth-of-type(odd) {
  justify-content: left;
  padding-left: 5vw;
  padding-right: 0;
}

.king-reward:nth-of-type(odd) > div:last-of-type p {
  text-align: left;
  margin-left: 2vw;
  margin-right: 0;
}

.king-reward:nth-of-type(even) > div:first-of-type p {
  text-align: right;
  margin-left: 0;
  margin-right: 2vw;
}

.king-reward:nth-of-type(even) {
  justify-content: flex-end;
  padding-left: 0;
  padding-right: 5vw;
}

.king-crown {
  margin-top: -1.5vh;
}

@media screen and (max-width: 1100px) {
  .jeecpot-rewards {
    height: 82vh;
  }
}

@media screen and (min-width: 1100px) {
  ._title {
    font-size: 3.5vh;
  }

  .image {
    width: 9vw;
    height: 9vw;
  }

  .reward {
    max-width: 8vw;
    max-height: 8vw;
  }

  .king-reward:nth-of-type(odd) > div:last-of-type > p:first-of-type,
  .king-reward:nth-of-type(even) > div:first-of-type > p:first-of-type {
    font-size: 4vh;
  }

  .king-reward:nth-of-type(odd) > div:last-of-type > p:last-of-type,
  .king-reward:nth-of-type(even) > div:first-of-type > p:last-of-type {
    font-size: 3vh;
  }

  .top-rewards-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .top-rewards-wrapper > div {
    width: 36.7vw;
  }
}
</style>
