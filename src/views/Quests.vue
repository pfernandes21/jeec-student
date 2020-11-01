<template>
  <div class="quests">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button class="button1">Daily</button>
        <button class="button2">Special</button>
      </div>
    </center>

    <div class="daily" style="display: none">
      <div class="activities-wrapper">
        <Activity />
        <Activity />
      </div>

      <div class="quests-warning">
        <p class="searching">Searching...</p>
        <span class="warning-msg">For more quests go to</span>
        <router-link to="/activities" class="warning-msg activities-link">
          Activities</router-link
        >
      </div>
    </div>

    <div class="special">
      <Quest />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Activity from "@/components/Activity.vue";
import Quest from "@/components/Quest.vue";

export default {
  name: "Quests",
  components: {
    Navbar,
    Activity,
    Quest,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
    };
  },
};
</script>

<style scoped>
.quests {
  background-color: #e6e6e6;
  height: 100%;
}

.buttons {
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.button1,
.button2 {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 3.5vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
}

.button1 {
  margin-right: 2vw;
}

.button2 {
  margin-left: 2vw;
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