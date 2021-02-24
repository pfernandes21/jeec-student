<template>
  <div class="rules">
    <div class="card">
      <center>
        <p class="title">JEEC Merchandise</p>
      </center>
      <p><b>Progress Bar</b></p>
      <p>
        Every level you achieve, you earn JEEC Merchandise. This Merchandise is
        limited to the existing stock.
      </p>
      <p><b>Partners' Merchandise</b></p>
      <p>
        Some booths have their own merchandise. You can collect them too by
        redeeming their code.
      </p>
    </div>
    <div class="card">
      <center>
        <p class="title">Activity Prizes</p>
      </center>
      <p><b>Activity Raffle</b></p>
      <p>
        Every activity has a prize that will be drawn between the participants.
      </p>
      <p><b>King of the Job Fair</b></p>
      <p>
        Highest number of booths visited.
      </p>
      <p><b>King of Knowledge</b></p>
      <p>Highest number of Speakers and Discussion Panels visited.</p>
      <p><b>King of Hacking</b></p>
      <p>Highest number of workshops visited.</p>
      <p><b>King of Networking</b></p>
      <p>Highest Number of 15/15's visited.</p>
    </div>
    <div class="card">
      <center>
        <p class="title">Big Prizes</p>
      </center>
      <p><b>Daily Team Prizes</b></p>
      <p>
        Every day, the team with the highest score of the day will win that
        specific day prize.
      </p>
      <p><b>Top 3 Team of the week</b></p>
      <p>
        The tree highest ranked teams at the end of the week will win the
        specific reward.
      </p>
      <p><b>Top 3 Individual Participants</b></p>
      <p>
        The tree highest ranked Individual Participants at the end of the week
        will win the specific reward.
      </p>
      <p><b>CV Platform Raffle</b></p>
      <p>
        If you submit your CV to our platform, not only will you receive some
        XP, but also be automatically registered in a Raffle to win an iPad 6th
        Gen. 9.7''.
      </p>
    </div>
    <div class="card">
      <p>
        When Técnico opens doors again, we will distribute all the prizes to the
        specific student with order and safety.
      </p>
      <center>
        <v-btn
          depressed
          @click.stop="goto_rewards"
          class="redeem white--text"
          color="secundary"
          >See All Rewards</v-btn
        >
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrizeRules",
  data: function() {
    return {};
  },
  props: {},
  computed: {},
  methods: {
    goto_rewards() {
      this.$router.push("/rewards");
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
</style>
