<template>
  <div class="activities">
    <Buttons
      @_click="click"
      :names="{
        all: button === 'all',
        'my interests': button === 'my interests',
      }"
    />

    <div style="margin-top: 8vh">
      <center>
        <div>
          <v-carousel
            style="height: 10vh"
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
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <div class="mobile" style="height:10vh"></div>
        </div>

        <div class="no-activities-warning" style="display: none">
          <span class="warning-msg">Go to your</span>
          <span class="warning-msg profile"> Profile </span>
          <span class="warning-msg">to add Interests!</span>
        </div>
      </center>
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
}

.day-wrapper {
  vertical-align: middle;
  margin: 0;
}

.activities-wrapper {
  height: 82vh;
  overflow-y: auto;
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

@media screen and (min-width: 1100px) {
  .mobile {
    display: none;
  }
}
</style>