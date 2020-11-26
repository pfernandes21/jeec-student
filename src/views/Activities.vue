<template>
  <div class="activities">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button
          class="button"
          :class="{ active: button === 'all' }"
          @click.stop="button = 'all'"
        >
          All
        </button>
        <button
          class="button"
          :class="{ active: button === 'interests' }"
          @click.stop="button = 'interests'"
        >
          My Interests
        </button>
      </div>

      <div>
        <v-carousel
          style="height: 11vh"
          hide-delimiter-background
          hide-delimiters
          v-model="model"
        >
          <v-carousel-item v-for="day in days" :key="day">
            <v-sheet color="#e6e6e6" tile>
              <v-row class="day-wrapper" align="center" justify="center">
                <div class="day">{{ day }}</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div class="activities-wrapper">
        <Activity />
        <Activity />
      </div>

      <div class="no-activities-warning" style="display: none">
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
      button: 'all',
      model: 0,
      days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
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

.button {
  background-color: rgba(88, 185, 224, 0.397);
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
}

.active {
  background-color: #27ade4;
}

.day-wrapper {
  vertical-align: middle;
}

.day {
  color: black;
  align-self: center;
  font-size: 6.5vh;
  font-weight: 600;
  margin: 0;
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