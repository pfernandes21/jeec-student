<template>
  <div class="navbar">
    <div class="top">
      <img
        @click="open"
        alt="menu icon"
        src="../assets/icons/menu.svg"
        class="top-start"
        style="width: auto; height: 6vh"
      />
      <img
        alt="jeec logo"
        src="../assets/jeec_white.svg"
        class="top-center"
        style="width: auto; height: 6vh"
      />
    </div>
    <div v-show="display_menu" class="menu">
      <div class="menu-top">
        <img
          alt="profile photo"
          src="../assets/profile.jpg"
          style="width: 12vh; height: 12vh; border-radius: 50%"
        />
        <div class="profile-info">
          <div class="name">
            <p>Pedro</p>
            <p>Fernandes</p>
          </div>
          <div class="level"><p>level 3</p></div>
        </div>
      </div>
      <div class="menu-middle">
        <table class="menu-items">
          <tbody>
            <tr>
              <td>
                <img alt="inicio" src="../assets/icons/placeholder.svg" />
              </td>
              <td>Início</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/barcode.svg" /></td>
              <td>Redeem Code</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/sword.svg" /></td>
              <td>Quests</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/trophy.svg" /></td>
              <td>Rewards</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/calendar.svg" /></td>
              <td>Actividades</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/user.svg" /></td>
              <td>Meu Perfil</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/puzzle.svg" /></td>
              <td>Equipa</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/rank.svg" /></td>
              <td>Ranking</td>
            </tr>
            <tr>
              <td><img alt="inicio" src="../assets/icons/warning.svg" /></td>
              <td>Regras</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="menu-bottom">
        <img alt="IST logo" src="../assets/tecnico.svg" style="height: 7vh" />
      </div>
    </div>
    <div @click="close" v-show="display_menu" class="menu-blank"></div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      display_menu: false,
    };
  },
  methods: {
    open() {
      this.display_menu = true;
    },
    close() {
      this.display_menu = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  margin: 0 !important;
  padding: 0 !important;
}

.top {
  background-color: #27ade4;
  position: relative;
  height: 10vh;
}

.top-start {
  position: absolute;
  left: 5%;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.top-center {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.menu-blank {
  width: 20vw;
  height: 100vh;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #3939394d;
}

.menu {
  width: 80vw;
  height: 100vh;
  background-color: #50575c;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 1;
}

.menu > * {
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 3vh;
  padding-bottom: 3vh;
  color: white;
}

.menu-top {
  display: flex;
}

.menu-top img {
  align-self: center;
}

.profile-info {
  align-self: center;
  padding-left: 4vw;
}

.name,
.level {
  text-align: left;
}

.name p {
  margin: 0;
  padding: 0;
  line-height: 3vh;
  font-size: 3vh;
  font-weight: 600;
}

.level p {
  padding-top: 0.5vh;
  margin: 0;
  font-size: 2vh;
  font-weight: 700;
}

.menu-middle {
  padding-bottom: 0;
}

.menu-middle img {
  height: 5vh;
  width: auto;
}

.menu-items {
  font-size: 4vh;
  font-weight: 700;
}

.menu-items td {
  padding-bottom: 0.5vh;
  padding-right: 5vw;
}

.menu-bottom {
  position: absolute;
  bottom: 0;
  left: 20%;
}
</style>