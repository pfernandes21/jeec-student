<template>
  <div class="rankings">
    <Buttons
      @_click="click"
      class="-buttons"
      :names="{
        personal: button === 'personal',
        squads: button === 'squads',
        daily: button === 'daily',
      }"
    />
    <Buttons
      @_click="click"
      class="-big-buttons"
      :names="{
        personal: button === 'personal',
        squads: button === 'squads',
      }"
    />

    <div style="height: 8vh"></div>

    <div v-if="!loading_students && !loading_squads && !loading_daily">
      <div class="big-title" v-if="button == 'squads'">
        <p>Daily</p>
        <p>Weekly</p>
      </div>

      <div class="rank-wrapper">
        <Rank
          v-for="(student, index) in students"
          v-show="button === 'personal'"
          :key="student.ist_id"
          :name="student.name"
          :index="rank(index, students)"
          :level="student.level.data.value"
          :img_src="student.photo"
        />
        <Rank
          v-for="(squad, index) in squads"
          v-show="button === 'squads'"
          :key="squad.name"
          :name="squad.name"
          :cry="squad.cry"
          :index="rank(index, squads)"
          :img_src="jeec_brain_url + squad.image"
          :members="squad.members.data"
        />
        <Rank
          v-for="(squad, index) in daily_squads"
          v-show="button === 'daily'"
          :key="'daily' + squad.name"
          :name="squad.name"
          :cry="squad.cry"
          :index="rank(index, squads)"
          :img_src="jeec_brain_url + squad.image"
          :members="squad.members.data"
        />
      </div>

      <div class="big-rank-wrapper">
        <div v-if="button == 'personal'">
          <Rank
            class="rank"
            v-for="(student, index) in students"
            v-show="index < 10"
            :key="student.ist_id"
            :name="student.name"
            :index="rank(index, students)"
            :level="student.level.data.value"
            :img_src="student.photo"
          />
        </div>
        <div v-if="button == 'personal'">
          <Rank
            class="rank"
            v-for="(student, index) in students"
            v-show="index >= 10"
            :key="student.ist_id"
            :name="student.name"
            :index="rank(index, students)"
            :level="student.level.data.value"
            :img_src="student.photo"
          />
        </div>
        <div v-if="button == 'squads'">
          <p class="rank-title">Daily</p>
          <Rank
            class="rank -squads"
            v-for="(squad, index) in daily_squads"
            :key="'daily' + squad.name"
            :name="squad.name"
            :cry="squad.cry"
            :index="rank(index, squads)"
            :img_src="jeec_brain_url + squad.image"
            :members="squad.members.data"
          />
        </div>
        <div v-if="button == 'squads'">
          <p class="rank-title">Weekly</p>
          <Rank
            class="rank -squads"
            v-for="(squad, index) in squads"
            :key="squad.name"
            :name="squad.name"
            :cry="squad.cry"
            :index="rank(index, squads)"
            :img_src="jeec_brain_url + squad.image"
            :members="squad.members.data"
          />
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Rank from "@/components/Rank.vue";
import UserService from "../services/user.service";

export default {
  name: "Rankings",
  components: {
    Rank,
    Buttons,
  },
  data: function () {
    return {
      button: "personal",
      students: [],
      squads: [],
      daily_squads: [],
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      loading_students: true,
      loading_squads: true,
      loading_daily: true,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
    rank(index, items) {
      if (index == 0) return 1;
      else {
        var aux = index;
        while (
          aux >= 0 &&
          items[index].total_points == items[aux].total_points
        ) {
          aux--;
        }

        return aux + 2;
      }
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getStudentsRanking().then(
      (response) => {
        this.students = response.data.data;
        if (!Array.isArray(this.students)) this.students = [this.students];
        this.loading_students = false;
      },
      (error) => {
        console.log(error);
        this.loading_students = false;
      }
    );

    UserService.getSquadsRanking().then(
      (response) => {
        this.squads = response.data.data;
        if (!Array.isArray(this.squads)) this.squads = [this.squads];
        this.loading_squads = false;
      },
      (error) => {
        console.log(error);
        this.loading_squads = false;
      }
    );

    UserService.getDailySquadsRanking().then(
      (response) => {
        this.daily_squads = response.data.data;
        if (!Array.isArray(this.daily_squads)) this.daily_squads = [this.daily_squads];
        this.loading_daily = false;
      },
      (error) => {
        console.log(error);
        this.loading_daily = false;
      }
    );
  },
};
</script>

<style scoped>
.rankings {
  background-color: #e6e6e6;
}

.rank-wrapper {
  height: 82vh;
  overflow-y: auto;
}

.big-title {
  display: flex;
  justify-content: space-between;
}

.big-title p {
  font-size: 5vh;
  font-weight: 600;
  width: 100%;
  text-align: center;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

@media screen and (max-width: 1100px) {
  .big-rank-wrapper,
  .big-title,
  .-big-buttons {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .-buttons,
  .rank-title {
    display: none;
  }

  .rankings {
    height: 100vh;
    overflow-y: auto;
  }

  .rank-wrapper {
    display: none;
  }

  .big-rank-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .big-rank-wrapper > div {
    width: calc(50% - 5px);
  }

  .rank {
    width: 100%;
  }

  .rank-title {
    text-align: center;
    font-size: 6vh;
    font-weight: 600;
    margin: 0;
  }

  .-squads {
    cursor: pointer;
  }
}
</style>