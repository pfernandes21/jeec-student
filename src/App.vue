<template>
  <div id="app">
    <v-app>
      <Navbar @notification="notification" />
      <router-view />

      <v-dialog v-model="dialog">
        <v-card>
          <img src="https://i.ytimg.com/vi/64Sb3IoOEqo/hqdefault.jpg" alt="" />
          <b>50 points to grinfidor</b>
        </v-card>
      </v-dialog>

      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="#FFE785"
        absolute
      >
        <div class="notification">
          <img src="./assets/icons/trophy.svg" />
          <p>
            {{ notification_text }}
          </p>
          <v-icon color="#FFB300" style="margin-left: 4vw" @click.stop="snackbar = false"
            >mdi-close</v-icon
          >
        </div>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import UserService from "./services/user.service";
import Navbar from "@/components/Navbar.vue";

export default {
  data: function () {
    return {
      dialog: false,
      notification_text: "",
      timeout: 5000,
      snackbar: false,
    };
  },
  components: {
    Navbar,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    notification(text) {
      this.notification_text = text;
      this.snackbar = true;
    },
  },
  created() {
    this.$vuetify.theme.themes.light.primary = "#50575C";
    this.$vuetify.theme.themes.light.secundary = "#27ADE4";
    this.$vuetify.theme.themes.light.accent = "#F1F1F1";

    var today = new Date();
    var last_login = this.currentUser
      ? new Date(this.currentUser.last_login)
      : "";

    if (this.currentUser && today.getDate() !== last_login.getDate()) {
      UserService.todayLogin().then(
        (response) => {
          response.data.data["last_login"] = today;
          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.dialog = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

#app,
.application {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}

#app button {
  outline: none;
}

#app a:link {
  text-decoration: none;
}

#app a:visited {
  text-decoration: none;
}

#app a:hover {
  text-decoration: underline;
}

#app a:active {
  text-decoration: underline;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5vh;
  font-weight: 600;
  color: black;
}

.notification p {
  margin: 0;
  text-align: justify;
}

.notification img {
  height: 3.5vh;
  filter: invert(70%) sepia(67%) saturate(2300%) hue-rotate(359deg)
    brightness(104%) contrast(104%);
  margin-right: 4vw;
}
</style>