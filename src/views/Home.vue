<template>
  <div class="home">
    <div class="top">
      <router-link to="/profile" tag="button" class="plus">+</router-link>
      <div class="user-wrapper">
        <img alt="profile photo" :src="currentUser.photo" class="user-photo" />
        <div>
          <p class="main-title">
            {{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}
          </p>
          <p class="sub-sub-title">lvl. {{ currentUser.level.data.value }}</p>
          <center class="expbar">
            <Expbar
              :xp="currentUser.total_points"
              :progress="progress"
              :end_points="currentUser.level.data.end_points"
              :width="xpbar_width"
              :height="height"
            />
          </center>
          <div class="redirect-buttons upper">
            <router-link to="/code" tag="button">Redeem Codes</router-link>
            <router-link to="/quests" tag="button">Daily Quests</router-link>
          </div>
        </div>
      </div>

      <div
        class="next-reward"
        v-if="
          reward_level && currentUser.total_points < reward_level.end_points
        "
      >
        <div
          class="reward-img"
          :style="'background-image:' + 'url(' + _reward_level + ')'"
        ></div>
        <div class="next-reward-info">
          <p class="n-reward-top">Next Reward:</p>
          <p class="n-reward-middle">
            {{ reward_level ? reward_level.reward.name : "No Reward Found" }}
          </p>
          <p class="n-reward-bottom" v-if="reward_level">
            Missing
            {{
              (reward_level ? reward_level.end_points : 0) -
              currentUser.total_points
            }}
            xp
          </p>
        </div>
      </div>
    </div>

    <div
      class="middle"
      v-if="!loading_squad && !loading_level && !loading_reward"
    >
      <router-link to="/squad" tag="button" class="plus">+</router-link>
      <div class="middle-wrapper">
        <div class="big-squad-wrapper">
          <div class="squad-wrapper">
            <img
              v-if="squad"
              class="squad-image"
              :src="squad ? jeec_brain_url + squad.image : ''"
              alt="squad-image"
            />
            <div>
              <p class="main-title" :class="!squad ? 'no-squad-title' : ''">
                {{ squad ? squad.name : "You currently have no squad" }}
              </p>
              <p v-if="squad" class="sub-title">
                {{ squad ? squad.cry : "No squad" }}
              </p>
              <p v-if="squad" class="sub-sub-title">
                rank {{ squad ? squad.rank : "" }}
              </p>
              <div v-else class="redirect-buttons see-more create-squad">
                <router-link to="/squad" tag="button">Create Squad</router-link>
              </div>
            </div>
          </div>

          <div
            class="middle-info"
            :style="!squad ? 'justify-content:center  !important' : ''"
          >
            <div v-if="squad" class="xp-wrapper">
              <div class="daily-xp">
                <p class="xp-top">Daily:</p>
                <span class="xp-value">{{
                  squad ? squad.daily_points : ""
                }}</span>
                <span class="xp">xp</span>
              </div>
              <div>
                <p class="xp-top">Total:</p>
                <span class="xp-value">{{
                  squad ? squad.total_points : ""
                }}</span>
                <span class="xp">xp</span>
              </div>
            </div>

            <div class="today-reward">
              <p class="t-reward-top">Today's Reward:</p>
              <center>
                <div
                  class="reward-img"
                  :style="'background-image:' + 'url(' + _today_reward + ')'"
                ></div>
              </center>
              <p class="t-reward-bottom">
                {{
                  today_reward && today_reward.image
                    ? today_reward.name
                    : "No Reward Found"
                }}
              </p>
            </div>
          </div>

          <div class="members" v-if="squad">
            <Member
              v-for="member in squad.members.data"
              :key="member.ist_id"
              :member="member"
              :captain_ist_id="squad.captain_ist_id"
              :line_break="true"
            />
          </div>
        </div>

        <div class="big-rewards">
          <p class="big-rewards-title">Next Rewards:</p>
          <div class="big-reward">
            <div
              class="big-reward-img"
              :style="'background-image:' + 'url(' + _today_reward + ')'"
            ></div>
            <div class="big-reward-info">
              <p class="big-reward-name">
                {{
                  today_reward && today_reward.image
                    ? today_reward.name
                    : "No Reward Found"
                }}
              </p>
              <p class="big-reward-description">Today's Top Team</p>
            </div>
          </div>

          <div
            class="big-reward"
            v-if="
              reward_level && currentUser.total_points < reward_level.end_points
            "
          >
            <div
              class="big-reward-img"
              :style="'background-image:' + 'url(' + _reward_level + ')'"
            ></div>
            <div class="big-reward-info">
              <p class="big-reward-name">
                {{
                  reward_level ? reward_level.reward.name : "No Reward Found"
                }}
              </p>
              <p class="big-reward-description" v-if="reward_level">
                Next Personal Reward<br />Missing
                {{
                  (reward_level ? reward_level.end_points : 0) -
                  currentUser.total_points
                }}
                xp
              </p>
            </div>
          </div>

          <div class="redirect-buttons see-more">
            <router-link to="/rewards" tag="button">See More</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
    <div class="redirect-buttons bottom">
      <router-link to="/code" tag="button">Redeem Codes</router-link>
      <router-link to="/quests" tag="button">Daily Quests</router-link>
    </div>
  </div>
</template>

<script>
import Expbar from "@/components/Expbar.vue";
import UserService from "../services/user.service";
import Member from "@/components/Member.vue";

export default {
  name: "Home",
  components: {
    Expbar,
    Member,
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      default_image: require("../assets/jeec_colour_no_edition_transparent.svg"),
      squad: null,
      levels: null,
      today_reward: {},
      xpbar_width: "92vw",
      height: 30,
      loading_squad: true,
      loading_level: true,
      loading_reward: true,
    };
  },
  computed: {
    _today_reward() {
      return this.today_reward && this.today_reward.image
        ? this.jeec_brain_url + this.today_reward.image
        : this.default_image;
    },
    _reward_level() {
      return this.reward_level
        ? this.jeec_brain_url + this.reward_level.reward.image
        : this.default_image;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      return this.$store.state.auth.user.name.split(" ");
    },
    progress() {
      var xp = this.$store.state.auth.user.total_points;
      var start_points = this.$store.state.auth.user.level.data.start_points;
      var end_points = this.$store.state.auth.user.level.data.end_points;

      return ((xp - start_points) / (end_points - start_points)) * 100;
    },
    reward_level() {
      if (!this.levels) return null;

      for (var level of this.levels) {
        if (level.value === this.$store.state.auth.user.level.data.value)
          return level;
      }

      return null;
    },
  },
  methods: {
    resize() {
      if (window.innerWidth < 1100) {
        this.xpbar_width = "92vw";
      } else {
        this.xpbar_width = "47vw";
      }

      if (window.innerWidth < 600) {
        this.height = 30;
      } else if (window.innerWidth < 1100) {
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

    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
        this.loading_squad = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad = false;
      }
    );

    UserService.getLevels().then(
      (response) => {
        this.levels = response.data.data;
        this.loading_level = false;
      },
      (error) => {
        console.log(error);
        this.loading_level = false;
      }
    );

    UserService.getTodaySquadReward().then(
      (response) => {
        this.today_reward = response.data;
        this.loading_reward = false;
      },
      (error) => {
        console.log(error);
        this.loading_reward = false;
      }
    );
  },
};
</script>

