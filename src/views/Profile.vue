<template>
  <div class="profile">
    <Navbar :page="currentPage" />

    <div class="top" style="margin-top:10vh">
      <img
        alt="profile photo"
        :src="currentUser.photo"
        class="profile-img"
      />
      <div class="profile-info">
        <div class="name">
          <p>{{ nameArray[0] }}</p>
          <p>{{ nameArray[nameArray.length - 1] }}</p>
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
      <div class="cv-wrapper" @click.stop="cv_click">
        <img src="../assets/icons/cv.svg" alt="cv" />
        <p v-if="currentUser.uploaded_cv === false">Add your CV</p>
        <v-icon v-else large style="color: green">mdi-check</v-icon>
        <input
          hidden
          type="file"
          accept="application/pdf"
          ref="cv"
          @change="add_cv"
        />
      </div>
      <div class="linkedin-wrapper" @click.stop="dialog = true">
        <img src="../assets/icons/linkedin.svg" alt="linkedin" />
        <p v-if="currentUser.linkedin_url === null">Add your linkedin</p>
        <v-icon v-else large style="color: green">mdi-check</v-icon>
      </div>
    </div>

    <div class="bottom">
      <center>
        <p class="interests">Your Interests</p>
      </center>
      <p class="interest-title">Themes:</p>
      <div class="tags">
        <p
          v-for="tag in currentUser.tags"
          :key="tag"
          @dblclick="delete_tag(tag)"
          v-touch="{
            left: () => delete_tag(tag),
            right: () => delete_tag(tag),
            up: () => {},
            down: () => {},
          }"
          class="tag"
        >
          {{ tag }}
        </p>
        <p @click.stop="tags_dialog = true" class="tag add-tag">Add +</p>
      </div>
      <p class="interest-title">Partners:</p>
      <div class="tags">
        <p
          v-for="company in currentUser.companies"
          :key="company"
          v-touch="{
            left: () => delete_company(company),
            right: () => delete_company(company),
            up: () => {},
            down: () => {},
          }"
          class="tag"
        >
          {{ company }}
        </p>
        <p @click.stop="companies_dialog = true" class="tag add-tag">Add +</p>
      </div>
    </div>

    <div class="footer">
      <table>
        <tr>
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
        <tr class="spacer"></tr>
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

    <v-dialog v-model="tags_dialog">
      <v-card color="accent" style="padding-left: 2vw; padding-right: 2vw">
        <v-autocomplete
          v-model="added_tags"
          :items="tags"
          hide-no-data
          hide-selected
          label="Interests"
          placeholder="Start typing to Search"
          multiple
          return-object
        />
      </v-card>
    </v-dialog>

    <v-dialog v-model="companies_dialog">
      <v-card color="accent" style="padding-left: 2vw; padding-right: 2vw">
        <v-autocomplete
          v-model="added_companies"
          :items="companies"
          hide-no-data
          hide-selected
          label="Partners"
          placeholder="Start typing to Search"
          multiple
          return-object
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Expbar from "@/components/Expbar.vue";
import UserService from "../services/user.service";

export default {
  name: "Profile",
  components: {
    Navbar,
    Expbar,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      color: "gray",
      dialog: false,
      tags: [],
      companies: [],
      added_tags: [],
      added_companies: [],
      tags_dialog: false,
      companies_dialog: false,
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
  watch: {
    tags_dialog(val) {
      if (!val && this.added_tags.length > 0) {
        UserService.addTags(this.added_tags).then(
          (response) => {
            this.$store.dispatch("auth/userUpdate", response.data.data);
            this.added_tags = [];
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    companies_dialog(val) {
      if (!val && this.added_companies.length > 0) {
        UserService.addCompanies(this.added_companies).then(
          (response) => {
            this.$store.dispatch("auth/userUpdate", response.data.data);
            this.added_companies = [];
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      var names = this.$store.state.auth.user.name.split(" ");

      if(names.length > 1) return names;
      else return [this.name, ""];
    },
    progress() {
      var xp = this.$store.state.auth.user.total_points;
      var start_points = this.$store.state.auth.user.level.data.start_points;
      var end_points = this.$store.state.auth.user.level.data.end_points;

      return ((xp - start_points) / (end_points - start_points)) * 100;
    },
  },
  mounted() {
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
}

.cv-wrapper {
  margin-bottom: 2.5vh;
}

.cv-wrapper img,
.linkedin-wrapper img {
  height: 7.5vh;
  width: 7.5vh;
  margin-right: 5vw;
}

.cv-wrapper p,
.linkedin-wrapper p {
  align-self: center;
  font-size: 3vh;
  font-weight: 600;
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
  background-color: #27aee4c2;
  border-radius: 3vh;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-right: 1vw;
  margin-bottom: 1vh;
}

.add-tag {
  background-color: green;
  font-weight: 600;
  font-size: 2.5vh;
}

.footer {
  background-color: #50575c;
  margin-top: 0.8vh;
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
}

.logout-img img {
  height: 4vh;
  width: 4vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* .linkedin-input {
} */

.linkedin-input input {
  width: 100%;
  margin-top: 0.5vh;
  font-size: 2.7vh;
}

.linkedin-input button {
  margin: 1vh;
  color: green;
}

@media screen and (max-width: 1100px) {

}

@media screen and (min-width: 1100px) {
  .middle {
    display: flex;
    justify-content: space-between;
  }

  .cv-wrapper{
    margin-left: 10vw;
  }

  .linkedin-wrapper {
    margin-right: 10vw;
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