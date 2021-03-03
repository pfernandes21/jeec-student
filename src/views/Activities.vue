<template>
  <div class="activities">
    <Buttons
      @_click="click"
      :names="{
        all: button === 'all',
        'my interests': button === 'my interests',
      }"
    />

    <div style="margin-top: 8vh" v-if="!loading_activities">
      <center>
        <div>
          <v-carousel
            style="height: 10vh"
            hide-delimiter-background
            hide-delimiters
            v-model="model"
          >
            <template v-slot:prev="{ on, attrs }">
              <v-btn
                depressed
                color="#27ADE4"
                class="arrow-btn"
                v-bind="attrs"
                v-on="on"
                ><v-icon class="arrow" color="blue"
                  >mdi-chevron-left</v-icon
                ></v-btn
              >
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn
                depressed
                color="#27ADE4"
                class="arrow-btn"
                v-bind="attrs"
                v-on="on"
                ><v-icon class="arrow" color="blue"
                  >mdi-chevron-right</v-icon
                ></v-btn
              >
            </template>
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
          <div class="mobile" style="height: 10vh"></div>
        </div>

        <div class="no-activities-warning" style="display: none">
          <span class="warning-msg">Go to your</span>
          <span class="warning-msg profile"> Profile </span>
          <span class="warning-msg">to add Interests!</span>
        </div>
      </center>
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
import Activity from "@/components/Activity.vue";
import UserService from "../services/user.service";

export default {
  name: "Activities",
  components: {
    Activity,
    Buttons,
  },
  data: function () {
    return {
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
      loading_activities: true,
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
          (this.button === "my interests" && activity.interest))
      );
    },
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getActivities().then(
      (response) => {
        this.activities = response.data.data;
        this.getEventDates(response.data.start_date, response.data.end_date);

        var now = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );
        var event_day = this.event_days
          .map((day) => day.getTime())
          .indexOf(now.getTime());
        this.model = event_day !== -1 ? event_day : 0;
        this.loading_activities = false;
      },
      (error) => {
        console.log(error);
        this.loading_activities = false;
      }
    );
  },
};
</script>

<style scoped>
.activities {
  background-color: #e6e6e6;
}

.arrow-btn {
  width: 0 !important;
  height: 0 !important;
}

.arrow {
  font-size: 10vh !important;
  margin-top: 2.5vh;
}

.day-wrapper {
  vertical-align: middle;
  margin: 0;
  height: 100%;
}

.activities-wrapper {
  height: 82vh;
  overflow-y: auto;
}

.day {
  color: black;
  align-self: center;
  font-size: 9vw;
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

.loading {
  text-align: center;
  margin-top: 35vh;
}

@media screen and (min-width: 1100px) {
  .mobile {
    display: none;
  }

  .day {
    font-size: 7vh;
  }
}
</style>