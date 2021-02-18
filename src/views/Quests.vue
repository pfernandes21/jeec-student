<template>
  <div class="quests">
    <center style="margin-top: 10vh">
      <div class="buttons">
        <button
          class="button"
          :class="{ active: button === 'daily' }"
          @click.stop="button = 'daily'"
        >
          Daily
        </button>
        <button
          class="button"
          :class="{ active: button === 'special' }"
          @click.stop="button = 'special'"
        >
          Special
        </button>
      </div>
    </center>

    <div class="daily" v-show="button === 'daily'">
      <div class="activities-wrapper">
        <Activity
          v-for="quest in quests"
          :key="quest.name + quest.type"
          :activity="quest"
        />
      </div>

      <div class="quests-warning">
        <p class="searching">Searching...</p>
        <span class="warning-msg">For more quests go to</span>
        <router-link to="/activities" class="warning-msg activities-link">
          Activities</router-link
        >
      </div>
    </div>

    <div class="special" v-show="button === 'special'">
      <Quest
        :image="require('../assets/icons/cv.svg')"
        :description="cv_description"
        :points="400"
        :done="currentUser.uploaded_cv"
      />
      <Quest
        :image="require('../assets/icons/linkedin.svg')"
        :description="linkedin_description"
        :points="400"
        :done="has_linkedin"
      />
      <Quest
        v-for="date in currentUser.login_dates"
        :key="date"
        :image="require('../assets/icons/login.svg')"
        :description="'<b>Logged in on ' + date.substring(0,6) + '</b>'"
        :points="5"
        :done="true"
      />
    </div>
  </div>
</template>

<script>
import Activity from "@/components/Activity.vue";
import Quest from "@/components/Quest.vue";
import UserService from "../services/user.service";

export default {
  name: "Quests",
  components: {
    Activity,
    Quest,
  },
  data: function () {
    return {
      button: "daily",
      quests: [],
      cv_description:
        "<b>Add your CV to your <a href=" +
        '"/profile"' +
        ' style="color:#27ade4;text-decoration:none;">Profile</a></b>',
      linkedin_description:
        "<b>Add your linkedin to your <a href=" +
        '"/profile"' +
        ' style="color:#27ade4;text-decoration:none;">Profile</a></b>',
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    has_linkedin() {
      if (this.$store.state.auth.user.linkedin_url) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getQuests().then(
      (response) => {
        this.quests = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
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
  display: flex;
  justify-content: center;
}

.button {
  background-color: rgba(88, 185, 224, 0.638);
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

.no-activities-warning {
  margin-top: 16vh;
}

.quests-warning {
  margin-top: 3vh;
  text-align: center;
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

@media screen and (min-width: 1100px) {
  .button {
    width: 19vw;
    margin-left: 8vw;
    margin-right: 8vw;
  }

  .special {
    display: flex;
  }
}
</style>