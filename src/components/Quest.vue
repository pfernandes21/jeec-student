<template>
  <div class="quest">
    <div class="quest-img">
      <img src="../assets/test/Bepis.png" alt="activity-company" />
    </div>

    <div class="quest-info">
      <p class="description">How to sell drugs online (fast)? by Vienna</p>
      <div class="xp-wrapper">
        <span class="xp-value">400</span>
        <span class="xp">xp</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quest",
  props: {},
};
</script>

<style scoped>

.quest {
  display: flex;
  margin-bottom: 0.5vh;
  background-color: #c0ffbc;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
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
  font-size: 2vh;
  font-weight: 500;
  text-align: left;
  margin: 0;
}

.xp-wrapper {
}

.xp-value {
  font-size: 4vh;
  font-weight: 600;
}

.xp {
  font-size: 1.6vh;
  font-weight: 600;
}

</style>
