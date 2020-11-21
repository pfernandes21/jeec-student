<template>
  <div class="rewards">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button class="button">Personal</button>
        <button class="button">Team</button>
        <button class="button">JEECPOT</button>
      </div>
    </center>

    <PersonalReward :name="'Bepis'" :rewards="rewards" :xp="20" />

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import PersonalReward from "@/components/PersonalReward.vue";
//import TeamReward from "@/components/TeamReward.vue";

export default {
  name: "Rewards",
  components: {
    Navbar,
    PersonalReward,
    //TeamReward,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      rewards: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          level: 1,
          name: 'Bepis1',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          level: 2,
          name: 'Bepis2',
        }
      ]
    };
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
  background-color: #27ade4;
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