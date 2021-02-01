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
          alt="Fenix logo"
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
import UserService from "../services/user.service";

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
  methods: {
    decrypt(code) {
      var master_key = "12345678901234561234567890123456";
      var rawData = atob(code.split("_").join("+"));

      var iv = rawData.substring(0, 16);
      var crypttext = rawData.substring(16);

      crypttext = this.CryptoJS.enc.Latin1.parse(crypttext);
      iv = this.CryptoJS.enc.Latin1.parse(iv);
      var key = this.CryptoJS.enc.Utf8.parse(master_key);

      var plaintextArray = this.CryptoJS.AES.decrypt(
        { ciphertext: crypttext },
        key,
        {
          iv: iv,
          mode: this.CryptoJS.mode.CBC,
          padding: this.CryptoJS.pad.Pkcs7,
        }
      );

      var output_plaintext = this.CryptoJS.enc.Latin1.stringify(plaintextArray);

      return output_plaintext;
    },
    login() {
      window.location.replace(this.jeec_brain_url + "/student/login");
    },
  },
  mounted() {
    if (this.$route.query.code) {
      this.$store
        .dispatch("auth/login", [
          this.user,
          this.decrypt(this.$route.query.code),
        ])
        .then(
          () => {
            UserService.getUserSquad().then(
              (response) => {
                this.squad = response.data.data;
              },
              (error) => {
                console.log(error);
              }
            );

            this.$router.push("/home");
          },
          () => {
            this.$store.dispatch("auth/logout");
          }
        );
    } else if (this.loggedIn) {
      this.$router.push("/home");
    }
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
  cursor: pointer;
}

.loading-bottom {
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
