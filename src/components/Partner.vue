<template>
  <div class="partner" :style="'background-color:' + color">
    <center>
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
};
</script>

<style scoped>
.partner {
  width: 100%;
  margin-bottom: 0.7vh;
  padding: 2vh;
}

.partner-img {
  position: relative;
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.3vh solid #707070;
  background-color: white;
  overflow: hidden;
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

.name {
  font-size: 5vh;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.5vh;
}

.learn {
  font-size: 2vh;
  font-size: 600;
  color: white;
  background-color: rgba(0, 0, 0, 0.192);
  width: 30vw;
  padding: 1vh;
  border-radius: 2vh;
  margin: 0;
}

@media screen and (max-width: 1100px) {
}

@media screen and (min-width: 1100px) {
  .partner {
    width: 32.5vw;
    margin-bottom: 0.5vh;
    margin-left: 0.1vw;
    margin-right: 0.1vw;
  }

  .learn {
    width: 15vw;
  }
}
</style>
