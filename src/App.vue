<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>

    <v-dialog v-model="dialog">
      <v-card>
        <img src="https://i.ytimg.com/vi/64Sb3IoOEqo/hqdefault.jpg" alt="" />
        <b>50 points to grinfidor</b>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserService from "./services/user.service";

export default {
  data: function () {
    return {
      dialog: false,
    };
  },
  mounted() {
    this.$vuetify.theme.themes.light.primary = "#50575C";
    this.$vuetify.theme.themes.light.secundary = "#27ADE4";
    this.$vuetify.theme.themes.light.accent = "#F1F1F1";

    var today = new Date();
    var last_login = new Date(this.currentUser.last_login);

    if (today.getDate() !== last_login.getDate()) {
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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
</style>