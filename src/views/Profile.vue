<template>
  <div class="profile">
    <Navbar :page="currentPage" />

    <div class="top">
      <img
        alt="profile photo"
        src="../assets/profile.jpg"
        style="width: 12vh; height: 12vh; border-radius: 50%"
      />
      <div class="profile-info">
        <div class="name">
          <p>Pedro</p>
          <p>Fernandes</p>
        </div>
        <p class="level">level 3</p>
        <Expbar :xp="10" :next_xp="100" width="60vw" />
      </div>
    </div>

    <div class="middle">
      <div class="cv-wrapper">
        <img src="../assets/icons/cv.svg" alt="cv" />
        <p>Add your CV</p>
      </div>
      <div class="linkedin-wrapper">
        <img src="../assets/icons/linkedin.svg" alt="linkedin" />
        <p>Add your linkedin</p>
      </div>
    </div>

    <div class="bottom">
      <center>
        <p class="interests">Your Interests</p>
      </center>
      <p class="interest-title">Themes:</p>
      <div class="tags">
        <p class="tag">All</p>
        <p class="tag">Machine Learning</p>
      </div>
      <p class="interest-title">Partners:</p>
      <div class="tags">
        <p class="tag">All</p>
        <p class="tag">Deloitte</p>
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
        <tr>
          <td class="logout-img" align="center"><img src="../assets/icons/logout.svg" alt="logout" /></td>
          <td class="logout">LogOut</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Expbar from "@/components/Expbar.vue";

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
    };
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
  line-height: 3.6vh;
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

.footer {
  background-color: #50575c;
}

.spacer {
  height: 1vh;
}

.notifications-wrapper {
  margin-bottom: 9vh;
}

.notifications-switch {
  margin: 0;
  padding: 0;
}

.notifications, .logout {
  color: rgba(255, 255, 255, 0.89);
  font-size: 3vh;
  vertical-align: middle;
}

.logout {
  font-weight: 600;
}

.logout-img img{
  height: 4vh;
  width: 4vh;
}

</style>