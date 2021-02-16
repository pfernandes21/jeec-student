<template>
  <div class="squad">
    <Navbar :page="currentPage" />

    <center style="margin-top: 10vh">
      <div class="buttons">
        <button
          class="button"
          :class="{ active: button === 'squad' }"
          @click.stop="button = 'squad'"
        >
          My Squad
        </button>
        <button
          class="button"
          :class="{ active: button === 'invitations' }"
          @click.stop="button = 'invitations'"
        >
          Invitations({{ invitations.length }})
        </button>
      </div>
    </center>

    <div v-show="button === 'squad'">
      <div class="no-squad" v-if="squad === null">
        <div class="n-squad-header">
          <img
            v-show="locked"
            src="../assets/icons/lock.svg"
            style="padding-right: 2vw"
            alt="lock"
          />
          <p>You don't have a squad</p>
        </div>
        <div class="squad-creation">
          <p>Squad Creation</p>
          <center>
            <div
              v-show="!image_uploaded"
              class="image-input disabled"
              @click.stop="input_click"
            >
              <p>Upload<br />Image</p>
            </div>
            <input
              type="file"
              accept="image/*"
              ref="image_input"
              @change="input_file"
              style="display: none"
            />
            <img
              v-show="image_uploaded"
              @click.stop="input_click"
              class="squad-image"
              src=""
              alt="uploaded-image"
              ref="uploaded_image"
            />
          </center>
          <input
            type="text"
            placeholder="Name"
            v-model="name"
            class="squad-input"
            :class="{ input_exists: name.length }"
          />
          <input
            type="text"
            placeholder="Battle Cry!"
            v-model="cry"
            class="squad-input"
            :class="{ input_exists: cry.length }"
          />

          <center>
            <button @click.stop="create_squad" class="button button1">
              Create!
            </button>
          </center>

          <p class="error-msg">{{ error }}</p>
        </div>
      </div>

      <div class="yes-squad" v-if="squad !== null">
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
            </div>
          </div>
          <div class="xp-wrapper">
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
                  :src="jeec_brain_url + today_reward.image"
                  alt="today-reward"
                />
              </div>
              <p>{{ today_reward.name }}</p>
            </div>
          </div>
        </div>
        <div class="big-wrapper">
          <div class="big-today-reward">
            <p class="big-today-reward-title">Today's Reward:</p>
            <div class="big-reward-info">
              <div class="big-reward-img">
                <img
                  :src="jeec_brain_url + today_reward.image"
                  alt="today-reward"
                />
              </div>
              <p class="big-reward-name">{{ today_reward.name }}</p>
            </div>
          </div>

          <div class="members">
            <p>Squad Members ({{ squad.members.data.length }}/4):</p>
            <Member
              v-for="member in squad.members.data"
              :key="member.ist_id"
              :member="member"
              :captain_ist_id="squad.captain_ist_id"
              @kick="kick_member"
            />
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
      </div>

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
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.ist_id"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
          <center>
            <button @click.stop="invite" class="button invite">Invite</button>
          </center>
        </v-card>
      </v-dialog>
    </div>

    <div v-show="button === 'invitations'">
      <Invitation
        @accept="accept_invitation"
        @reject="reject_invitation"
        v-for="invitation in invitations"
        :key="invitation.sender_name"
        :invitation="invitation"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Member from "@/components/Member.vue";
import Invitation from "@/components/Invitation.vue";
import UserService from "../services/user.service";

