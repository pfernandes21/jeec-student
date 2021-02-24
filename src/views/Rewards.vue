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
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import PersonalRewards from "@/components/PersonalRewards.vue";
import SquadRewards from "@/components/SquadRewards.vue";
import JEECPOTRewards from "@/components/JEECPOTRewards.vue";
import UserService from "../services/user.service";
//import { mapGetters, mapActions } from 'vuex';

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
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    //...mapGetters(['levels','rewards'])
  },
  methods: {
    // ...mapActions(['fetchLevels'])
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
}

@media screen and (min-width: 1100px) {
  .buttons {
    display: flex;
    justify-content: center;
  }
}
</style>