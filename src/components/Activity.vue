<template>
  <div
    class="activity"
    :class="{
      participated: activity.participated,
      quest: !activity.participated && activity.quest,
    }"
  >
    <p class="hours">{{ activity.time }}</p>

    <div class="activity-info">
      <div class="activity-img">
        <img
          :src="images[current_image % images.length]"
          alt="activity-company"
        />
      </div>
      <div class="activity-text">
        <p class="type">{{ activity.type }}</p>
        <p v-if="activity.name" class="name">{{ activity.name }}</p>
        <p v-if="companies" class="companies">{{ companies }}</p>
        <p v-if="speakers" class="speakers">{{ speakers }}</p>
      </div>
    </div>

    <p v-if="currentPage !== 'Quests'" class="description">
      {{ activity.description }}
    </p>

    <div
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

    <div class="buttons">
      <button v-if="activity.zoom_url" @click.stop="zoom">ZOOM</button>
      <button @click.stop="dialog = true">See More</button>
      <button @click.stop="calender">Add to Calender</button>
    </div>

    <v-dialog v-model="dialog">
      <v-card>
        <div class="dialog-wrapper">
          <p class="dialog-type">{{ activity.type }}</p>
          <p v-if="activity.name" class="dialog-name">{{ activity.name }}</p>
          <div class="dialog-time">
            <p class="dialog-day">{{ activity.day }}</p>
            <p class="dialog-hours">{{ activity.time }}</p>
          </div>
          <p class="dialog-location">{{ activity.location }}</p>
          <p class="dialog-description">{{ activity.description }}</p>
          <p v-if="activity.companies.data.length > 0" class="dialog-title">Companies</p>
          <center>
            <img
              class="dialog-img"
              v-for="company in activity.companies.data"
              :key="company.name"
              :src="jeec_brain_url + company.logo"
            />
          </center>
          <p v-if="activity.speakers.data.length > 0" class="dialog-title">Speakers</p>
          <center>
            <figure
              class="dialog-speaker"
              v-for="speaker in activity.speakers.data"
              :key="speaker.name"
            >
              <img
                class="dialog-img dialog-speaker-img"
                :src="jeec_brain_url + speaker.image"
              />
              <figcaption class="dialog-speaker-name">
                {{ speaker.name }}
              </figcaption>
            </figure>
          </center>
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
    };
  },
  props: {
    activity: Object,
  },
  computed: {
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
      }, 5000);
    },
    zoom() {
      window.location.replace(this.activity.zoom_url);
    },
    calender() {
      var url = "https://calendar.google.com/calendar/render?action=TEMPLATE";
      url = url + '&text=' + this.activity.name;
      url = url + '&dates=' + '20201231T193000Z/20201231T223000Z';
      url = url + '&details=' + this.activity.description ? this.activity.description : "";
      url = url + '&ctz=' + 'Europe/Lisbon';
      url = url + '&location=' + this.activity.location;
      url = url + '&crm=' + 'AVAILABLE|BUSY|BLOCKING';
      url = url + 'sprop=website:www.santa.org&sprop=name:Sata-online';

      window.location.replace(url);
    },
  },
  mounted() {
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
  margin-right: 3vw;
  overflow: hidden;
}

.activity-img img {
  position: absolute;
  margin: auto;
  max-height: 13vh;
  max-width: 13vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.dialog-img {
  height: 8vh;
  max-width: 70vw;
  margin: 1vh;
}

.dialog-type {
  font-size: 3vh;
  font-weight: 600;
  text-align: center;
  margin: 0;
}

.dialog-name {
  font-size: 3.5vh;
  font-weight: 600;
  color: #707070;
  text-align: center;
  margin: 0;
}

.dialog-time {
  display: flex;
  justify-content: center;
}

.dialog-day,
.dialog-hours {
  margin: 0;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 2.2vh;
  font-weight: 800;
}

.dialog-location {
  font-size: 2.5vh;
  font-weight: 800;
  text-align: center;
  margin: 0;
}

.dialog-description {
  text-align: justify;
  padding-left: 2vw;
  padding-right: 2vw;
  font-size: 2.2vh;
  margin: 0;
}

.dialog-title {
  margin: 0;
  text-align: center;
  font-size: 3vh;
  font-weight: 600;
  margin-top: 1.5vh;
}

.dialog-speaker {
  display: inline-block;
  text-align: center;
  margin-left: 2vw;
  margin-right: 2vw;
}

.dialog-speaker-img {
  vertical-align: top;
}

.dialog-speaker-name {
  font-size: 2.5vh;
  font-weight: 600;
}
</style>
