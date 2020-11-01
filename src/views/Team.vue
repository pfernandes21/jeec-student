<template>
  <div class="team">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button class="button button1">My Team</button>
        <button class="button button2">Invitations(91)</button>
      </div>
    </center>

    <div class="no-team" style="display: none">
      <div class="n-team-header">You have no team</div>
      <div class="team-creation">
        <p>Team Creation</p>
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
            class="team-image"
            src=""
            alt="uploaded-image"
            ref="uploaded_image"
          />
        </center>
        <input
          type="text"
          placeholder="Name"
          v-model="name"
          class="team-input"
          :class="{ input_exists: name.length }"
        />
        <input
          type="text"
          placeholder="Battle Cry!"
          v-model="cry"
          class="team-input"
          :class="{ input_exists: cry.length }"
        />

        <center>
          <button class="button button3">Create!</button>
        </center>
      </div>
    </div>

    <div class="yes-team" style="">
      <div class="team-info">
        <div class="team-info-top">
          <img
            class="team-image"
            src="../assets/test/Bepis.png"
            alt="team-image"
          />
          <div class="team-data">
            <p class="team-name">Orangotangos</p>
            <p class="team-rank">Rank 1</p>
          </div>
        </div>
        <div class="xp-wrapper">
          <div>
            <p class="xp-name">Diário:</p>
            <span class="xp-value">200</span><span class="xp">xp</span>
          </div>
          <div>
            <p class="xp-name">Total:</p>
            <span class="xp-value">200</span><span class="xp">xp</span>
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
        <p>Team Members (1/4):</p>
        <Member />
        <Member />
        <center>
          <button class="bottom-button">Add Members</button>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Member from "@/components/Member.vue";

export default {
  name: "Team",
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
  },
};
</script>

<style scoped>
.team {
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
}

.button1 {
  margin-right: 2vw;
}

.button2 {
  margin-left: 2vw;
}

.button3 {
  margin-top: 4vh;
}

.n-team-header {
  background-color: #f1f1f1;
  padding: 2vh;
  text-align: center;
  font-size: 2.5vh;
  font-weight: 600;
  margin-bottom: 0.5vh;
}

.team-creation {
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.team-creation p {
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

.team-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.1vh #27ade4;
}

.team-input {
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

.team-info, .members {
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-bottom: 0.5vh;
}

.team-info-top {
  display: flex;
}

.team-data {
  margin-left: 5vw;
  align-self: center;
}

.team-name {
  margin: 0;
  margin-bottom: -0.7vh;
  font-size: 3.6vh;
  font-weight: 500;
  color: #848484;
}

.team-rank {
  margin: 0;
  font-size: 2.9vh;
  font-weight: 600;
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
  background-color: #27ade4;
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
}

</style>