<template>
  <div class="code">
    <Navbar :page="currentPage" />

    <div class="code-page">
      <input type="text" class="input-code" placeholder="xxxx-xxxx-xxxx-xxxx" />
      <button class="redeem">Redeem</button>

      <div class="xp-wrapper">
        <p class="xp-top">Personal:</p>
        <span class="xp-value">200</span><span class="xp">xp</span>
        <p class="xp-top">Team:</p>
        <span class="xp-value">999</span><span class="xp">xp</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

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
};
</script>

<style scoped>
.code {
  height: 100%;
  background-color: #f1f1f1;
}

.code-page {
  padding-top: 5vh;
  padding-bottom: 5vh;
  padding-left: 10vw;
  padding-right: 10vw;
}

.input-code {
  width: 80vw;
  height: 6vh;
  background-color: white;
  text-align: center;
}
</style>
