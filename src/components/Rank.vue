<template>
  <div class="rank">
    <p class="index">1#</p>
    <img class="image" src="../assets/test/Bepis.png" alt="image">
    <div class="personal-info">
      <p class="name">Pedro Fernandes</p>
      <p v-if="level" class="level">level {{ level }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",
  props: {
    index: Number,
    img_src: String,
    name: String,
    level: Number,
  },
};
</script>

<style scoped>
.rank {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  margin-bottom: 0.7vh;
}

.index{
  margin: 0;
  font-weight: 700;
  font-size: 6.1vh;
  color: #FFC02E;
  text-shadow: 0.5vh 0.5vh 1vh rgba(0, 0, 0, 0.219);
  margin-left: 3vw;
  margin-right: 3vw;
}

.image {
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
}

.personal-info p{
  margin: 0;
  margin-left: 3vw;
}

.name {
  font-size: 3.5vh;
  font-weight: 500;
  line-height: 3vh;
}

.level {
  font-size: 2.1vh;
  font-weight: 700;
  line-height: 2.5vh;
  color: #27ADE4;
}

</style>
