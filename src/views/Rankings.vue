<template>
  <div class="rankings">
    <Navbar :page="currentPage" />

    <center style="margin-top: 10vh">
      <div class="buttons">
        <button
          class="button"
          :class="{ active: button === 'personal' }"
          @click.stop="button = 'personal'"
        >
          Personal
        </button>
        <button
          class="button"
          :class="{ active: button === 'squads' }"
          @click.stop="button = 'squads'"
        >
          Squads
        </button>
      </div>
    </center>

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
import Navbar from "@/components/Navbar.vue";
import Rank from "@/components/Rank.vue";
import UserService from "../services/user.service";

export default {
  name: "Rankings",
  components: {
    Navbar,
    Rank,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
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
  mounted() {
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
  height: 100%;
  background-color: #e6e6e6;
}

.buttons {
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  justify-content: center;
}

.button {
  background-color: rgba(88, 185, 224, 0.638);
  border-radius: 3vh;
  font-size: 3.5vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.active {
  background-color: #27ade4;
}

.button1 {
  margin-right: 2vw;
}

.button2 {
  margin-left: 2vw;
}

@media screen and (max-width: 1100px) {
  .big-rank-wrapper {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .buttons {
    display: none;
  }

  .rank-wrapper {
    display: none;
  }

  .big-rank-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .rank {
    width: 49vw;
  }

  .rank-title {
    text-align: center;
    font-size: 6vh;
    font-weight: 600;
    margin: 0;
  }
}
</style>