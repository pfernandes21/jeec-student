<template>
  <div class="rankings">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button class="button button1">Personal</button>
        <button class="button button2">Teams</button>
      </div>
    </center>

    <Rank :level="2" />
    <Rank />
    <Rank :level="2" />
    <Rank />
    <Rank :level="2" />
    <Rank />
    <Rank :level="2" />
    <Rank />

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Rank from "@/components/Rank.vue";

export default {
  name: "Rankings",
  components: {
    Navbar,
    Rank,
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
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.rankings {
  height: 100%;
  background-color: #e6e6e6;
}

.buttons {
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.button {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 3.3vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
}

.button1 {
  margin-right: 2vw;
}

.button2 {
  margin-left: 2vw;
}
</style>