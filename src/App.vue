<template>
  <div id="app">
    <VueTitle :title="title" />
    <v-app>
      <div class="app-wrapper">
        <Navbar v-if="$route.name !== 'Login'" class="navbar-wrapper" />
        <router-view
          class="page-wrapper"
          :class="$route.name === 'Login' ? 'login-page' : ''"
          @notification="notification"
        />
      </div>

      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :text="notification.text"
        :type="notification.type"
        :id="notification.id"
        @end="notification_end"
      />
    </v-app>
  </div>
</template>

<script>
import UserService from "./services/user.service";
import VueTitle from "@/components/VueTitle.vue";
import Navbar from "@/components/Navbar.vue";
import Notification from "@/components/Notification.vue";

export default {
  data: function() {
    return {
      notifications: []
    };
  },
  components: {
    VueTitle,
    Navbar,
    Notification
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    title() {
      return this.$route.name !== "Company"
        ? this.$route.name
        : this.$route.params.name;
    }
  },
  methods: {
    notification(message, type) {
      this.notifications.push({
        text: message,
        type: type,
        id: Math.floor(Math.random() * 10000)
      });
    },
    notification_end(id) {
      this.notifications = this.notifications.filter(row => row.id !== id);
    }
  },
  watch: {
    //or $route(to, from)
    $route(to) {
      // this.notifications.push("changed page");
      // UserService.getNotifications().then(
      //     (response) => {
      //       console.log(response.data)
      //     },
      //     (error) => {
      //       console.log(error);
      //     }
      //   );

      if (to.name !== "Login") {
        var today = new Date();
        var last_login = localStorage.getItem("last-login")
          ? new Date(localStorage.getItem("last-login"))
          : null;

        if (
          !last_login ||
          (this.currentUser && today.getDate() !== last_login.getDate())
        ) {
          UserService.todayLogin().then(
            response => {
              localStorage.setItem("last-login", today);
              this.$store.dispatch("auth/userUpdate", response.data.data);
              this.notification(
                "New daily login +" + process.env.VUE_APP_REWARD_LOGIN + "pts",
                "points"
              );
            },
            error => {
              console.log(error);
              if (error.response.status == 409) {
                localStorage.setItem("last-login", today);
              }
            }
          );
        }
      }
    }
  },
  created() {
    this.$vuetify.theme.themes.light.primary = "#50575C";
    this.$vuetify.theme.themes.light.secundary = "#27ADE4";
    this.$vuetify.theme.themes.light.accent = "#F1F1F1";
  }
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

#app .v-dialog {
  overflow-x: hidden;
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

.v-window__prev,
.v-window__next {
  background-color: #ffffff00 !important;
  height: 1px;
}

.v-carousel__item {
  height: 100% !important;
}

.v-sheet {
  height: 100% !important;
}

.login-page {
  width: 100vw !important;
  height: 100vh !important;
  transform: translateY(0) !important;
}

@media screen and (max-width: 1100px) {
  .app-wrapper {
    height: 100vh;
  }

  .page-wrapper {
    height: 90vh;
    overflow-y: hidden;
    margin-top: 10vh;
  }

  .login-page {
    transform: translateY(-10vh) !important;
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
