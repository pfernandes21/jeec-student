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
    <div v-show="!loading" class="info">
      <Navbar />

      <div>
        <p>Pedro Fernandes</p>
        <p>lvl. 3</p>
        
        <Expbar exp="50" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Expbar from "@/components/Expbar.vue"

export default {
  name: "Home",
  components: {
    Navbar,
    Expbar,
  },
  data: function () {
    return {
      loading: false,
    };
  },
  mounted() {
    //setTimeout(() => { this.loading = false }, 5000)
  },
};
</script>

<style scoped>

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

</style>