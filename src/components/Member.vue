<template>
  <div class="member">
    <img :src="member.photo" alt="profile photo" class="profile-photo" />
    <div class="profile-info">
      <p v-if="member.is_captain" class="captain">Captain</p>
      <p class="name">
        {{ nameArray[0] }} <br v-if="$route.name === 'Home'" />
        {{ nameArray[nameArray.length - 1] }}
      </p>
      <p class="level">level {{ member.level }}</p>
    </div>
    <img
      v-if="is_kickable && !loading_kick"
      @click.stop="kick"
      src="../assets/icons/kick.svg"
      alt="kick"
      class="kick"
    />
    <v-progress-circular
      v-else-if="is_kickable && loading_kick"
      indeterminate
      color="#27ade4"
      :size="60"
      :width="6"
      class="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Member",
  props: {
    member: Object,
    captain_ist_id: String,
  },
  data: function () {
    return {
      loading_kick: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    nameArray() {
      var names = this.member.name.split(" ");

      if (names.length > 1) return names;
      else return [this.member.name, ""];
    },

    is_kickable() {
      var user = this.$store.state.auth.user;
      return (
        user.ist_id === this.captain_ist_id &&
        this.member.ist_id !== user.ist_id &&
        this.$route.name === "Squad"
      );
    },
  },
  methods: {
    kick() {
      if (!confirm("Are you sure you want to proceed?")) {
        return;
      }

      this.loading_kick = true;

      UserService.kickMember(this.member.ist_id).then(
        (response) => {
          var squad = response.data.data;
          this.$emit("kick", squad);
        },
        (error) => {
          console.log(error);
          this.loading_kick = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.member {
  display: flex;
  margin-bottom: 1.5vh;
}

.profile-photo {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  align-self: center;
}

.profile-info {
  align-self: center;
  margin-left: 3vw;
}

.profile-info * {
  margin: 0;
}

.captain {
  font-size: 1.8vh;
  font-weight: 700;
  color: #a1a1a1;
  margin-bottom: -0.5vh;
}

.name {
  font-size: 2.7vh;
  font-weight: 600;
  line-height: 3vh;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
}

.level {
  font-size: 1.8vh;
  font-weight: 700;
  color: #27ade4;
  margin-top: -0.5vh;
}

.kick {
  height: 5vh;
  align-self: center;
  justify-self: flex-end;
  transform: scaleX(-1);
  margin-left: auto;
  cursor: pointer;
}

.loading {
  align-self: center;
  justify-self: flex-end;
  transform: scaleX(-1);
  margin-left: auto;
}

@media screen and (min-width: 1100px) {
  .profile-info {
    margin-left: 1vw;
  }
}
</style>
