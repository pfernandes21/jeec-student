<template>
  <div class="rules-page">
    <Buttons
      @_click="click"
      :names="{
        Rules: button === 'Rules',
        Prizes: button === 'Prizes',
        Activities: button === 'Activities'
      }"
    />

    <GeneralRules v-if="button === 'Rules'" :event_info="event_info" />

    <PrizeRules v-if="button === 'Prizes'" />

    <ActivityRules
      v-if="button === 'Activities'"
      :activities="event_info.activity_types"
    />
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import GeneralRules from "@/components/GeneralRules.vue";
import PrizeRules from "@/components/PrizeRules.vue";
import ActivityRules from "@/components/ActivityRules.vue";
import UserService from "../services/user.service";

export default {
  name: "Rules",
  components: {
    Buttons,
    GeneralRules,
    PrizeRules,
    ActivityRules
  },
  data: function() {
    return {
      button: "Rules",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      event_info: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    click(name) {
      this.button = name;
    }
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getEventInfo().then(
      response => {
        this.event_info = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }
};
</script>

<style scoped>
.rules-page {
  background-color: #e6e6e6;
}

@media screen and (max-width: 1100px) {
  .rules-page {
    overflow-y: auto;
  }
}

@media screen and (min-width: 1100px) {
  .rules-page {
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