export default {
  name: "Squad",
  components: {
    Navbar,
    Member,
    Invitation,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      button: "squad",
      files: [],
      image_uploaded: false,
      name: "",
      cry: "",
      squad: null,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      add_members_dialog: false,
      students: [],
      squadmates: [],
      search: null,
      invitations: [],
      today_reward: {},
      error: "",
    };
  },
  methods: {
    input_click() {
      this.$refs.image_input.click();
    },
    input_file(event) {
      this.files = event.target.files;

      if (this.files.length == 1) {
        var reader = new FileReader();
        var img = this.$refs.uploaded_image;

        reader.onload = function (_event) {
          img.src = _event.target.result;
        };

        reader.readAsDataURL(this.files[0]);
        this.image_uploaded = true;
      }
    },
    create_squad() {
      if (!this.locked) return;

      var image = this.$refs.image_input;

      UserService.createSquad(image.files[0], this.name, this.cry)
        .then((response) => {
          this.squad = response.data.data;
          this.error = "";
        })
        .catch((error) => {
          this.error = error.response.data.error;
          console.log(error);
        });
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
          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.files = [];
          this.squad = null;
          this.image_uploaded = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    accept_invitation(invitation_id) {
      UserService.acceptInvitation(invitation_id).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );

      UserService.getSquadInvitations().then(
        (response) => {
          this.invitations = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      );

      UserService.getUserSquad().then(
        (response) => {
          this.squad = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    reject_invitation(invitation_id) {
      UserService.rejectInvitation(invitation_id).then(
        () => {},
        (error) => {
          console.log(error);
        }
      );

      UserService.getSquadInvitations().then(
        (response) => {
          this.invitations = response.data.data;
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    locked() {
      return this.image_uploaded && this.name.length && this.cry.length;
    },

    user_is_captain() {
      return this.$store.state.auth.user.ist_id === this.squad.captain_id;
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
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
        var squad = this.squad;

        squad.members.data.forEach(function (item, i) {
          if (item.ist_id === squad.captain_ist_id) {
            squad.members.data.splice(i, 1);
            squad.members.data.unshift(item);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getSquadInvitations().then(
      (response) => {
        this.invitations = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );

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
.squad {
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
  font-size: 3vh;
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
  margin-top: 4vh;
  background-color: #27ade4;
}

.n-squad-header {
  background-color: #f1f1f1;
  padding: 2vh;
  text-align: center;
  font-size: 2.5vh;
  font-weight: 600;
  margin-bottom: 0.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-squad-header p {
  margin: 0;
  padding-top: 0.8vh;
  padding-bottom: 0.8vh;
}

.squad-creation {
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.squad-creation p {
  font-size: 2.5vh;
  font-weight: 600;
}

.image-input {
  background-color: white;
  border-radius: 50%;
  border: 0.5vh solid #707070;
  box-shadow: 0 0 2.5vh 0.1vh #707070;
  height: 13vh;
  width: 13vh;
  position: relative;
  cursor: pointer;
}

.image-input p {
  text-align: center;
  vertical-align: middle;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5vh;
  font-weight: 600;
  color: #707070;
}

.squad-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.1vh #27ade4;
}

.squad-input {
  font-size: 2.5vh;
  font-weight: 600;
  background-color: white;
  margin-top: 3vh;
  padding-left: 2vw;
  width: 100%;
  height: 6vh;
  border: 0.1vh solid #707070;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #707070;
}

.input_exists {
  border: 0.1vh solid #27ade4 !important;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #27ade4 !important;
}

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
  margin-bottom: -0.9vh;
  font-size: 3.7vh;
  font-weight: 600;
  color: #848484;
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
  margin-top: 3vh;
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
  margin-top: 2vh;
  margin-left: 2vw;
  margin-bottom: 3vh;
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
  margin-left: 2vw;
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

.big-reward-info,
.reward-info {
  display: flex;
  align-items: center;
}

.reward-info p {
  align-self: center;
  margin: 0;
  margin-left: 5vw;
  font-size: 4vh;
  font-weight: 600;
}

.members > p {
  margin: 0;
  font-size: 2.8vh;
  font-weight: 500;
  color: #848484;
}

.bottom-buttons {
  background-color: #f1f1f1;
  height: 6vh;
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
  margin-bottom: 2.5vh;
  margin-top: -1.5vh;
  background-color: #27ade4;
}

.error-msg {
  text-align: center;
  font-size: 4vh;
  font-weight: 700;
  color: red;
  margin-top: 2vh;
}

@media screen and (max-width: 1100px) {
  .big-today-reward {
    display: none;
  }

  .members {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 1100px) {
  .button {
    width: 19vw;
    margin-left: 8vw;
    margin-right: 8vw;
  }

  .today-reward {
    display: none;
  }

  .squad-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .xp-wrapper {
    width: auto;
    display: flex;
    margin-top: 0vh;
    margin-bottom: 0vh;
    justify-content: flex-end;
  }

  .xp-name {
    margin-right: 5vw;
    font-size: 4vh;
  }

  .xp-value {
    font-size: 15vh;
    line-height: 15vh;
  }

  .xp {
    font-size: 5vh;
  }

  .squad-image {
    height: 22vh;
    width: 22vh;
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
    width: 49.75%;
  }

  .big-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .big-today-reward {
    width: 49.75%;
  }

  .bottom-buttons {
    height: 10vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }

  .members > p {
    margin: 0;
    font-size: 3.2vh;
    font-weight: 500;
    color: #848484;
    margin-bottom: 1.5vh;
  }
}
</style>