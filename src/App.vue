<template>
  <div id="app">
    <v-app>
      <div class="app-wrapper">
        <Navbar class="navbar-wrapper" />
        <router-view class="page-wrapper" />
      </div>

      <Notification
        v-for="notification in notifications"
        :key="notification + Math.ceil(Math.random() * 10)"
        :notification_text="notification"
        @end="notification_end"
      />
    </v-app>
  </div>
</template>

<script>
import UserService from "./services/user.service";
import Navbar from "@/components/Navbar.vue";
import Notification from "@/components/Notification.vue";

export default {
  data: function () {
    return {
      notifications: [],
    };
  },
  components: {
    Navbar,
    Notification,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    notification_end(text) {
      var index = this.notifications.indexOf(text);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
  },
  watch: {
    //or $route(to, from)
    $route() {
      // this.notifications.push("changed page");
      // UserService.getNotifications().then(
      //     (response) => {
      //       console.log(response.data)
      //     },
      //     (error) => {
      //       console.log(error);
      //     }
      //   );

      var today = new Date();
      var last_login = this.currentUser
        ? new Date(this.currentUser.last_login)
        : "";

      if (this.currentUser && today.getDate() !== last_login.getDate()) {
        UserService.todayLogin().then(
          (response) => {
            response.data.data["last_login"] = today;
            this.$store.dispatch("auth/userUpdate", response.data.data);
            // this.dialog = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  created() {
    this.$vuetify.theme.themes.light.primary = "#50575C";
    this.$vuetify.theme.themes.light.secundary = "#27ADE4";
    this.$vuetify.theme.themes.light.accent = "#F1F1F1";
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
  text-decoration: none;
}

#app a:active {
  text-decoration: none;
}

@media screen and (max-width: 1100px) {
  .page-wrapper {
    height: 90vh;
    overflow-y: hidden;
    margin-top: 10vh;
  }
}

@media screen and (min-width: 1100px) {
  .app-wrapper {
    width: 100vw;
    display: flex;
  }

  .navbar-wrapper {
    width: 25vw;
  }

  .page-wrapper {
    width: 75vw;
  }
}
</style>