<template>
  <div
    class="activity"
    :class="{
      participated: activity.participated,
      quest: !activity.participated && activity.quest,
    }"
  >
    <p class="hours mobile">{{ activity.time }}</p>

    <div class="activity-info">
      <div
        class="activity-img"
        :style="
          'background-image:' +
          'url(' +
          images[current_image % images.length] +
          ')'
        "
      ></div>
      <div class="activity-text">
        <p class="type">{{ activity.type }}</p>
        <p v-if="activity.name" class="name">{{ activity.name }}</p>
        <p v-if="companies" class="companies">{{ companies }}</p>
        <p v-if="speakers" class="speakers">{{ speakers }}</p>
        <p class="inner-description">{{ activity.description }}</p>
      </div>
      <div class="activity-right browser">
        <p class="hours">{{ activity.time }}</p>

        <div class="buttons">
          <!-- <button v-if="activity.zoom_url"><a :href="zoom()">Add to Calendar</a></button> -->
          <button @click.stop="dialog = true">See More</button>
          <button @click.stop="$refs.calendar.click()">
            <a ref="calendar" :href="calendar()" target="_blank"
              >Add to Calendar</a
            >
          </button>
        </div>

        <div
          v-if="activity.points"
          class="xp-wrapper"
          :class="{ quest2: !activity.participated && activity.quest }"
        >
          <span
            class="xp-value"
            :class="{ quest3: !activity.participated && activity.quest }"
            >{{ activity.points }}</span
          >
          <span class="xp">xp</span>
        </div>
      </div>
    </div>

    <!-- <p v-if="currentPage !== 'Quests'" class="description">
      {{ activity.description }}
    </p> -->

    <div
      v-if="activity.points"
      class="xp-wrapper mobile"
      :class="{ quest2: !activity.participated && activity.quest }"
    >
      <span
        class="xp-value"
        :class="{ quest3: !activity.participated && activity.quest }"
        >{{ activity.points }}</span
      >
      <span class="xp">xp</span>
    </div>

    <div class="buttons mobile">
      <!-- <button v-if="activity.zoom_url"><a :href="zoom()">Add to Calendar</a></button> -->
      <button @click.stop="dialog = true">See More</button>
      <button @click.stop="$refs.calendar.click()">Add to Calendar</button>
    </div>

    <v-dialog
      v-model="dialog"
      style="overflow-x: visible !important"
      :width="width > 1100 ? '70vw' : ''"
    >
      <v-card>
        <v-icon @click.stop="dialog = false" class="close-dialog"
          >mdi-close</v-icon
        >
        <div class="dialog-wrapper">
          <div>
            <center
              class="dialog-companies mobile"
              v-if="activity.companies.data.length > 0"
            >
              <div
                class="dialog-company-img"
                :style="
                  'background-image:' +
                  'url(' +
                  jeec_brain_url +
                  company.logo +
                  ')'
                "
                v-for="company in activity.companies.data"
                :key="company.name"
              ></div>
            </center>
            <p class="dialog-type">{{ activity.type }}</p>
            <p v-if="activity.name" class="dialog-name">{{ activity.name }}</p>
            <p v-if="activity.companies.data.length > 0" class="dialog-by">
              by {{ companies }}
            </p>
            <p class="dialog-description">{{ activity.description }}</p>
            <p class="dialog-raffle">Raffle: {{ activity.reward.name }}</p>
            <p class="dialog-warning" v-if="activity.type === '15/15'">
              This activity is held in the company's Job Fair booth
            </p>
            <p
              class="dialog-warning"
              v-if="
                activity.type === 'Discussion Panel' ||
                activity.type === 'Speaker'
              "
            >
              This activity is held in the Job Fair's auditorium
            </p>

            <div class="dialog-time browser">
              <p class="dialog-day">
                <v-icon>mdi-calendar-arrow-right</v-icon> {{ activity.day }}
              </p>
              <p class="dialog-hours">
                <v-icon>mdi-clock-time-four-outline</v-icon>
                {{ activity.time }} -
                {{ activity.end_time }}
              </p>
            </div>
          </div>
          <div class="rect browser"></div>
          <div>
            <center
              class="dialog-companies browser"
              v-if="activity.companies.data.length > 0"
            >
              <div
                class="dialog-company-img"
                :style="
                  'background-image:' +
                  'url(' +
                  jeec_brain_url +
                  company.logo +
                  ')'
                "
                v-for="company in activity.companies.data"
                :key="company.name"
              ></div>
            </center>
            <center
              v-if="activity.speakers.data.length > 0"
              class="dialog-speakers"
            >
              <figure
                class="dialog-speaker"
                v-for="speaker in normal_speakers"
                :key="speaker.name"
              >
                <img
                  class="dialog-speaker-img"
                  :src="jeec_brain_url + speaker.image"
                />
                <figcaption class="dialog-speaker-caption">
                  <p>{{ speaker.name }}</p>
                  <p>
                    {{ speaker.position
                    }}{{ speaker.company ? " @ " + speaker.company : "" }}
                  </p>
                </figcaption>
              </figure>
            </center>

            <center class="moderator" v-if="moderator">
              <figure class="dialog-speaker">
                <img
                  class="dialog-speaker-img moderator"
                  :src="jeec_brain_url + moderator.image"
                />
                <figcaption class="dialog-speaker-caption">
                  <p>{{ moderator.name }}</p>
                  <p>
                    {{ moderator.position
                    }}{{ moderator.company ? " @ " + moderator.company : "" }}
                  </p>
                </figcaption>
              </figure>
            </center>

            <center
              class="dialog-speakers-companies"
              v-if="activity.type !== 'Discussion Panel' && speakers_companies"
            >
              <img
                v-for="company in speakers_companies"
                :key="company"
                :src="jeec_brain_url + company"
              />
            </center>

            <div class="dialog-buttons">
              <button
                v-if="activity.zoom_url"
                style="background-color: #27ade4"
                @click.stop="$refs.zoom.click()"
              >
                <a ref="zoom" :href="activity.zoom_url" target="_blank"
                  >Zoom Link</a
                >
              </button>
              <button
                v-if="activity.registration_open && activity.registration_link"
                style="background-color: #e42741"
                @click.stop="$refs.registration.click()"
              >
                <a
                  ref="registration"
                  :href="activity.registration_link"
                  target="_blank"
                  >Registration</a
                >
              </button>
              <button
                style="background-color: #27ade4"
                @click.stop="$refs.calendar.click()"
              >
                Add to Calendar
              </button>
            </div>
          </div>
          <div class="dialog-time mobile">
            <p class="dialog-day">
              <v-icon>mdi-calendar-arrow-right</v-icon> {{ activity.day }}
            </p>
            <p class="dialog-hours">
              <v-icon>mdi-clock-time-four-outline</v-icon> {{ activity.time }} -
              {{ activity.end_time }}
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Activity",
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      currentPage: this.$route.name,
      images: [],
      current_image: 0,
      dialog: false,
      width: window.innerWidth,
    };
  },
  props: {
    activity: Object,
  },
  computed: {
    speakers_companies() {
      var speakers = this.activity.speakers.data.slice(0);
      var companies = [];

      for (var i = 0; i < speakers.length; i++) {
        if (
          speakers[i].company &&
          speakers[i].company_logo &&
          !companies.includes(speakers[i].company_logo)
        ) {
          companies.push(speakers[i].company_logo);
        }
      }

      return companies;
    },
    normal_speakers() {
      var speakers = this.activity.speakers.data.slice(0);

      for (var i = 0; i < speakers.length; i++) {
        if (speakers[i].name === this.activity.moderator) {
          speakers.splice(i, 1);
        }
      }

      return speakers;
    },
    moderator() {
      var speakers = this.activity.speakers.data;

      for (var i = 0; i < speakers.length; i++) {
        if (speakers[i].name === this.activity.moderator) {
          return speakers[i];
        }
      }

      return null;
    },
    companies() {
      var companies = [];

      for (var i = 0; i < this.activity.companies.data.length; i++) {
        companies.push(this.activity.companies.data[i].name);
      }

      return companies.join(", ");
    },
    speakers() {
      var speakers = [];

      for (var i = 0; i < this.activity.speakers.data.length; i++) {
        speakers.push(this.activity.speakers.data[i].name);
      }

      return speakers.join(", ");
    },
  },
  methods: {
    updateImages() {
      setInterval(() => {
        this.current_image = this.current_image + 1;
      }, 2500);
    },
    calendar() {
      var url = "https://calendar.google.com/calendar/render?action=TEMPLATE";
      url = url + "&text=" + this.activity.name;
      url = url + "&ctz=" + "Europe/Lisbon";
      url = url + "&location=" + this.activity.location;
      url = url + "&dates=" + this.getDate();
      url =
        url +
        "&sprop=website:" +
        this.activity.registration_link +
        "&sprop=name:" +
        this.activity.name;

      if (this.activity.registration_open) {
        url =
          url +
          "&details=" +
          "Registrations in " +
          this.activity.registration_link +
          "\n" +
          this.activity.description;
      } else {
        url = url + "&details=" + this.activity.description;
      }

      var date = new Date();

      if (
        date.getHours().toString() + ":" + date.getMinutes().toString() >
        this.activity.time
      ) {
        url = url + "&crm=" + "BUSY"; //busy
      } else if (!this.activity.registration_open) {
        url = url + "&crm=" + "BLOCKING"; //blocking
      } else {
        url = url + "&crm=" + "AVAILABLE"; //available
      }

      return url;
    },
    getDate() {
      var start_date = new Date(
        this.activity.day.substring(0, 11) + " " + this.activity.time + ":00"
      );
      var end_date = new Date(
        this.activity.day.substring(0, 11) +
          " " +
          this.activity.end_time +
          ":00"
      );

      start_date =
        start_date.getFullYear().toString() +
        (start_date.getMonth() + 1 < 10
          ? "0" + (start_date.getMonth() + 1).toString()
          : (start_date.getMonth() + 1).toString()) +
        start_date.getDate().toString() +
        "T" +
        (start_date.getHours() < 10
          ? "0" + start_date.getHours()
          : start_date.getHours()) +
        (start_date.getMinutes() < 10
          ? "0" + start_date.getMinutes()
          : start_date.getMinutes()) +
        "00";

      end_date =
        end_date.getFullYear().toString() +
        (end_date.getMonth() + 1 < 10
          ? "0" + (end_date.getMonth() + 1).toString()
          : (end_date.getMonth() + 1).toString()) +
        end_date.getDate().toString() +
        "T" +
        (end_date.getHours() < 10
          ? "0" + end_date.getHours()
          : end_date.getHours()) +
        (end_date.getMinutes() < 10
          ? "0" + end_date.getMinutes()
          : end_date.getMinutes()) +
        "00";

      return start_date + "/" + end_date;
    },
    resize() {
      this.width = window.innerWidth;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);

    for (var i = 0; i < this.activity.companies.data.length; i++) {
      if (this.activity.companies.data[i].logo) {
        this.images.push(
          this.jeec_brain_url + this.activity.companies.data[i].logo
        );
      }
    }

    for (var j = 0; j < this.activity.speakers.data.length; j++) {
      if (this.activity.speakers.data[j].image) {
        this.images.push(
          this.jeec_brain_url + this.activity.speakers.data[j].image
        );
      }
    }

    this.updateImages();
  },
};
</script>

