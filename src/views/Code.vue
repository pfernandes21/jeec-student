<template>
  <div class="code">
    <p class="code-title">Redeem Code:</p>
    <div class="code-page" style="margin-top: 10vh">
      <input
        type="text"
        class="input-code"
        placeholder="xxxx-xxxx-xxxx-xxxx"
        v-model="code"
        autofocus
      />
      <center>
        <v-btn
          depressed
          @click.stop="redeem"
          class="redeem white--text"
          color="secundary"
          >Redeem</v-btn
        >
      </center>

      <p class="error-msg">{{ error }}</p>

      <div class="xp-wrapper">
        <div>
          <p class="xp-top">Personal:</p>
          <span class="xp-value">{{ currentUser.total_points }}</span
          ><span class="xp">xp</span>
        </div>
        <div>
          <p class="xp-top">Squad:</p>
          <span class="xp-value">{{ squad ? squad.total_points : "0" }}</span
          ><span class="xp">xp</span>
        </div>
      </div>
      <div class="referral">
        <input ref="referral" type="text" :value="referral_code" readonly />
        <v-btn
          depressed
          color="secundary"
          class="clipboard white--text"
          @click.stop="clipboard"
          >Copy to Clipboard<v-icon style="margin-left: 3vw"
            >mdi-content-copy</v-icon
          ></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Code",
  components: {
  },
  data: function () {
    return {
      code: "",
      prev_length: 0,
      dialog: false,
      points: 0,
      squad: null,
      error: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    referral_code() {
      var code = this.$store.state.auth.user.referral_code;
      return (
        code.substring(0, 4) +
        "-" +
        code.substring(4, 8) +
        "-" +
        code.substring(8, 12) +
        "-" +
        code.substring(12, 16)
      );
    },
  },
  methods: {
    redeem() {
      if (this.code.replaceAll("-", "").length == 16) {
        UserService.redeemCode(this.code).then(
          (response) => {
            this.points =
              response.data.data.total_points - this.currentUser.total_points;
            this.$store.dispatch("auth/userUpdate", response.data.data);

            UserService.getUserSquad().then(
              (response) => {
                this.squad = response.data.data;
              },
              (error) => {
                console.log(error);
              }
            );

            this.dialog = true;
            this.error = "";
          },
          (error) => {
            this.error = "Invalid Code";
            console.log(error);
          }
        );
      }
    },
    clipboard() {
      this.$refs.referral.select();
      document.execCommand("copy");
    },
  },
  watch: {
    code(val) {
      if (
        val.replaceAll("-", "").length % 4 === 0 &&
        val[val.length - 1] !== "-" &&
        val.replaceAll("-", "").length < 16 &&
        val.length > 0 &&
        val.length > this.prev_length
      ) {
        this.code = this.code + "-";
      }

      if (val.replaceAll("-", "").length > 16) {
        this.code = this.code.substring(0, 19);
      }

      if (this.prev_length == 0) {
        for (var i = 0; i < this.code.length; i++) {
          if ((i == 4 || i == 9 || i == 14) && this.code[i] !== "-") {
            this.code =
              this.code.substring(0, i) + "-" + this.code.substring(i);
            i--;
          }
        }
      }

      this.prev_length = val.length;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.code {
  height: 100%;
  background-color: #f1f1f1;
}

.code-page {
  padding-top: 6vh;
  padding-bottom: 6vh;
  padding-left: 10vw;
  padding-right: 10vw;
}

.input-code {
  width: 80vw;
  height: 7vh;
  background-color: white;
  text-align: center;
  border: 0.1vh solid #707070;
  font-size: 3.2vh;
  font-weight: 500;
}

.clipboard,
.redeem {
  border-radius: 2vh;
  font-size: 3vh;
  font-weight: 600;
  color: white;
  width: 43vw;
  height: auto;
  margin-top: 2.5vh;
  padding: 0.5vh;
}

.clipboard {
  width: auto;
  margin-top: 1vh;
}

.xp-wrapper {
  text-align: center;
  margin-top: 1.5vh;
}

.xp-top {
  font-size: 3vh;
  font-weight: 700;
  color: #aaadb0;
  margin: 0;
  margin-bottom: -3vh;
}

.xp-value {
  font-size: 11vh;
  font-weight: 600;
  margin: 0;
}

.xp {
  font-weight: 700;
}

.code-title {
  text-align: center;
  color: #aaadb0;
  font-size: 6vh;
  font-weight: 700;
  margin-top: 15vh;
}

.referral {
  text-align: center;
  font-size: 3.5vh;
  font-weight: 600;
  margin-top: 2vh;
}

.referral input {
  text-align: center;
  width: 100%;
}

.referral::before {
  content: "Referral Code:";
  font-size: 4vh;
  font-weight: 700;
  color: #aaadb0;
}

.error-msg {
  font-size: 3vh;
  font-weight: 700;
  color: red;
  text-align: center;
  margin-bottom: 0;
  margin-top: 1vh;
}

@media screen and (max-width: 1100px) {
  .code-title {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .code-page {
    margin-top: 0 !important;
  }

  .input-code {
    width: 50vw;
    margin-left: 15vw;
  }

  .redeem {
    width: 20vw;
  }

  .xp-wrapper {
    display: flex;
    justify-content: space-between;
    margin-left: 20vw;
    margin-right: 20vw;
  }

  .xp-top {
    font-size: 5vh;
  }

  .xp-value {
    font-size: 14vh;
  }

  .xp {
    font-size: 4vh;
    font-weight: 700;
  }
}
</style>
