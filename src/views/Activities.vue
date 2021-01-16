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
          <v-carousel-item v-for="day in event_days" :key="day.getTime()">
            <v-sheet color="#e6e6e6" tile>
              <v-row class="day-wrapper" align="center" justify="center">
                <div class="day">{{ weekdays[day.getDay()] }}</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div class="activities-wrapper">
        <Activity
          v-for="activity in activities"
          :key="activity.name + activity.type"
          v-show="show_activity(activity)"
          :activity="activity"
        />
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
import UserService from "../services/user.service";

export default {
  name: "Activities",
  components: {
    Navbar,
    Activity,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      button: "all",
      model: 0,
      event_days: [],
      activities: [],
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },
  methods: {
    getEventDates(start_date, end_date) {
      var startDate = new Date(start_date.substring(0, 11));
      var endDate = new Date(end_date.substring(0, 11));

      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        this.event_days.push(new Date(d));
      }
    },
    show_activity(activity) {
      var activity_date = new Date(activity.day.substring(0, 11));

      return (
        activity_date.getTime() === this.event_days[this.model].getTime() &&
        (this.button === "all" ||
          (this.button === "interests" && activity.interest))
      );
    },
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

    UserService.getActivities().then(
      (response) => {
        this.activities = response.data.data;
        this.getEventDates(response.data.start_date, response.data.end_date);
      },
      (error) => {
        console.log(error);
      }
    );
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
  background-color: rgba(88, 185, 224, 0.638);
  border-radius: 3vh;
  font-size: 3vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: 8vh;
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