<template>
  <div class="member">
    <img :src="invite.photo" alt="profile photo" class="profile-photo" />
    <div class="profile-info">
      <p class="msg">Invite Sent</p>
      <p class="name">
        {{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}
      </p>
      <p class="level">level {{ invite.level }}</p>
    </div>
    <img
      v-if="!loading_cancel"
      @click.stop="cancel"
      src="../assets/icons/delete.svg"
      alt="delete"
      class="delete"
    />
    <v-progress-circular
      v-else
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
  name: "InviteSent",
  props: {
    invite: Object,
  },
  data: function () {
    return {
      loading_cancel: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    nameArray() {
      var names = this.invite.name.split(" ");

      if (names.length > 1) return names;
      else return [this.invite.name, ""];
    },
  },
  methods: {
    cancel() {
      this.loading_cancel = true;

      UserService.cancelInvitation(this.invite.id).then(
        () => {
          this.$emit("cancel", this.invite.id);
        },
        (error) => {
          console.log(error);
          this.loading_cancel = false;
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
  filter: grayscale(1);
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

.msg {
  font-size: 2vh;
  font-weight: 800;
  margin: 0;
}

.name {
  font-size: 2.7vh;
  font-weight: 600;
  line-height: 3vh;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  color: gray;
}

.level {
  font-size: 1.8vh;
  font-weight: 700;
  color: #27ade4;
  margin-top: -0.5vh;
  color: gray;
}

.delete {
  height: 4vh;
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
