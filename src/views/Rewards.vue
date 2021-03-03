<template>
  <div class="rewards">
    <Buttons
      @_click="click"
      :names="{
        personal: button === 'personal',
        squad: button === 'squad',
        jeecpot: button === 'jeecpot',
      }"
    />
    <div v-if="!loading_jeecpot_rewards && !loading_levels && !loading_squad && !loading_squad_rewards">
      <PersonalRewards
        style="margin-top: 15vh"
        v-if="button === 'personal'"
        :levels="levels"
        :user_points="currentUser.total_points"
        :user_level="currentUser.level.data.value"
      />

      <SquadRewards
        style="margin-top: 15vh"
        v-if="button === 'squad'"
        :squads_rewards="squads_rewards"
        :squad_points="squad ? squad.daily_points : 0"
      />

      <JEECPOTRewards
        style="margin-top: 8vh"
        v-if="button === 'jeecpot'"
        :jeecpot_rewards="jeecpot_rewards"
      />
    </div>
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import PersonalRewards from "@/components/PersonalRewards.vue";
import SquadRewards from "@/components/SquadRewards.vue";
import JEECPOTRewards from "@/components/JEECPOTRewards.vue";
import UserService from "../services/user.service";

export default {
  name: "Rewards",
  components: {
    PersonalRewards,
    SquadRewards,
    JEECPOTRewards,
    Buttons,
  },
  data: function () {
    return {
      levels: [],
      squads_rewards: [],
      jeecpot_rewards: null,
      squad: null,
      button: "personal",
      loading_squad: true,
      loading_levels: true,
      loading_squad_rewards: true,
      loading_jeecpot_rewards: true,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getLevels().then(
      (response) => {
        this.levels = response.data.data;
        this.loading_levels = false;
      },
      (error) => {
        console.log(error);
        this.loading_levels = false;
      }
    );

    UserService.getSquadsRewards().then(
      (response) => {
        this.squads_rewards = response.data.data;
        this.loading_squad_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad_rewards = false;
      }
    );

    UserService.getJEECPOTRewards().then(
      (response) => {
        this.jeecpot_rewards = response.data;
        this.loading_jeecpot_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_jeecpot_rewards = false;
      }
    );

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
  },
};
</script>

<style scoped>
.rewards {
  background-color: #e6e6e6;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

@media screen and (min-width: 1100px) {
  .buttons {
    display: flex;
    justify-content: center;
  }
}
</style>