<template>
  <div class="partner" :style="'background-color:' + color">
    <div class="partner-img mobile">
      <img :src="img_src" />
    </div>
    <div class="partner-info mobile">
      <p class="name">{{ name }}</p>
      <button @click.stop="learn" class="learn">Learn More</button>
    </div>
    <center class="browser">
      <div class="partner-img">
        <img :src="img_src" />
      </div>
      <p class="name">{{ name }}</p>
      <button @click.stop="learn" class="learn">Learn More</button>
    </center>
  </div>
</template>

<script>
export default {
  name: "Partner",
  data: function () {
    return {};
  },
  props: {
    partnership: String,
    img_src: String,
    name: String,
  },
  computed: {
    color() {
      if (this.partnership == "main_sponsor") return "#4BB7E4";
      else if (this.partnership == "gold") return "#FFE564";
      else if (this.partnership == "silver") return "#CECECE";
      else if (this.partnership == "bronze") return "#C5B799";
      else return "white";
    },
  },
  methods: {
    learn() {
      this.$emit("learn", this.name);
    },
  },
  created() {},
};
</script>

<style scoped>
.partner {
  width: 100%;
  margin-bottom: 0.7vh;
  padding: 2vh;
  display: flex;
  align-items: center;
  justify-content: left;
}

.partner-img {
  position: relative;
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.3vh solid #707070;
  background-color: white;
  overflow: hidden;
  margin-left: 5vh;
  margin-right: 5vh;
}

.partner-img img {
  position: absolute;
  margin: auto;
  max-height: 13vh;
  max-width: 13vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.partner-info {
  width: 28vh;
}

.name {
  font-size: 3.5vh;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.5vh;
  line-height: 5vh;
}

.learn {
  font-size: 2vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.226);
  width: 30vw;
  padding: 0.6vh;
  border-radius: 2vh;
  margin: 0;
}

@media screen and (max-width: 1100px) {
  .browser {
    display: none;
  }

  .partner-img {
    margin-left: 2vw;
    margin-right: 2vw;
  }

  .partner-info {
    width: calc(96vw - 18vh);
  }
}

@media screen and (min-width: 1100px) {
  .mobile {
    display: none;
  }

  .browser {
    width: 100%;
  }

  .name {
    font-size: 5vh;
    margin: 2.5vh;
  }

  .partner {
    width: 24vw;
    margin-bottom: 0.5vh;
    margin-left: 0.2vw;
    margin-right: 0.2vw;
  }

  .learn {
    width: 15vw;
  }
}
</style>