<style scoped>
.home {
  background-color: #e6e6e6;
}

.top,
.middle {
  position: relative;
  margin-top: 1vh;
  background-color: #f1f1f1;
  padding-top: 1vh;
  padding-bottom: 4vh;
  padding-left: 4vw;
  padding-right: 4vw;
}

.plus {
  position: absolute;
  font-size: 5vh;
  font-weight: 500;
  color: #848484;
  right: 4%;
  top: -1%;
}

.main-title {
  font-size: 3.8vh;
  font-weight: 500;
  color: #848484;
  margin-bottom: -1vh;
}

.no-squad-title {
  width: 90vw;
  text-align: center;
  padding-left: 5vw;
  padding-right: 5vw;
}

.sub-title {
  font-size: 2.6vh;
  font-weight: 500;
  color: #848484;
  font-style: italic;
  margin-bottom: 0;
  text-align: left;
}

.sub-sub-title {
  font-size: 2.5vh;
  font-weight: 700;
  margin-bottom: 0;
  text-align: left;
}

.expbar {
  margin-top: 0.8vh;
  margin-bottom: 1.6vh;
}

.next-reward {
  display: flex;
}

.reward-img {
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid #707070;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
}

.next-reward-info {
  align-self: center;
  margin-left: 2vw;
}

.next-reward-info p {
  margin: 0;
  font-weight: 600;
}

.n-reward-top {
  font-size: 2.5vh;
  color: #848484;
  margin-bottom: -1vh !important;
}

.n-reward-middle {
  font-size: 3.5vh;
}

.n-reward-bottom {
  font-size: 1.7vh;
  font-weight: 700 !important;
  margin-top: -0.5vh !important;
}

.middle {
  min-height: 37vh;
}

.middle-info {
  display: flex;
  padding-top: 2vh;
  scroll-padding-bottom: 2vh;
  justify-content: space-between;
}

.xp-wrapper {
  align-self: center;
}

.xp-top {
  font-size: 1.8vh;
  font-weight: 700;
  margin: 0;
  margin-bottom: -1.5vh;
}

