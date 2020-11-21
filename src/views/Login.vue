<template>
  <div class="login">
    <div class="loading">
      <div class="loading-center">
        <img
          alt="JEEC logo"
          src="../assets/jeec_white.svg"
          style="height: 15vh"
        />
      </div>
      <div @click.stop="login" class="login-button">
        Login
        <img
          alt="JEEC logo"
          src="../assets/fenix.png"
          style="height: 6vh; margin-left: 2vw"
        />
      </div>
      <div class="loading-bottom">
        <img alt="IST logo" src="../assets/tecnico.svg" style="height: 8vh" />
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data: function () {
    return {
      user: new User(),
      message: "",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      //loading: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);

    if (this.$route.query.jwt) {
      this.$store
        .dispatch("auth/login", [this.user, this.$route.query.jwt])
        .then(
          () => {
            this.$router.push("/home");
          },
          (error) => {
            console.log(error);
          }
        );
    }
  },
  methods: {
    login() {
      window.location.replace(this.jeec_brain_url + "/student/login");
    },
  },
};
</script>

<style scoped>
.login {
  height: 100%;
}

.loading {
  background-color: #50575c;
  height: 100vh;
  position: relative;
}

.loading-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.login-button {
  display: flex;
  align-items: center;
  border: 0.1vh solid white;
  border-radius: 0.9vh;
  padding: 1vh;
  background-color: white;
  color: #50575c;
  font-size: 5.5vh;
  font-weight: 600;
  position: absolute;
  top: 70%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.loading-bottom {
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
