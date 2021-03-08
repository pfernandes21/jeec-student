<template>
  <div class="profile">
    <div class="top">
      <img alt="profile photo" :src="currentUser.photo" class="profile-img" />
      <div class="profile-info">
        <div class="name">
          <p>{{ nameArray[0] }}</p>
          <p class="second-name">{{ nameArray[nameArray.length - 1] }}</p>
        </div>
        <p class="level">level {{ currentUser.level.data.value }}</p>
        <Expbar
          :xp="currentUser.total_points"
          :progress="progress"
          :end_points="currentUser.level.data.end_points"
          :width="xpbar_width"
          :height="height"
        />
      </div>
    </div>

    <div class="middle">
      <div class="cv-wrapper">
        <img src="../assets/icons/cv.svg" alt="cv" />
        <div
          class="add-cv"
          v-if="currentUser.uploaded_cv === false"
          @click.stop="cv_click"
        >
          <p>Add CV</p>
          <p><v-icon large style="color: white">mdi-plus</v-icon></p>
        </div>
        <div class="added-cv" v-else-if="!loading_cv">
          <div>
            <p>Added</p>
            <v-icon large style="color: white">mdi-check</v-icon>
          </div>
          <p @click.stop="cv_click" style="cursor: pointer">
            <v-icon large style="color: white">mdi-lead-pencil</v-icon>
          </p>
          <p @click.stop="see_cv" style="cursor: pointer">
            <v-icon large style="color: white">mdi-download</v-icon>
          </p>
          <a
            style="display: none"
            ref="see_cv"
            :href="cv_url"
            :download="currentUser.ist_id + '_cv.pdf'"
            >CV</a
          >
        </div>
        <div v-else>
          <v-progress-circular
            indeterminate
            color="#27ade4"
            :size="50"
            :width="5"
            class="loading-bar"
          ></v-progress-circular>
        </div>
        <input
          hidden
          type="file"
          accept="application/pdf"
          ref="cv"
          @change="add_cv"
        />
      </div>
      <div class="linkedin-wrapper">
        <img src="../assets/icons/linkedin.svg" alt="linkedin" />
        <div
          class="add-linkedin"
          v-if="currentUser.linkedin_url === null"
          @click.stop="dialog = true"
        >
          <p>Add LinkedIn</p>
          <p><v-icon large style="color: white">mdi-plus</v-icon></p>
        </div>
        <div class="added-linkedin" v-else-if="!loading_linkedin">
          <div>
            <p>Added</p>
            <v-icon large style="color: white">mdi-check</v-icon>
          </div>
          <p @click.stop="dialog = true" style="cursor: pointer">
            <v-icon large style="color: white">mdi-lead-pencil</v-icon>
          </p>
        </div>
        <div v-else>
          <v-progress-circular
            indeterminate
            color="#27ade4"
            :size="50"
            :width="5"
            class="loading-bar"
          ></v-progress-circular>
        </div>
      </div>
    </div>

    <div class="bottom" v-if="!loading_companies && !loading_tags">
      <center>
        <p class="interests">Your Interests</p>
      </center>
      <p class="interest-title">Themes:</p>
      <div class="tags">
        <p
          v-for="tag in tags"
          :key="tag"
          @click.stop="tag_click(tag)"
          class="tag"
          :style="
            currentUser.tags.includes(tag) ? 'background-color:#26A2D5' : ''
          "
        >
          {{ tag }}
          <v-icon
            v-if="xpbar_width === '62vw'"
            color="white"
            style="margin-left: 2vw"
            >{{
              currentUser.tags.includes(tag) ? "mdi-check" : "mdi-plus"
            }}</v-icon
          >

          <v-icon v-else large color="white" style="margin-left: 1vw">{{
            currentUser.tags.includes(tag) ? "mdi-check" : "mdi-plus"
          }}</v-icon>
        </p>
      </div>
      <p class="interest-title">Partners:</p>
      <div class="tags">
        <p
          v-for="company in companies"
          :key="company"
          @click.stop="company_click(company)"
          class="tag"
          :style="
            currentUser.companies.includes(company)
              ? 'background-color:#26A2D5'
              : ''
          "
        >
          {{ company
          }}<v-icon
            v-if="xpbar_width === '62vw'"
            color="white"
            style="margin-left: 2vw"
            >{{
              currentUser.companies.includes(company) ? "mdi-check" : "mdi-plus"
            }}</v-icon
          >

          <v-icon v-else large color="white" style="margin-left: 1vw">{{
            currentUser.companies.includes(company) ? "mdi-check" : "mdi-plus"
          }}</v-icon>
        </p>
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

    <div class="footer">
      <table>
        <!-- <tr>
          <td>
            <v-switch
              class="notifications-switch"
              v-model="color"
              color="grey"
              value="grey"
              hide-details
            ></v-switch>
          </td>
          <td class="notifications">Notifications</td>
        </tr>
        <tr class="spacer"></tr> -->
        <tr @click.stop="logout">
          <td class="logout-img">
            <img src="../assets/icons/logout.svg" alt="logout" />
          </td>
          <td class="logout">LogOut</td>
        </tr>
      </table>
    </div>

    <v-dialog v-model="dialog" :width="dialog_width">
      <v-card>
        <div class="linkedin-input">
          <form @submit="add_linkedin">
            <input
              type="url"
              ref="linkedin_url"
              placeholder="https://www.linkedin.com/in/XXXXX/"
              pattern="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$"
              autofocus
              :value="currentUser.linkedin_url"
              required
            />
            <br />
            <center>
              <button type="submit">Confirm</button>
            </center>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Expbar from "@/components/Expbar.vue";
