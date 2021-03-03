<template>
  <div class="menu">
    <div class="menu-top">
      <img
        alt="profile photo"
        :src="currentUser.photo"
        style="width: 12vh; height: 12vh; border-radius: 50%"
      />
      <div class="profile-info">
        <div class="name">
          <p>{{ nameArray[0] }}</p>
          <p>{{ nameArray[nameArray.length - 1] }}</p>
        </div>
        <div class="level">
          <p>
            <b>level {{ currentUser.level.data.value }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="big-jeec">
      <center>
        <img
          @click="page !== 'Home' ? $router.push('/home') : ''"
          alt="jeec logo"
          src="../assets/jeec_white.svg"
        />
      </center>
    </div>
    <div class="menu-middle">
      <table class="menu-items">
        <tr
          v-for="item in menu_items"
          :key="item.name"
          class="nav-row"
          v-bind:class="
            (
              page === 'Company' || page === 'Chat'
                ? item.page === 'Companies'
                : page === item.page
            )
              ? 'active-item'
              : 'inactive-item'
          "
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
        <img alt="IST logo" src="../assets/tecnico.svg" style="height: 6vh" />
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarMenu",
  data: function () {
    return {
      page: this.$route.name,
      display_menu: false,
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
          name: "My Profile",
          src: require("../assets/icons/user.svg"),
          page: "Profile",
        },
        {
          name: "My Squad",
          src: require("../assets/icons/puzzle.svg"),
          page: "Squad",
        },
        {
          name: "Activities",
          src: require("../assets/icons/calendar.svg"),
          page: "Activities",
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
          name: "Rankings",
          src: require("../assets/icons/rank.svg"),
          page: "Rankings",
        },
        {
          name: "Rules & Info",
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
.menu {
  position: relative;
  height: 100%;
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
  padding-left: 2vw;
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
  padding-right: 1vw;
  color: black;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.menu-middle img {
  width: 2.6vw;
  vertical-align: middle;
}

.nav-row {
  height: 6.5vh;
}

.menu-items {
  cursor: pointer;
  font-size: 1.8vw;
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
}

.menu-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding-bottom: 2vh;
  align-items: center;
}

::-webkit-scrollbar {
  width: 22px;
}

::-webkit-scrollbar-track {
  background-color: #50575c;
}

::-webkit-scrollbar-thumb {
  border: 6px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 11px;
  background-color: #3f4449;
}

@media screen and (max-width: 1100px) {
  .big-jeec {
    display: none;
  }

  .menu-items {
    font-size: 6vw;
  }

  .menu-names {
    width: 60vw;
  }

  .menu-middle img {
    width: 8vw;
  }
}

@media screen and (min-width: 1100px) {
  /* .menu-items {
    font-size: 3.2vh;
  } */

  .menu-names {
    padding-left: 2vw;
  }

  .menu-middle,
  .menu-top {
    padding-left: 3vw;
    max-height: 73vh;
  }

  .menu-top {
    display: none;
  }

  .big-jeec {
    width: 100%;
    padding-top: 2vh;
    margin-bottom: 2vh;
  }

  .big-jeec img {
    width: 60%;
  }

  .nav-row {
    height: 7vh;
  }
}
</style>