<style scoped>
.activity {
  margin-bottom: 0.5vh;
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
  position: relative;
}

.participated {
  background-color: #c0ffbc;
}

.quest {
  background-color: #ffbcbc;
}

.activity-img {
  position: relative;
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.1vh solid #707070;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 3vw;
}

.activity-info {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1 1 100%;
  margin-bottom: 1.5vh;
}

.activity-text {
  max-width: 65vw;
}

.hours {
  position: absolute;
  right: 0;
  margin-right: 4vw;
  font-size: 2.7vh;
}

.name {
  font-size: 2.8vh;
  font-weight: 700;
  margin: 0;
  color: #707070;
  text-align: left;
}

.type {
  font-size: 3.5vh;
  font-weight: 600;
  margin: 0;
  text-align: left;
  line-height: 3vh;
}

.companies,
.speakers {
  margin: 0;
  margin-bottom: -0.5vh;
  text-align: left;
  font-size: 2.5vh;
}

.description {
  font-size: 2vh;
  font-weight: 500;
  text-align: left;
  text-align: justify;
  margin-bottom: 1.5vh;
  max-height: 8vh;
  overflow-y: auto;
  padding-right: 1vw;
}

.description::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 2vw;
  background-color: #70707077;
}

.description::-webkit-scrollbar-thumb {
  border-radius: 1vh;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}

