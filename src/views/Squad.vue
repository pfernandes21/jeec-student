<template>
  <div class="squad">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button class="button">My Squad</button>
        <button class="button">Invitations(22)</button>
      </div>
    </center>

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
            <p class="xp-name">Diário:</p>
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
              <img src="../assets/test/Bepis.png" alt="today-reward" />
            </div>
            <p>Hover Board</p>
          </div>
        </div>
      </div>
      <div class="members">
        <p>Squad Members ({{ squad.members.data.length }}/4):</p>
        <Member
          v-for="member in squad.members.data"
          :key="member.ist_id"
          :member="member"
        />
        <center>
          <button
            class="bottom-button"
            style="background-color: #27ade4"
            @click.stop="add_members_dialog = true"
          >
            Add Members
          </button>
          <button class="bottom-button" style="background-color: red">
            {{ squad.members.data.length > 1 ? "Leave" : "Delete" }} Squad
          </button>
        </center>
      </div>
    </div>
    <v-dialog v-model="add_members_dialog">
      <v-card>
        <v-autocomplete
          v-model="friends"
          :disabled="isUpdating"
          :items="people"
          filled
          chips
          color="blue-grey lighten-2"
          label="Select"
          item-text="name"
          item-value="name"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="remove(data.item)"
            >
              <v-avatar left>
                <v-img :src="data.item.avatar"></v-img>
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
                <img :src="data.item.avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.group"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Member from "@/components/Member.vue";
import UserService from "../services/user.service";

export default {
  name: "Squad",
  components: {
    Navbar,
    Member,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      files: [],
      image_uploaded: false,
      name: "",
      cry: "",
      squad: null,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      add_members_dialog: false,
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

      var formData = new FormData();
      var file = this.$refs.image_input;

      formData.append("file", file.files[0]);
      formData.append("name", this.name);
      formData.append("cry", this.cry);

      UserService.createSquad(formData).then(
        (response) => {
          this.squad = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    add_members() {},
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
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
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
}

.button {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 3.3vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.button1 {
  margin-top: 4vh;
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

.squad-info,
.members {
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-bottom: 0.5vh;
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
}

.reward-img img {
  position: absolute;
  margin: auto;
  height: 8vh;
  width: 8vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.reward-info {
  display: flex;
}

.reward-info p {
  align-self: center;
  margin: 0;
  margin-left: 5vw;
  font-size: 4.5vh;
  font-weight: 600;
}

.members > p {
  margin: 0;
  font-size: 2.8vh;
  font-weight: 500;
  color: #848484;
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

.add-members input {
  width: 100%;
  font-size: 3vh;
}
</style>