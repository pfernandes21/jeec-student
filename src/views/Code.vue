<template>
  <div class="code">
    <Navbar :page="currentPage" />

    <div class="code-page" style="margin-top:10vh">
      <input
        type="text"
        class="input-code"
        placeholder="xxxx-xxxx-xxxx-xxxx"
        ref="code"
        autofocus
      />
      <center>
        <button @click.stop="redeem" class="redeem">Redeem</button>
      </center>

      <div class="xp-wrapper">
        <p class="xp-top">Personal:</p>
        <span class="xp-value">{{ currentUser.total_points }}</span
        ><span class="xp">xp</span>
        <p class="xp-top">Team:</p>
        <span class="xp-value">{{
          currentUser.squad ? currentUser.squad.total_points : "0"
        }}</span
        ><span class="xp">xp</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserService from "../services/user.service";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    redeem() {
      console.log(this.$refs.code.value);
      UserService.redeemCode(this.$refs.code.value).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
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
  font-size: 3.5vh;
  font-weight: 500;
}

.redeem {
  background-color: #27ade4;
  border-radius: 2vh;
  font-size: 4vh;
  font-weight: 600;
  color: white;
  width: 43vw;
  height: auto;
  margin-top: 2.5vh;
  padding: 0.5vh;
}

.xp-wrapper {
  width: 50%;
  margin: 0 auto;
  margin-top: 10vh;
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
</style>
