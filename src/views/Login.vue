<template>
  <div class="login">
    <button @click.stop="login">Login</button>
    <br>
    <button @click.stop="login2">Login 2</button>
    {{ message }}
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data: function () {
    return {
      user: new User("","","","",""),
      message: "",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  mounted() {},
  methods: {
    login() {
      window.location.replace(this.jeec_brain_url + "student/login");
    },
    login2() {
      if (this.$route.query.jwt) {
        this.$store.dispatch("auth/login", [this.user, this.$route.query.jwt]).then(
          () => {
            this.$router.push("/");
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style scoped>
</style>