import UserService from "../services/user.service";

export default {
  name: "Profile",
  components: {
    Expbar
  },
  data: function() {
    return {
      color: "gray",
      dialog: false,
      tags: [],
      companies: [],
      cv_url: "",
      height: 30,
      xpbar_width: "62vw",
      dialog_width: "",
      loading_tags: true,
      loading_companies: true,
      loading_cv: false,
      loading_linkedin: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    add_linkedin(e) {
      e.preventDefault();

      this.loading_linkedin = true;
      var url = this.$refs.linkedin_url.value;
      this.dialog = false;

      UserService.addLinkedin(url).then(
        response => {
          if (!this.currentUser.linkedin_url) {
            this.$emit(
              "notification",
              "Added LinkedIn +" + process.env.VUE_APP_REWARD_LINKEDIN + "pts",
              "points"
            );
          } else {
            this.$emit(
              "notification",
              "LinkedIn updated successfully",
              "success"
            );
          }

          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.loading_linkedin = false;
        },
        error => {
          console.log(error);
          this.$emit("notification", "Failed to add LinkedIn", "error");
          this.loading_linkedin = false;
        }
      );
    },
    cv_click() {
      this.$refs.cv.click();
    },
    tag_click(tag) {
      if (this.currentUser.tags.includes(tag)) {
        this.delete_tag(tag);
      } else {
        this.add_tag(tag);
      }
    },
    company_click(company) {
      if (this.currentUser.companies.includes(company)) {
        this.delete_company(company);
      } else {
        this.add_company(company);
      }
    },
    add_cv() {
      this.loading_cv = true;
      UserService.addCV(this.$refs.cv).then(
        response => {
          if (!this.currentUser.uploaded_cv) {
            this.$emit(
              "notification",
              "Added CV +" + process.env.VUE_APP_REWARD_CV + "pts",
              "points"
            );
          } else {
            this.$emit("notification", "CV updated successfully", "success");
          }

          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.loading_cv = false;
        },
        error => {
          console.log(error);
          this.$emit("notification", "Fail to upload CV", "error");
          this.loading_cv = false;
        }
      );

      this.$refs.cv.value = "";
    },
    see_cv() {
      if (this.currentUser.uploaded_cv) {
        UserService.getCV().then(
          response => {
            var raw = atob(response.data.data);
            var uint8Array = new Uint8Array(raw.length);
            for (var i = 0; i < raw.length; i++) {
              uint8Array[i] = raw.charCodeAt(i);
            }
            var fileBlob = new Blob([uint8Array], {
              type: response.data["content-type"]
            });
            var objetURL = window.URL.createObjectURL(fileBlob);

            this.cv_url = objetURL;

            this.$refs.see_cv.href = objetURL;
            this.$refs.see_cv.click();
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    add_tag(tag) {
      let user_backup = JSON.parse(JSON.stringify(this.currentUser));
      let user = JSON.parse(JSON.stringify(this.currentUser));

      user.tags.push(tag);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.addTags([tag]).then(
        () => {},
        error => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    add_company(company) {
      let user_backup = JSON.parse(JSON.stringify(this.currentUser));
      let user = JSON.parse(JSON.stringify(this.currentUser));

      user.companies.push(company);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.addCompanies([company]).then(
        () => {},
        error => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    delete_tag(tag) {
      let user_backup = JSON.parse(JSON.stringify(this.currentUser));
      let user = JSON.parse(JSON.stringify(this.currentUser));

      user.tags = user.tags.filter(_tag => _tag !== tag);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.deleteTag(tag).then(
        () => {},
        error => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    delete_company(company) {
      let user_backup = JSON.parse(JSON.stringify(this.currentUser));
      let user = JSON.parse(JSON.stringify(this.currentUser));

      user.companies = user.companies.filter(_company => _company !== company);
      this.$store.dispatch("auth/userUpdate", user);

      UserService.deleteCompany(company).then(
        () => {},
        error => {
          this.$store.dispatch("auth/userUpdate", user_backup);
          console.log(error);
        }
      );
    },
    resize() {
      if (window.innerWidth < 1100) {
        this.xpbar_width = "62vw";
        this.dialog_width = "";
      } else {
        this.xpbar_width = "47vw";
        this.dialog_width = "40vw";
      }

      if (window.innerWidth < 600) {
        this.height = 25;
      } else if (window.innerWidth < 1100) {
        this.height = 35;
      } else if (window.innerWidth < 1500) {
        this.height = 45;
      } else {
        this.height = 60;
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      var names = this.$store.state.auth.user.name.split(" ");

      if (names.length > 1) return names;
      else return [this.$store.state.auth.user.name, ""];
    },
    progress() {
      var xp = this.$store.state.auth.user.total_points;
      var start_points = this.$store.state.auth.user.level.data.start_points;
      var end_points = this.$store.state.auth.user.level.data.end_points;

      return ((xp - start_points) / (end_points - start_points)) * 100;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);

    if (!this.currentUser) {
      this.$router.push("/");
    }

    this.resize();

    UserService.getTags().then(
      response => {
        this.tags = response.data;
        this.loading_tags = false;
      },
      error => {
        console.log(error);
        this.loading_tags = false;
      }
    );

    UserService.getCompanies().then(
      response => {
        this.companies = response.data;
        this.loading_companies = false;
      },
      error => {
        console.log(error);
        this.loading_companies = false;
      }
    );
  }
};
</script>

<style scoped>
.profile {
  background-color: #e6e6e6;
}

.top,
.middle,
.bottom,
.footer {
  background-color: #f1f1f1;
  margin-bottom: 0.5vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.bottom {
  height: 37vh;
  width: 100vw;
  overflow-y: scroll;
  padding: 0;
  padding-bottom: 1vh;
  padding-left: 5vw;
}

::-webkit-scrollbar {
  width: 5vw;
  max-width: 30px;
}

::-webkit-scrollbar-thumb {
  border: 6px solid #f1f1f1;
  background-clip: padding-box;
  border-radius: 11px;
  background-color: #c8c8c8;
}

.top {
  display: flex;
}

.profile-info {
  margin-left: 4vw;
}

.profile-img {
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
}

.name p {
  margin: 0;
  font-size: 3vh;
  font-weight: 600;
  line-height: 3.2vh;
}

.level {
  margin: 0;
  margin-bottom: 0.5vh;
  font-size: 2.1vh;
  font-weight: 600;
  color: #707070;
}

.cv-wrapper,
.linkedin-wrapper {
  display: flex;
  align-items: center;
}

.cv-wrapper img,
.linkedin-wrapper img {
  height: 7.5vh;
  width: 7.5vh;
  margin-right: 5vw;
}

.add-cv,
.add-linkedin {
  width: calc(85vw - 7.5vh);
  font-size: 3.5vh;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #27ade4;
  border-radius: 2vh;
  padding: 0.5vh;
  padding-left: 3vw;
  padding-right: 3vw;
  color: white;
  cursor: pointer;
}

.add-cv p,
.add-linkedin p {
  margin: 0;
}

.added-cv,
.added-linkedin {
  width: calc(85vw - 7.5vh);
  font-size: 3.5vh;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: white;
}

.added-cv > *,
.added-linkedin > * {
  background-color: #27ade4;
  border-radius: 2vh;
  padding: 0.5vh;
  margin: 0;
  margin-right: 2vw;
}

.added-cv div:first-of-type,
.added-linkedin div:first-of-type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 3vw;
  padding-right: 3vw;
  background-color: #70c3e4;
}

.added-cv div:first-of-type p,
.added-linkedin div:first-of-type p {
  margin: 0;
}

.interests {
  font-size: 4vh;
  font-weight: 500;
  margin: 0;
  margin-bottom: 1vh;
}

.interest-title {
  font-size: 2.3vh;
  font-weight: 600;
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  min-height: 5vh;
}

.tag {
  margin: 0;
  line-height: 4vh;
  font-size: 2vh;
  color: white;
  height: 4vh;
  background-color: #70c3e4;
  border-radius: 3vh;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-right: 1vw;
  margin-bottom: 1vh;
  cursor: pointer;
  display: flex;
}

.add-tag {
  background-color: green;
  font-weight: 600;
  font-size: 2.5vh;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #50575c;
  margin-top: 0.8vh;
  margin-bottom: 0;
}

.spacer {
  height: 1.5vh;
}

.notifications-wrapper {
  margin-bottom: 9vh;
}

.notifications-switch {
  margin: 0;
  padding: 0;
}

.notifications,
.logout {
  color: rgba(255, 255, 255, 0.89);
  font-size: 3vh;
}

.logout {
  font-weight: 600;
  vertical-align: middle;
  cursor: pointer;
}

.logout-img img {
  height: 4vh;
  width: 4vh;
  display: block;
  margin-left: auto;
  margin-right: 3vw;
  cursor: pointer;
}

/* .linkedin-input {
} */

.linkedin-input input {
  width: 100%;
  margin-top: 0.5vh;
  font-size: 2.7vh;
  text-align: center;
}

.linkedin-input button {
  margin: 1vh;
  color: green;
  font-size: 2.4vh;
}

.loading {
  text-align: center;
  margin-top: 10vh;
}

@media screen and (max-width: 1100px) {
  .cv-wrapper {
    margin-bottom: 2.5vh;
  }
}

@media screen and (min-width: 1100px) {
  .top {
    justify-content: center;
    align-items: center;
  }

  .name {
    display: flex;
  }

  .name p {
    font-size: 4vh;
  }

  .level {
    font-size: 2.7vh;
  }

  .second-name {
    margin-left: 0.5vw !important;
  }

  .middle {
    display: flex;
    justify-content: space-between;
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 4vh;
    padding-bottom: 4vh;
  }

  .cv-wrapper,
  .linkedin-wrapper {
    width: 30vw;
  }

  .cv-wrapper img,
  .linkedin-wrapper img {
    margin-right: 2vw;
  }

  .add-cv,
  .add-linkedin {
    width: 23vw;
    padding-left: 1vw;
    padding-right: 1vw;
  }

  .added-linkedin > p:last-of-type {
    margin-right: 0;
  }

  .profile-img {
    height: 19vh;
    width: 19vh;
  }

  .bottom {
    width: 75vw;
    height: 49vh;
  }

  .interest-title {
    font-size: 3.5vh;
  }

  .tags {
    margin-bottom: 2vh;
  }

  .tag {
    font-size: 2.8vh;
    font-weight: 600;
    padding-top: 0.5vh;
    padding-bottom: 0.5vh;
    height: 5vh;
  }

  ::-webkit-scrollbar {
    width: 2vw;
  }

  .footer {
    margin-left: 0.1vw;
  }

  .footer table {
    width: 20vw;
    margin-left: 22vw;
  }

  tr {
    cursor: pointer;
  }
}
</style>
