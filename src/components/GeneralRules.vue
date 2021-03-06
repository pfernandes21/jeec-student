<template>
  <div class="rules">
    <div class="card">
      <center>
        <p class="title">Redeem Codes</p>
      </center>
      <p>
        Every activity and job fair booth has redeem codes. Each participant
        gets a one use code after the activity is over or when given by one of
        our partners at their booth. This is how we measure how many activities
        you've attended and keep track of your score.
      </p>
      <p>
        <b>
          All activity types has their own xp value and there are some special
          activities that have a bonus, these are called the daily quests.
        </b>
      </p>
      <center>
        <v-btn
          depressed
          @click.stop="goto_code"
          class="redeem white--text"
          color="secundary"
          >Go to Redeem Codes</v-btn
        >
      </center>
    </div>
    <div class="card">
      <center>
        <p class="title">Game Rules</p>
        <p>- In case of draw, our system picks randomly the winner;</p>
        <p>
          - The use of inappropriate images or names result in a permanent ban
          from the APP;
        </p>
        <p>
          - The current team of JEEC and NEECIST cannot participate in the game;
        </p>
        <p>
          - In the case of activities that need previous registration, if the
          student does not attend the activity it will result in a permanent ban
          from the APP.<br />
          <b
            >It's possible to cancel your registration ahead of time through the
            Eventbrite page of the activity;</b
          >
        </p>
        <p>
          - Any kind of exploit will result in a permanent ban of the
          responsible user from the APP.
        </p>
        <p>
          - All activity types has their own xp value and there are some special
          activities that have a bonus, these are called the daily quests.
        </p>
      </center>
    </div>
    <div class="card">
      <center>
        <p>
          <b>
            If you have any doubts feel free to contact us through our social
            media or through the support chat at our website.
          </b>
        </p>
      </center>
      <center>
        <a
          :href="event_info.instagram_link"
          target="_blank"
          style="margin-right:3vw"
        >
          <img src="../assets/instagram_icon.svg" class="icon" />
        </a>
        <a href="https://jeec.ist" style="margin-right:3vw" target="_blank">
          <img src="../assets/globe_icon.svg" class="icon" />
        </a>
        <a :href="event_info.facebook_link" target="_blank">
          <img src="../assets/facebook_icon.svg" class="icon" />
        </a>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralRules",
  data: function() {
    return {};
  },
  props: {
    event_info: Object
  },
  computed: {},
  methods: {
    goto_code() {
      this.$router.push("/code");
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #f1f1f1;
  margin-bottom: 0.5vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.rules {
  padding-top: 9vh;
}
.icon {
  height: 4vh;
  vertical-align: middle;
}
</style>
