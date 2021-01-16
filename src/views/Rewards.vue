<template>
  <div class="rewards">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button
          class="button"
          :class="{ active: button === 'personal' }"
          @click.stop="button = 'personal'"
        >
          Personal
        </button>
        <button
          class="button"
          :class="{ active: button === 'squad' }"
          @click.stop="button = 'squad'"
        >
          Squad
        </button>
        <button
          class="button"
          :class="{ active: button === 'jeecpot' }"
          @click.stop="button = 'jeecpot'"
        >
          JEECPOT
        </button>
      </div>
    </center>

    <PersonalRewards
      v-if="button === 'personal'"
      :levels="levels"
      :user_points="currentUser.total_points"
      :user_level="currentUser.level.data.value"
    />

    <SquadRewards v-if="button === 'squad'" :squads_rewards="squads_rewards" :squad_points="squad ? squad.daily_points : 0" />
  
    <JEECPOTRewards v-if="button === 'jeecpot'" :jeecpot_rewards="jeecpot_rewards" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import PersonalRewards from "@/components/PersonalRewards.vue";
import SquadRewards from "@/components/SquadRewards.vue";
import JEECPOTRewards from "@/components/JEECPOTRewards.vue";
import UserService from "../services/user.service";
//import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Rewards",
  components: {
    Navbar,
    PersonalRewards,
    SquadRewards,
    JEECPOTRewards,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      levels: [],
      squads_rewards: [],
      jeecpot_rewards: null,
      squad: null,
      button: "jeecpot",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    //...mapGetters(['levels','rewards'])
  },
  // methods: {
  //   ...mapActions(['fetchLevels'])
  // },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getLevels().then(
      (response) => {
        this.levels = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );

    // this.fetchLevels()

    UserService.getSquadsRewards().then(
      (response) => {
        this.squads_rewards = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getJEECPOTRewards().then(
      (response) => {
        this.jeecpot_rewards = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.rewards {
  background-color: #e6e6e6;
  height: 100%;
}

.buttons {
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.button {
  background-color: rgba(88, 185, 224, 0.638);
  border-radius: 3vh;
  font-size: 3.5vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 2vh;
}

.active {
  background-color: #27ade4;
}

.no-activities-warning {
  margin-top: 16vh;
}

.quests-warning {
  margin-top: 3vh;
}

.searching {
  font-size: 3vh;
  font-weight: 600;
}

.warning-msg {
  font-size: 2.7vh;
  font-weight: 500;
}

.activities-link {
  color: #27ade4;
  font-weight: 600;
  text-decoration: none;
}
</style>