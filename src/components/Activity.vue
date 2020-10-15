<template>
  <div class="activity">
    <div class="activity-img">
      <img src="../assets/test/Bepis.png" alt="activity-company" />
    </div>

    <div class="activity-info">
      <p class="name">Workshop</p>
      <p class="hours">9:00</p>
      <p class="description">How to sell drugs online (fast)? by Vienna</p>
      <div class="buttons">
        <button class="button1">See More</button>
        <button class="button2">Add to Calender</button>
      </div>
      <div class="xp-wrapper">
        <span class="xp-value">400</span>
        <span class="xp">xp</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity",
  props: {},
};
</script>

<style scoped>
.activity {
  display: flex;
  margin-bottom: 0.5vh;
  background-color: #c0ffbc;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
}

.activity-img {
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid #707070;
  border-radius: 50%;
  background-color: white;
  margin-right: 3vw;
}

.activity-img img {
  position: absolute;
  margin: auto;
  height: 8vh;
  width: 8vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.activity-info {
  position: relative;
}

.hours {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 2.7vh;
}

.name {
  font-size: 3.5vh;
  font-weight: 600;
  text-align: left;
  margin: 0;
  margin-bottom: -0.5vh;
}

.description {
  font-size: 2vh;
  font-weight: 500;
  text-align: left;
  margin: 0;
}

.buttons {
  display: flex;
}

.button1,
.button2 {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 1.5vh;
  font-weight: 600;
  color: white;
  padding: 0.5vh;
  width: 20vw;
  line-height: 1.7vh;
}

.button1 {
  margin-right: 1vw;
}

.button2 {
  margin-left: 1vw;
}

.xp-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}

.xp-value {
  font-size: 3vh;
  font-weight: 600;
}

.xp {
  font-size: 1.6vh;
  font-weight: 600;
}

</style>
