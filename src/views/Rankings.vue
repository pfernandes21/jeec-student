<template>
  <div class="rankings">
    <Buttons
      @_click="click"
      :names="{
        personal: button === 'personal',
        squads: button === 'squads',
      }"
    />

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
    </div>

    <div class="big-rank-wrapper">
      <div>
        <p class="rank-title">Personal</p>
        <Rank
          class="rank"
          v-for="(student, index) in students"
          :key="student.ist_id"
          :name="student.name"
          :index="rank(index, students)"
          :level="student.level.data.value"
          :img_src="student.photo"
        />
      </div>
      <div>
        <p class="rank-title">Squads</p>
        <Rank
          class="rank"
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
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
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
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getSquadsRanking().then(
      (response) => {
        this.squads = response.data.data;
        if (!Array.isArray(this.squads)) this.squads = [this.squads];
      },
      (error) => {
        console.log(error);
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
  margin-top: 8vh;
  height: 82vh;
  overflow-y: auto;
}

@media screen and (max-width: 1100px) {
  .big-rank-wrapper {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
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

  .rank {
    width: 37.3vw;
  }

  .rank-title {
    text-align: center;
    font-size: 6vh;
    font-weight: 600;
    margin: 0;
  }
}
</style>