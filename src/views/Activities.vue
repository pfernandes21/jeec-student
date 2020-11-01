<template>
  <div class="activities">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button class="button1">All</button>
        <button class="button2">My Interests</button>
      </div>

      <div class="day-wrapper">
        <img class="arrow-left" src="../assets/icons/arrow.svg" />
        <p class="day">Monday</p>
        <img class="arrow-right" src="../assets/icons/arrow.svg" />
      </div>

      <div class="activities-wrapper" >
        <Activity />
        <Activity />
      </div>

      <div class="no-activities-warning" style="display: none;">
        <span class="warning-msg">Go to your</span>
        <span class="warning-msg profile"> Profile </span>
        <span class="warning-msg">to add Interests!</span>
      </div>
    </center>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Activity from "@/components/Activity.vue";

export default {
  name: "Activities",
  components: {
    Navbar,
    Activity,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
    };
  },
};
</script>

<style scoped>
.activities {
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

.day-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
}

.day {
  align-self: center;
  font-size: 7vh;
  font-weight: 600;
  margin: 0;
}

.arrow-left {
  align-self: center;
  height: 8vh;
  transform: rotate(180deg);
}

.arrow-right {
  align-self: center;
  height: 8vh;
}

.no-activities-warning {
  margin-top: 16vh;
}

.warning-msg {
  font-size: 2.7vh;
  font-weight: 500;
}

.profile {
  color: #27ade4;
  font-weight: 600;
}

</style>