<template>
  <div class="navbar">
    <div class="top">
      <img
        @click.stop="display_menu = !display_menu"
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
    <v-navigation-drawer
      v-model="display_menu"
      absolute
      dark
      color="primary"
      left
      temporary
      :width="width * 0.82"
    >
      <div class="menu">
        <div class="menu-top">
          <img
            alt="profile photo"
            :src="'data: ' + currentUser.photo_type + ';base64, ' + currentUser.photo"
            style="width: 12vh; height: 12vh; border-radius: 50%"
          />
          <div class="profile-info">
            <div class="name">
              <p>{{ nameArray[0] }}</p>
              <p>{{ nameArray[nameArray.length - 1] }}</p>
            </div>
            <div class="level">
              <p><b>level {{ currentUser.level.value }}</b></p>
            </div>
          </div>
        </div>
        <div class="menu-middle">
          <table class="menu-items">
            <tr
              v-for="item in menu_items"
              :key="item.name"
              v-bind:class="{
                'active-item': page === item.page,
                'inactive-item': page !== item.page,
              }"
              @click.stop="redirect(item.page)"
            >
              <td>
                <img :src="item.src" />
              </td>
              <td class="menu-names">{{ item.name }}</td>
            </tr>
          </table>
        </div>
        <div class="menu-bottom">
          <center>
            <img
              alt="IST logo"
              src="../assets/tecnico.svg"
              style="height: 6vh"
            />
          </center>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    page: String,
  },
  data: function () {
    return {
      display_menu: false,
      width: window.innerWidth,
      menu_items: [
        {
          name: "Home",
          src: require("../assets/icons/placeholder.svg"),
          page: "Home",
        },
        {
          name: "Redeem Code",
          src: require("../assets/icons/barcode.svg"),
          page: "Code",
        },
        {
          name: "Quests",
          src: require("../assets/icons/sword.svg"),
          page: "Quests",
        },
        {
          name: "Rewards",
          src: require("../assets/icons/trophy.svg"),
          page: "Rewards",
        },
        {
          name: "Activities",
          src: require("../assets/icons/calendar.svg"),
          page: "Activities",
        },
        {
          name: "My Profile",
          src: require("../assets/icons/user.svg"),
          page: "Profile",
        },
        {
          name: "Squad",
          src: require("../assets/icons/puzzle.svg"),
          page: "Squad",
        },
        {
          name: "Rankings",
          src: require("../assets/icons/rank.svg"),
          page: "Rankings",
        },
        {
          name: "Rules",
          src: require("../assets/icons/warning.svg"),
          page: "Rules",
        },
      ],
    };
  },
  methods: {
    redirect(target) {
      if (target !== this.page) this.$router.push({ name: target });
    },
    myEventHandler() {
      this.width = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      return this.$store.state.auth.user.name.split(" ");
    },
  },
};
</script>

<style scoped>
.navbar {
  margin: 0 !important;
  padding: 0 !important;
  color: white;
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

.menu {
  position: relative;
  height: 100vh;
}

.menu-top {
  display: flex;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 3vh;
  padding-bottom: 3vh;
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
  font-weight: 400;
}

.level p {
  padding-top: 0.5vh;
  margin: 0;
  font-size: 2vh;
  font-weight: 700;
  color: #ffffff79;
}

.menu-middle {
  padding-left: 5vw;
  padding-right: 5vw;
  color: black;
}

.menu-middle img {
  height: 5vh;
  width: auto;
}

.menu-items {
  font-size: 3.7vh;
  font-weight: 700;
}

.active-item > * {
  filter: invert(70%) sepia(55%) saturate(3669%) hue-rotate(164deg)
    brightness(93%) contrast(91%);
}

.inactive-item > * {
  filter: invert(1);
}

.menu-names {
  padding-left: 4vw;
  padding-bottom: 2vh;
}

.menu-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding-bottom: 2vh;
  align-items: center;
}
</style>