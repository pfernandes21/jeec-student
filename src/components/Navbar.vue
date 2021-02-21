<template>
  <div class="navbar" v-if="page !== 'Login'">
    <div class="top">
      <button>
        <img
          @click.stop="display_menu = !display_menu"
          alt="menu icon"
          src="../assets/icons/menu.svg"
          class="top-start"
          style="width: auto; height: 7vh"
        />
      </button>
      <img
        @click="page !== 'Home' ? $router.push('/home') : ''"
        alt="jeec logo"
        src="../assets/jeec_white.svg"
        class="top-center"
        style="width: auto; height: 6vh"
      />
    </div>
    <v-navigation-drawer
      style="height: 100vh"
      v-model="display_menu"
      fixed
      dark
      color="primary"
      left
      temporary
      :width="width * 0.82"
      v-if="width < 1100"
    >
      <NavbarMenu />
    </v-navigation-drawer>
    <NavbarMenu v-else class="navbar-menu" />
  </div>
</template>

<script>
import NavbarMenu from "./NavbarMenu.vue";

export default {
  name: "Navbar",
  components: {
    NavbarMenu,
  },
  data: function () {
    return {
      page: this.$route.name,
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
          name: "Chat & Job Fair",
          src: require("../assets/icons/chat.svg"),
          page: "Companies",
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
    resize() {
      this.width = window.innerWidth;
    },
  },
  watch: {
    //or $route(to, from)
    $route(to) {
      this.page = to.name;
    },
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      var names = this.$store.state.auth.user.name.split(" ");

      if (names.length > 1) return names;
      else return [this.name, ""];
    },
  },
};
</script>

<style scoped>
.navbar {
  color: white;
}

.top {
  width: 100vw;
  background-color: #27ade4;
  height: 10vh;
  position: fixed;
  z-index: 1;
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
  cursor: pointer;
}

@media screen and (max-width: 1100px) {
}

@media screen and (min-width: 1100px) {
  .navbar-menu {
    height: 100vh !important;
    background-color: #50575c;
  }

  .top {
    display: none;
  }
}
</style>