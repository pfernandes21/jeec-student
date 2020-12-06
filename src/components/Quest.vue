<template>
  <div class="quest" :class="{ done: done }">
    <div class="quest-img">
      <img :src="image" alt="activity-company" />
    </div>

    <div class="quest-info">
      <p class="description"><span v-html="description"></span></p>
      <div class="xp-wrapper" :class="{ done2: done }">
        <span class="xp-value">{{ points }}</span>
        <span class="xp">xp</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quest",
  props: {
    image: String,
    description: String,
    points: Number,
    done: Boolean,
  },
};
</script>

<style scoped>
.quest {
  display: flex;
  margin-bottom: 0.5vh;
  background-color: #ffbcbc;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
}

.done {
  background-color: #c0ffbc;
}

.quest-img {
  margin-right: 3vw;
  margin-bottom: -1vh;
}

.quest-img img {
  margin: auto;
  height: 6vh;
  width: 6vh;
}

.quest-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.description {
  font-size: 2.5vh;
  line-height: 3vh;
  font-weight: 500;
  text-align: left;
  margin: 0;
}

.xp-wrapper {
  color: red;
}
.done2 {
  color: black;
}

.xp-value {
  font-size: 4.5vh;
  font-weight: 600;
}

.xp {
  font-size: 1.6vh;
  font-weight: 600;
}
</style>
