<template>
  <div class="home">
    <div v-show="loading" class="loading">
      <div class="loading-center">
        <img
          alt="JEEC logo"
          src="../assets/jeec_white.svg"
          style="width: 75vw"
        />
      </div>
      <div class="loading-bottom">
        <img alt="IST logo" src="../assets/tecnico.svg" style="width: 40vw" />
      </div>
    </div>
    <div v-show="!loading" class="home-page">
      <Navbar :page="currentPage" />

      <div class="top">
        <p class="plus">+</p>
        <p class="main-title">Pedro Fernandes</p>
        <p class="sub-title">lvl. 3</p>
        <center class="expbar">
          <Expbar :xp="10" :next_xp="100" width="92vw" />
        </center>

        <div class="next-reward">
          <div class="reward-img">
            <img src="../assets/test/Bepis.png" alt="next-reward" />
          </div>
          <div class="next-reward-info">
            <p class="n-reward-top">Next Reward:</p>
            <p class="n-reward-middle">Caderno das JEEC</p>
            <p class="n-reward-bottom">Missing 600 xp points</p>
          </div>
        </div>
      </div>

      <div class="middle">
        <p class="plus">+</p>
        <p class="main-title">Team Terry</p>
        <p class="sub-title">rank 1</p>

        <div class="middle-info">
          <div class="xp-wrapper">
            <p class="xp-top">Daily:</p>
            <span class="xp-value">200</span>
            <span class="xp">xp</span>
            <p class="xp-top">Total:</p>
            <span class="xp-value">999</span>
            <span class="xp">xp</span>
          </div>

          <div class="today-reward">
            <p class="t-reward-top">Today Reward:</p>
            <center>
              <div class="reward-img">
                <img src="../assets/test/Bepis.png" alt="today-reward" />
              </div>
            </center>
            <p class="t-reward-bottom">Hover Board</p>
          </div>
        </div>
      </div>

      <div class="bottom">
        <router-link to="/code" tag="button" class="button1"
          >Redeem<br />Codes</router-link
        >
        <router-link to="/quests" tag="button" class="button2"
          >Daily<br />Quests</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Expbar from "@/components/Expbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Expbar,
  },
  data: function () {
    return {
      loading: false,
      currentPage: this.$route.name,
    };
  },
  mounted() {
    //setTimeout(() => { this.loading = false }, 5000)
  },
};
</script>

<style scoped>
.home {
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

.loading-bottom {
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.home-page {
  background-color: #e6e6e6;
  height: 100%;
}

.top,
.middle {
  position: relative;
  margin-top: 1vh;
  background-color: #f1f1f1;
  padding-top: 1vh;
  padding-bottom: 4vh;
  padding-left: 4vw;
  padding-right: 4vw;
}

.plus {
  position: absolute;
  font-size: 5vh;
  font-weight: 500;
  color: #848484;
  right: 4%;
  top: -1%;
}

.main-title {
  font-size: 3.8vh;
  font-weight: 500;
  color: #848484;
  margin-bottom: -1vh;
}

.sub-title {
  font-size: 2.5vh;
  font-weight: 700;
  margin-bottom: 0;
}

.expbar {
  margin-top: 0.8vh;
  margin-bottom: 1.6vh;
}

.next-reward {
  display: flex;
}

.reward-img {
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  padding: 1vh;
  border: 0.1vh solid #707070;
  border-radius: 50%;
  background-color: white;
}

.reward-img img {
  position: absolute;
  margin: auto;
  height: 8vh;
  width: 8vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.next-reward-info {
  align-self: center;
  margin-left: 2vw;
}

.next-reward-info p {
  margin: 0;
  font-weight: 600;
}

.n-reward-top {
  font-size: 2.5vh;
  color: #848484;
  margin-bottom: -1vh !important;
}

.n-reward-middle {
  font-size: 3.5vh;
}

.n-reward-bottom {
  font-size: 1.7vh;
  font-weight: 700 !important;
  margin-top: -0.5vh !important;
}

.middle-info {
  display: flex;
  padding-top: 2vh;
  scroll-padding-bottom: 2vh;
}

.xp-wrapper {
  align-self: center;
}

.today-reward {
  margin-left: auto;
}

.xp-top {
  font-size: 1.7vh;
  font-weight: 700;
  margin: 0;
  margin-bottom: -1.5vh;
}

.xp-value {
  font-size: 5.5vh;
  font-weight: 600;
  margin: 0;
}

.xp {
  font-size: 2vh;
  font-weight: 700;
}

.t-reward-top {
  font-size: 2.5vh;
  font-weight: 500;
  color: #848484;
  margin: 0;
}

.t-reward-bottom {
  font-size: 2.5vh;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.bottom {
  padding-top: 3vh;
  padding-bottom: 3vh;
  padding-left: 4vw;
  padding-right: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button1,
.button2 {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 4vh;
  font-weight: 600;
  color: white;
  width: 43vw;
  height: auto;
}

.button1 {
  margin-right: 2vw;
}

.button2 {
  margin-left: 2vw;
}
</style>