<template>
  <div class="profile">
    <div class="top" style="margin-top: 10vh">
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
          width="60vw"
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
        <div class="added-cv" v-else>
          <div>
            <p>Added</p>
            <p><v-icon large style="color: white">mdi-check</v-icon></p>
          </div>
          <p @click.stop="cv_click">
            <v-icon large style="color: white">mdi-lead-pencil</v-icon>
          </p>
          <p @click.stop="see_cv">
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
        <div class="added-linkedin" v-else>
          <div>
            <p>Added</p>
            <p><v-icon large style="color: white">mdi-check</v-icon></p>
          </div>
          <p @click.stop="dialog = true">
            <v-icon large style="color: white">mdi-lead-pencil</v-icon>
          </p>
        </div>
      </div>
    </div>

    <div class="bottom">
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
          <v-icon color="white" style="margin-left: 2vw">{{
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
          }}<v-icon color="white" style="margin-left: 2vw">{{
            currentUser.companies.includes(company) ? "mdi-check" : "mdi-plus"
          }}</v-icon>
        </p>
      </div>
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
    <v-dialog v-model="dialog">
      <v-card>
        <div class="linkedin-input">
          <form @submit="add_linkedin">
            <input
              type="url"
              ref="linkedin_url"
              placeholder="https://www.linkedin.com/in/XXXXX/"
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
    Expbar,
  },
  data: function () {
    return {
      color: "gray",
      dialog: false,
      tags: [],
      companies: [],
      cv_url: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    add_linkedin(e) {
      e.preventDefault();

      var url = this.$refs.linkedin_url.value;
      this.dialog = false;

      UserService.addLinkedin(url).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
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
      UserService.addCV(this.$refs.cv).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    see_cv() {
      if (this.currentUser.uploaded_cv) {
        UserService.getCV().then(
          (response) => {
            var raw = atob(response.data.data);
            var uint8Array = new Uint8Array(raw.length);
            for (var i = 0; i < raw.length; i++) {
              uint8Array[i] = raw.charCodeAt(i);
            }
            var fileBlob = new Blob([uint8Array], {
              type: response.data["content-type"],
            });
            var objetURL = window.URL.createObjectURL(fileBlob);
            this.cv_url = objetURL;

            this.$refs.see_cv.click();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    add_tag(tag) {
      UserService.addTags([tag]).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    add_company(company) {
      UserService.addCompanies([company]).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    delete_tag(tag) {
      UserService.deleteTag(tag).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    delete_company(company) {
      UserService.deleteCompany(company).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
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
    nameArray() {
      var names = this.$store.state.auth.user.name.split(" ");

      if (names.length > 1) return names;
      else return [this.name, ""];
    },
    progress() {
      var xp = this.$store.state.auth.user.total_points;
      var start_points = this.$store.state.auth.user.level.data.start_points;
      var end_points = this.$store.state.auth.user.level.data.end_points;

      return ((xp - start_points) / (end_points - start_points)) * 100;
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getTags().then(
      (response) => {
        this.tags = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getCompanies().then(
      (response) => {
        this.companies = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.profile {
  height: 100%;
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
  max-height: 37.9vh;
  width: 100vw;
  overflow-y: scroll;
  padding: 0;
  padding-bottom: 1vh;
  padding-left: 5vw;
}

::-webkit-scrollbar {
  width: 5vw;
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
}

@media screen and (max-width: 1100px) {
  .cv-wrapper {
    margin-bottom: 2.5vh;
  }
}

@media screen and (min-width: 1100px) {
  .top {
    justify-content: center;
  }

  .name {
    display: flex;
  }

  .second-name {
    margin-left: 0.5vw !important;
  }

  .middle {
    display: flex;
    justify-content: space-between;
  }

  .cv-wrapper {
    margin-left: 10vw;
    cursor: pointer;
  }

  .linkedin-wrapper {
    margin-right: 10vw;
    cursor: pointer;
  }

  .profile-img {
    height: 16vh;
    width: 16vh;
  }

  .interest-title {
    font-size: 3.5vh;
  }

  .tag {
    font-size: 2.5vh;
    font-weight: 600;
  }
}
</style>