.buttons {
  display: flex;
  width: 66vw;
  justify-content: flex-end;
  margin-right: 20vw;
}

.buttons button {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 1.5vh;
  font-weight: 600;
  color: white;
  padding: 0.5vh;
  width: 20vw;
  line-height: 1.7vh;
  min-height: 4vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.buttons a {
  color: white;
}

.xp-wrapper {
  position: absolute;
  right: 0;
  margin-right: 4vw;
}

.quest2 {
  color: #ff0000;
}

.xp-value {
  font-size: 3.5vh;
  font-weight: 600;
}

.quest3 {
  font-size: 4.5vh;
  font-weight: 700;
}

.xp {
  font-size: 1.6vh;
  font-weight: 600;
}

.close-dialog {
  position: absolute;
  right: 0;
  top: 0;
}

.dialog-wrapper {
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 3vw;
  padding-right: 3vw;
}

.dialog-companies {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.dialog-company-img {
  position: relative;
  height: 9vh;
  width: 9vh;
  border-radius: 50%;
  border: 0.1vh solid #707070;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.dialog-type {
  font-size: 3.5vh;
  font-weight: 600;
  text-align: center;
  margin: 0;
  margin-top: 1vh;
}

.dialog-name {
  font-size: 3vh;
  font-weight: 500;
  line-height: 3vh;
  text-align: center;
  margin: 0;
  margin-bottom: 1vh;
}

.dialog-by {
  text-align: center;
  font-size: 2vh;
  font-weight: 600;
  margin: 0;
}

.dialog-description {
  text-align: justify !important;
  font-size: 2.2vh;
  line-height: 2.5vh;
  font-weight: 500;
  margin: 0;
}

.dialog-raffle {
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  margin-top: 1vh;
  margin-bottom: 0;
}

.dialog-buttons {
  margin-top: 2vh;
  display: flex;
  justify-content: space-evenly;
}

.dialog-buttons * {
  color: white;
}

.dialog-buttons > button {
  width: 100%;
  min-height: 6vh;
  border-radius: 2vh;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 2.1vh;
  font-weight: 500;
}

.dialog-warning {
  color: #e42741;
  font-size: 2vh;
  font-weight: bolder;
  margin: 0;
  text-align: center;
}

.dialog-speakers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1vh;
}

.dialog-speaker {
  display: flex;
  text-align: center;
  margin-left: 2vw;
  margin-right: 2vw;
  justify-content: center;
  align-self: flex-start;
  margin-bottom: 1vh;
}

.dialog-speaker-img {
  height: 7.5vh;
  width: 7.5vh;
  margin-right: 2vw;
  border-radius: 50%;
}

.moderator img {
  border: 0.4vh solid #27ade4;
  box-shadow: 0 0 1vh 0.2vh #27ade4;
}

.dialog-speaker-caption {
  width: 18vw;
}

.dialog-speaker-caption p:first-of-type {
  font-size: 1.7vh;
  font-weight: 600;
  margin: 0;
  text-align: left;
}

.dialog-speaker-caption p:last-of-type {
  font-size: 1.4vh;
  margin: 0;
  text-align: left;
}

.dialog-speakers-companies {
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.dialog-speakers-companies img {
  max-height: 8vh;
  max-width: 30vw;
}

.dialog-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vh;
  text-align: center;
}

.dialog-day,
.dialog-hours {
  margin: 0;
  font-size: 2.2vh;
  font-weight: 800;
}

.dialog-location {
  font-size: 2.5vh;
  font-weight: 800;
  text-align: center;
  margin: 0;
}

.dialog-title {
  margin: 0;
  text-align: center;
  font-size: 3vh;
  font-weight: 600;
  margin-top: 1.5vh;
}

@media screen and (max-width: 1100px) {
  .inner-description {
    display: none;
  }

  .browser {
    display: none;
  }

  .activity-text {
    max-width: calc(89vw - 13vh);
  }
}

@media screen and (min-width: 1100px) {
  .activity-img {
    height: 20vh;
    width: 20vh;
  }

  .description {
    display: none;
  }

  .activity-text {
    max-width: 100vw;
    width: calc(48vw - 20vh);
  }

  .activity-right {
    width: 16vw;
  }

  .hours {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 4vh;
    margin: 0;
  }

  .xp-wrapper {
    position: relative;
    margin: 0;
    margin-top: -1vh;
    width: 100%;
    text-align: center;
  }

  .xp-value {
    font-size: 5vh;
  }

  .xp {
    font-size: 4vh;
  }

  .buttons {
    display: block;
  }

  .buttons {
    width: 16vw;
  }

  .buttons button {
    width: 14vw;
    min-height: 7vh;
    font-size: 2.5vh;
    padding: 0.5vhvh;
    line-height: 2.6vh;
    margin-bottom: 1vh;
  }

  .inner-description {
    font-size: 2.1vh;
    text-align: justify;
    margin-top: 2vh;
    margin-bottom: 0;
    line-height: 2.2vh;
  }

  .inner-description::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.5vw;
    background-color: #70707077;
  }

  .inner-description::-webkit-scrollbar-thumb {
    border-radius: 1vh;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  .mobile {
    display: none;
  }

  .dialog-wrapper {
    display: flex;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
  }

  .dialog-wrapper * {
    text-align: left;
  }

  .dialog-wrapper > div:first-of-type {
    width: 52vw;
  }

  .dialog-wrapper > div:nth-child(3) {
    width: 48vw;
  }

  .dialog-time {
    justify-content: left;
  }

  .dialog-day {
    margin-right: 2vw;
  }

  .dialog-description {
    padding-right: 1vw;
    height: auto;
  }

  .rect {
    width: 4px;
    height: auto;
    background-color: #27ade4;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
  }

  .dialog-company-img {
    margin-left: 2vw;
    margin-right: 2vw;
  }

  .dialog-speakers {
    width: 100%;
  }

  .dialog-speaker {
    margin: 0;
    margin-bottom: 1.7vh;
  }

  .dialog-speaker-caption {
    width: 9vw;
  }

  .dialog-speaker-caption p:first-of-type {
    line-height: 2.5vh;
  }

  .dialog-speaker-caption p:last-of-type {
    font-size: 1.3vh;
    font-weight: 500;
  }

  .dialog-speaker-img {
    margin-right: 1vw;
  }

  .dialog-buttons {
    flex-wrap: wrap;
  }

  .dialog-buttons button {
    text-align: center;
    font-size: 2.4vh;
    width: 20vw;
    margin-top: 1vh;
    min-height: 5vh;
  }
}
</style>