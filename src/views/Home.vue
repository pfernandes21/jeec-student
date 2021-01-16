<template>
  <div class="home">
    <Navbar :page="currentPage" />

    <div class="top">
      <router-link to="/profile" tag="p" class="plus">+</router-link>
      <p class="main-title">
        {{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}
      </p>
      <p class="sub-title">lvl. {{ currentUser.level.data.value }}</p>
      <center class="expbar">
        <Expbar
          :xp="currentUser.total_points"
          :progress="progress"
          :end_points="currentUser.level.data.end_points"
          width="92vw"
        />
      </center>

      <div class="next-reward">
        <div class="reward-img">
          <img
            :src="
              reward_level ? jeec_brain_url + reward_level.reward.image : ''
            "
            alt="next-reward"
          />
        </div>
        <div class="next-reward-info">
          <p class="n-reward-top">Next Reward:</p>
          <p class="n-reward-middle">
            {{ reward_level ? reward_level.reward.name : "" }}
          </p>
          <p class="n-reward-bottom">
            Missing
            {{
              (reward_level ? reward_level.end_points : 0) -
              currentUser.total_points
            }}
            xp points
          </p>
        </div>
      </div>
    </div>

    <div class="middle">
      <router-link to="/squad" tag="p" class="plus">+</router-link>
      <p class="main-title">{{ squad ? squad.name : "No squad" }}</p>
      <p class="sub-title">rank {{ squad ? squad.rank : "" }}</p>

      <div class="middle-info">
        <div class="xp-wrapper">
          <p class="xp-top">Daily:</p>
          <span class="xp-value">{{ squad ? squad.daily_points : "" }}</span>
          <span class="xp">xp</span>
          <p class="xp-top">Total:</p>
          <span class="xp-value">{{ squad ? squad.total_points : "" }}</span>
          <span class="xp">xp</span>
        </div>

        <div class="today-reward">
          <p class="t-reward-top">Today's Reward:</p>
          <center>
            <div class="reward-img">
              <img
                :src="today_reward ? jeec_brain_url + today_reward.image : ''"
                alt="today-reward"
              />
            </div>
          </center>
          <p class="t-reward-bottom">
            {{ today_reward ? today_reward.name : "" }}
          </p>
        </div>
      </div>
    </div>

    <div class="bottom">
      <router-link to="/code" tag="button" class="button"
        >Redeem<br />Codes</router-link
      >
      <router-link to="/quests" tag="button" class="button"
        >Daily<br />Quests</router-link
      >
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Expbar from "@/components/Expbar.vue";
import UserService from "../services/user.service";

export default {
  name: "Home",
  components: {
    Navbar,
    Expbar,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      squad: null,
      levels: null,
      today_reward: {},
    };
  },
  computed: {
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
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getLevels().then(
      (response) => {
        this.levels = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getTodaySquadReward().then(
      (response) => {
        this.today_reward = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.home {
  background-color: #e6e6e6;
  height: 100%;
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

.sub-title {
  font-size: 2.5vh;
  font-weight: 700;
  margin-bottom: 0;
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
  padding: 1vh;
  border: 0.1vh solid #707070;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
}

.reward-img img {
  position: absolute;
  margin: auto;
  max-height: 11vh;
  max-width: 11vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.middle-info {
  display: flex;
  padding-top: 2vh;
  scroll-padding-bottom: 2vh;
}

.xp-wrapper {
  align-self: center;
}

.today-reward {
  margin-left: auto;
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

.button {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 4vh;
  font-weight: 600;
  color: white;
  width: 43vw;
  height: auto;
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>