.xp-value {
  font-size: 6vh;
  font-weight: 600;
  margin: 0;
  color: #26a2d5;
}

.xp {
  font-size: 2vh;
  font-weight: 700;
}

.t-reward-top {
  font-size: 2.5vh;
  font-weight: 500;
  color: #848484;
  margin: 0;
}

.t-reward-bottom {
  font-size: 2.5vh;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.bottom {
  padding-top: 3vh;
  padding-bottom: 3vh;
  padding-left: 4vw;
  padding-right: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.redirect-buttons {
  display: flex;
  align-items: center;
}

.redirect-buttons button {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 4vh;
  font-weight: 600;
  color: white;
  width: 43vw;
  height: auto;
  margin-left: 1vw;
  margin-right: 1vw;
  min-height: 12vh;
  line-height: 4.7vh;
}

.user-wrapper {
  display: flex;
}

.user-photo {
  width: 18vh;
  height: 18vh;
  border-radius: 50%;
}

.squad-wrapper {
  display: flex;
  align-items: center;
}

.squad-image {
  height: 15vh;
  width: 15vh;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.1vh #27ade4;
}

.loading {
  text-align: center;
  margin-top: 15%;
  min-height: 30vh;
}

@media screen and (max-width: 1100px) {
  .user-photo {
    display: none;
  }

  .upper {
    display: none;
  }

  .squad-image {
    display: none;
  }

  .big-rewards {
    display: none;
  }

  .sub-title {
    display: none;
  }

  .members {
    display: none;
  }

  .create-squad {
    display: none;
  }

  .next-reward-info {
    width: calc(90vw - 13vh);
  }
}

@media screen and (min-width: 1100px) {
  .home {
    height: 100vh;
    overflow-y: hidden;
  }

  .top {
    margin-top: 0;
    padding-left: 4vw;
    padding-top: 4vh;
    background-color: #e6e6e6;
  }

  .no-squad-title {
    width: 100%;
    padding: 0;
  }

  .middle {
    width: 100%;
    height: 66vh;
    background-color: #e6e6e6;
    margin: 0;
    padding: 0;
  }

  .middle-wrapper {
    display: flex;
    justify-content: space-between;
    width: 75vw;
  }

  .big-squad-wrapper,
  .big-rewards {
    background-color: #f1f1f1;
    width: 37.2vw;
    padding-top: 2vh;
    padding-left: 2vw;
    padding-right: 2vw;
    height: 66vh;
  }

  .big-rewards-title {
    line-height: 5vh;
    text-align: center;
    font-size: 5vh;
    font-weight: 500;
    margin: 0;
  }

  .big-reward {
    display: flex;
    align-items: center;
    margin-top: 3vh;
  }

  .big-reward-img {
    align-self: center;
    position: relative;
    height: 15vh;
    width: 15vh;
    border: 0.3vh solid #707070;
    border-radius: 50%;
    background-color: white;
    background-size: 105%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .big-reward-info {
    width: calc(33vw - 19vh);
    padding-left: 2vw;
  }

  .big-reward-name {
    font-size: 3.5vh;
    font-weight: 600;
    margin: 0;
  }

  .big-reward-description {
    font-size: 2vh;
    font-weight: 600;
    margin: 0;
  }

  .squad-wrapper {
    justify-content: center;
  }

  .plus {
    display: none;
  }

  .bottom {
    display: none;
  }

  .redirect-buttons button {
    width: 15.8vw;
    margin: 0;
    margin-right: 2vw;
    padding-left: 2vw;
    padding-right: 2vw;
    font-size: 3vh;
    line-height: 4vh;
    min-height: 0;
    height: 8vh;
  }

  .see-more {
    margin-top: 3vh;
    margin-left: calc(50% - 6.5vw);
  }

  .create-squad {
    margin-top: 5vh;
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .create-squad button {
    margin: 0;
  }

  .user-wrapper {
    align-items: center;
  }

  .user-photo {
    width: 14vw;
    height: 14vw;
    margin-right: 3vw;
  }

  .squad-image {
    margin-right: 2vw;
  }

  .next-reward {
    display: none;
  }

  .xp-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .today-reward {
    display: none;
  }

  .daily-xp {
    margin-right: 4vw;
  }

  .xp-top {
    font-size: 3vh;
    font-weight: 700;
    margin: 0;
    margin-bottom: -1.5vh;
  }

  .xp-value {
    font-size: 3.5vw;
    font-weight: 600;
    margin: 0;
  }

  .xp {
    font-size: 4vh;
    font-weight: 700;
  }

  .members {
    width: 100%;
    max-height: 32vh;
    margin-top: 1vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    overflow-y: auto;
  }
}
</style>
