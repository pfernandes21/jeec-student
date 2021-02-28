<template>
  <div class="my-squad">
    <div class="squad-info">
      <div class="squad-info-top">
        <img
          class="squad-image"
          :src="jeec_brain_url + squad.image"
          alt="squad-image"
        />
        <div class="squad-data">
          <p class="squad-name">{{ squad.name }}</p>
          <p class="squad-cry">{{ squad.cry }}</p>
          <p class="squad-rank">Rank {{ squad.rank }}</p>
          <div class="xp-wrapper browser">
            <div>
              <p class="xp-name">Daily:</p>
              <span class="xp-value">{{ squad.daily_points }}</span
              ><span class="xp">xp</span>
            </div>
            <div>
              <p class="xp-name">Total:</p>
              <span class="xp-value">{{ squad.total_points }}</span
              ><span class="xp">xp</span>
            </div>
          </div>
          <center>
            <button
              @click.stop="leave_squad"
              class="bottom-button browser"
              style="background-color: red"
            >
              {{ squad.members.data.length > 1 ? "Leave" : "Delete" }} Squad
            </button>
          </center>
        </div>
      </div>
      <div class="xp-wrapper mobile">
        <div>
          <p class="xp-name">Daily:</p>
          <span class="xp-value">{{ squad.daily_points }}</span
          ><span class="xp">xp</span>
        </div>
        <div>
          <p class="xp-name">Total:</p>
          <span class="xp-value">{{ squad.total_points }}</span
          ><span class="xp">xp</span>
        </div>
      </div>
      <div class="today-reward">
        <p>Today's Reward:</p>
        <div class="reward-info">
          <div class="reward-img">
            <img
              :src="
                today_reward && today_reward.image
                  ? jeec_brain_url + today_reward.image
                  : default_image
              "
              alt="today-reward"
            />
          </div>
          <p>
            {{
              today_reward && today_reward.image
                ? today_reward.name
                : "No Reward Found"
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="big-wrapper">
      <div class="big-today-reward">
        <p class="big-today-reward-title">Today's Reward:</p>
        <div class="big-reward-info">
          <center>
            <div class="big-reward-img">
              <img
                :src="
                  today_reward && today_reward.image
                    ? jeec_brain_url + today_reward.image
                    : default_image
                "
                alt="today-reward"
              />
            </div>
            <p class="big-reward-name">
              {{
                today_reward && today_reward.image
                  ? today_reward.name
                  : "No Reward Found"
              }}
            </p>
          </center>
        </div>
      </div>

      <div class="members">
        <p>Squad Members ({{ squad.members.data.length }}/4):</p>
        <div class="members-wrapper">
          <Member
            v-for="member in squad.members.data"
            :key="member.ist_id"
            :member="member"
            :captain_ist_id="squad.captain_ist_id"
            @kick="kick_member"
          />
        </div>
        <center>
          <button
            class="bottom-button browser"
            style="background-color: #27ade4"
            @click.stop="add_members_dialog = true"
            v-if="squad.members.data.length <= 4"
          >
            Add Members
          </button>
        </center>
      </div>
    </div>

    <center class="bottom-buttons">
      <button
        class="bottom-button"
        style="background-color: #27ade4"
        @click.stop="add_members_dialog = true"
        v-if="squad.members.data.length <= 4"
      >
        Add Members
      </button>
      <button
        @click.stop="leave_squad"
        class="bottom-button"
        style="background-color: red"
      >
        {{ squad.members.data.length > 1 ? "Leave" : "Delete" }} Squad
      </button>
    </center>

    <v-dialog v-model="add_members_dialog">
      <v-card color="accent" class="squad-dialog">
        <p class="dialog-title">Add Squadmates</p>
        <v-autocomplete
          v-model="squadmates"
          :items="students"
          outlined
          chips
          label="Name or istID"
          item-text="name"
          item-value="ist_id"
          multiple
          :filter="filterStudents"
          :search-input.sync="search"
          @change="limitStudents"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.name"
              close
              @click="remove(data.item)"
              @click:close="remove(data.item)"
            >
              <v-avatar left>
                <v-img :src="data.item.photo"></v-img>
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img :src="data.item.photo" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.ist_id"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <center>
          <button @click.stop="invite" class="invite">Invite</button>
        </center>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import Member from "@/components/Member.vue";

export default {
  name: "MySquad",
  components: {
    Member,
  },
  props: {
    squad: Object,
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      add_members_dialog: false,
      students: [],
      squadmates: [],
      search: null,
      invitations: [],
      today_reward: {},
      default_image: require("../assets/jeec_colour_no_edition_transparent.svg"),
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    user_is_captain() {
      return this.$store.state.auth.user.ist_id === this.squad.captain_id;
    },
  },
  methods: {
    limitStudents() {
      if (this.squad.members.data.length + this.students.length > 4) {
        this.students.pop();
      }

      this.search = "";
    },
    remove(item) {
      const index = this.squadmates.indexOf(item.ist_id);
      if (index >= 0) this.squadmates.splice(index, 1);
    },
    filterStudents(item, queryText) {
      const name = item.name.toLowerCase();
      const ist_id = item.ist_id.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        (name.indexOf(searchText) > -1 || ist_id.indexOf(searchText) > -1) &&
        this.currentUser.ist_id !== item.ist_id &&
        this.squadmates.length + this.squad.members.data.length <= 4
      );
    },
    invite() {
      UserService.inviteSquad(this.squadmates);
      this.add_members_dialog = false;
    },
    leave_squad() {
      if (!confirm("Are you sure you want to proceed?")) {
        return;
      }

      UserService.leaveSquad().then(
        (response) => {
          this.$emit("delete", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    kick_member(ist_id) {
      UserService.kickMember(ist_id).then(
        (response) => {
          this.squad = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  watch: {
    search(val) {
      if (
        val &&
        ((val.length == 3 && val !== "ist") ||
          (val.length == 4 && val.substring(0, 3) === "ist"))
      ) {
        UserService.getStudents("").then(
          (response) => {
            this.students = response.data.data;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  created() {
    UserService.getTodaySquadReward().then(
      (response) => {
        this.today_reward = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.big-today-reward,
.squad-info,
.members {
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 1vh;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-bottom: 0.5vh;
}

.squad-info {
  padding-top: 3vh;
  padding-bottom: 2vh;
}

.squad-info-top {
  display: flex;
}

.squad-data {
  margin-left: 5vw;
  align-self: center;
}

.squad-name {
  margin: 0;
  font-size: 3.7vh;
  font-weight: 600;
  color: #848484;
  line-height: 3.5vh;
}

.squad-cry {
  color: #848484;
  margin: 0;
  font-size: 2.5vh;
  font-style: italic;
  font-weight: 500;
}

.squad-rank {
  margin: 0;
  font-size: 2.7vh;
  font-weight: 700;
}

.xp-wrapper {
  width: 90vw;
  display: flex;
  margin-top: 1vh;
  margin-bottom: -2vh;
  justify-content: space-between;
}

.xp-name {
  font-size: 2.5vh;
  font-weight: 600;
  margin: 0;
  margin-bottom: -2.5vh;
}

.xp-value {
  font-size: 9vh;
  font-weight: 600;
  margin: 0;
  color: #26a2d5;
}

.xp {
  font-size: 2.5vh;
  font-weight: 600;
}

.today-reward > p {
  margin-top: 2vh;
  margin-bottom: 1vh;
  font-size: 2.8vh;
  font-weight: 500;
  color: #848484;
}

.big-today-reward > p {
  margin-top: 2vh;
  margin-bottom: 1vh;
  font-size: 3.5vh;
  font-weight: 500;
  color: #848484;
}

.big-today-reward-title {
  line-height: 1vh;
  margin-bottom: 2.5vh !important;
}

.big-reward-img {
  align-self: center;
  position: relative;
  height: 18vh;
  width: 18vh;
  padding: 1vh;
  border: 0.01vh solid #707070;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #707070;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
  margin-bottom: 2vh;
}

.big-reward-img img {
  position: absolute;
  margin: auto;
  max-height: 14vh;
  max-width: 14vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.big-reward-name {
  font-size: 4.5vh;
  font-weight: 600;
  line-height: 5vh;
}

.reward-img {
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  padding: 1vh;
  border: 0.01vh solid #707070;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #707070;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
}

.reward-img img {
  position: absolute;
  margin: auto;
  max-height: 11vh;
  max-width: 11vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.reward-info {
  display: flex;
  align-items: center;
}

.big-reward-info {
  margin-top: 5vh;
}

.reward-info p {
  align-self: center;
  margin: 0;
  margin-left: 5vw;
  font-size: 4vh;
  font-weight: 600;
}

.big-wrapper {
  background-color: #f1f1f1;
}

.members > p {
  margin: 0;
  margin-bottom: 1vh;
  font-size: 2.8vh;
  font-weight: 500;
  color: #848484;
}

.bottom-buttons {
  background-color: #f1f1f1;
  height: 7vh;
}

.bottom-button {
  border-radius: 3vh;
  font-size: 2vh;
  font-weight: 500;
  color: white;
  height: 5vh;
  padding-top: 0.5vh;
  padding-bottom: 0.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-bottom: -0.5vh;
  margin-left: 2vw;
  margin-right: 2vw;
}

.squad-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.1vh #27ade4;
}

.squad-dialog {
  padding-left: 2vw;
  padding-right: 2vw;
}

.dialog-title {
  text-align: center;
  font-size: 4vh;
  font-weight: 600;
  padding-top: 2vh;
}

.invite {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 3vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 2.5vh;
  margin-top: -1.5vh;
}

@media screen and (max-width: 1100px) {
  .big-today-reward {
    display: none;
  }

  .members {
    margin-bottom: 0;
  }

  .my-squad {
    margin-top: 8vh;
    height: 82vh;
    overflow-y: auto;
  }

  .browser {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .today-reward {
    display: none;
  }

  .squad-info-top {
    margin-bottom: 2vh;
    width: 100%;
  }

  .squad-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .squad-data {
    width: auto;
    min-width: 25vw;
  }

  .xp-wrapper {
    width: 100%;
    display: flex;
    margin-top: 0vh;
    margin-bottom: 0vh;
    justify-content: space-between;
  }

  .xp-wrapper > div:first-of-type {
    margin-right: 4vw;
  }

  .xp-name {
    margin-right: 5vw;
    margin-bottom: 0vh;
    font-size: 2.3vh;
  }

  .xp-value {
    font-size: 8vh;
    line-height: 7vh;
  }

  .xp {
    font-size: 3vh;
  }

  .squad-image {
    height: 25vh;
    width: 25vh;
    margin-left: 6vw;
  }

  .squad-name {
    font-size: 5vh;
  }

  .squad-cry {
    font-size: 3.5vh;
  }

  .squad-rank {
    font-size: 3vh;
  }

  .members {
    height: 35vh;
    overflow-y: auto;
    width: 49.75%;
  }

  .big-wrapper {
    display: flex;
    justify-content: space-between;
    background-color: #e6e6e6;
  }

  .big-today-reward-title {
    text-align: center;
  }

  .big-today-reward,
  .members {
    width: 37.3vw;
    height: 55vh;
    background-color: #f1f1f1;
  }

  .members > p {
    margin: 0;
    font-size: 3.2vh;
    font-weight: 500;
    color: #848484;
    margin-bottom: 1.5vh;
  }

  .bottom-buttons {
    display: none;
  }

  .bottom-button {
    margin-top: 1vh;
    height: auto;
    width: auto;
  }

  .mobile {
    display: none;
  }
}
</style>
