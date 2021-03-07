<template>
  <div class="squad-creation">
    <div class="n-squad-header">
      <img
        v-show="locked"
        src="../assets/icons/lock.svg"
        style="padding-right: 2vw"
        alt="lock"
      />
      <p>You don't have a squad</p>
    </div>
    <div class="squad-create">
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
        <button @click.stop="create_squad" class="button" v-if="!loading">
          Create!
        </button>
        <v-progress-circular
          v-else
          style="margin-top: 3vh"
          indeterminate
          color="#27ade4"
          :size="80"
          :width="8"
          class="loading-bar"
        ></v-progress-circular>
      </center>

      <p class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "SquadCreation",
  data: function () {
    return {
      files: [],
      image_uploaded: false,
      name: "",
      cry: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    locked() {
      return this.image_uploaded && this.name.length && this.cry.length;
    },
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
      this.loading = true;
      var image = this.$refs.image_input;

      UserService.createSquad(image.files[0], this.name, this.cry)
        .then((response) => {
          this.$emit("create", response.data.data);
          this.error = "";
          this.$emit("notification", "Squad created successfully", "success");
          this.loading = false;
        })
        .catch((error) => {
          this.error = error.response.data.error;
          console.log(error);
          this.$emit("notification", "Failed to create squad", "error");
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* .squad-creation {

} */

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

.squad-create {
  background-color: #f1f1f1;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.squad-create p {
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
  cursor: pointer;
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

.button {
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
  margin-top: 4vh;
}

.error-msg {
  text-align: center;
  font-size: 4vh;
  font-weight: 700;
  color: red;
  margin-top: 2vh;
}

@media screen and (min-width: 1100px) {
  .button {
    width: 20vw;
  }

  p {
    font-size: 3vh !important;
  }

  .squad-image,
  .image-input {
    height: 20vh;
    width: 20vh;
  }
}
</style>
