<template>
  <div class="quests">
    <Buttons @_click="click" :names="{ daily: button === 'daily', special: button === 'special' }" />

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
        :description="'<b>Logged in on ' + date.substring(0, 6) + '</b>'"
        :points="5"
        :done="true"
      />
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Activity from "@/components/Activity.vue";
import Quest from "@/components/Quest.vue";
import UserService from "../services/user.service";

export default {
  name: "Quests",
  components: {
    Activity,
    Quest,
    Buttons,
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
  methods: {
    click(name) {
      if(name !== this.button)
      {
        this.button = name;
      }
    },
  },
  created() {
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

.daily,
.special {
  margin-top: 18vh;
}

.no-activities-warning {
  margin-top: 16vh;
}

.quests-warning {
  padding-top: 3vh;
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
  .special {
    display: flex;
  }
}
</style>