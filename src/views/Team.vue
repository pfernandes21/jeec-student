<template>
  <div class="team">
    <Navbar :page="currentPage" />

    
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Team",
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

.team {
  height: 100%;
  background-color: #e6e6e6;
}

</style>