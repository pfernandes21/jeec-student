<template>
  <div class="login">
    <div class="loading">
      <div class="loading-top">
        <img
          alt="JEEC logo"
          src="../assets/jeec_colour_no_edition.svg"
          style="width: 75vw"
        />
      </div>
      <div class="buttons-flex">
        <div @click.stop="login_student" class="button" style="background-color: #27ADE4">
          <img
            alt="Fenix logo"
            src="../assets/icons/graduation-hat.svg"
            class="icon"
            style="margin-top: 0.5vw"
          />
          Student Login
        </div>
        <div @click.stop="login_partner" class="button" style="background-color: #27ADE4">
          <img
            alt="Fenix logo"
            src="../assets/icons/businessman.svg"
            class="icon"
          />
          Partner Login
        </div>
        <div @click.stop="return_website" class="button" style="background-color: #E42741">
          <img
            alt="Fenix logo"
            src="../assets/icons/back-arrow.svg"
            class="icon"
          />
          Return to Website
        </div>
      </div>
      <div class="loading-bottom">
        <img alt="IST logo" src="../assets/tecnico_grey.svg" style="width: 32vw" />
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
// import UserService from "../services/user.service";

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
    login_student() {
      window.location.replace("https://fenix.tecnico.ulisboa.pt/oauth/userdialog?client_id=1132965128044826&redirect_uri=http://51.11.191.17:8083/student/redirect_uri&");
    },
    login_partner() {
      window.location.replace("https://brain.jeec.ist/companies/");
    },
    return_website() {
      window.location.replace("https://jeec.ist/");
    },
  },
  created() {
    if (this.$route.query.code) {
      this.$store
        .dispatch("auth/login", [
          this.user,
          this.decrypt(this.$route.query.code),
        ])
        .then(
          () => {
            this.$router.push('/home');
          },
          () => {
            this.$store.dispatch("auth/logout");
          }
        );
    } 
    else if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  transform: translateY(-10vh);
}

.loading {
  background-color: #F1F1F1;
  height: 100vh;
  position: relative;
}

.loading-top {
  position: absolute;
  top: 20%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.buttons-flex {
  width: 100%;
  padding: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.button {
  height: 13vw;
  display: flex;
  align-items: center;
  border-radius: 6vw;
  padding: 5vw;
  margin: 2vw;
  color: #FFFFFF;
  font-size: 4.5vw;
  font-weight: 650;
  cursor: pointer;
}

.icon {
  padding-right: 5vw;
  height: 7vw;
}

.loading-bottom {
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
