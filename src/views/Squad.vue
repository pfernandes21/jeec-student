<template>
  <div class="squad">
    <Buttons
      @_click="click"
      :names="{
        'my squad': button === 'my squad',
        invitations: button === 'invitations',
      }"
      :n_invites="invitations.length"
    />

    <div v-if="!loading_squad" v-show="button === 'my squad'" style="margin-top: 8vh">
      <SquadCreation
        v-if="squad === null"
        @create="create_squad"
        @notification="notification"
      />
      <MySquad
        v-else
        :squad="squad"
        @delete="delete_squad"
        @notification="notification"
      />
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

    <div v-show="button === 'invitations'" style="margin-top: 8vh">
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
import Invitation from "@/components/Invitation.vue";
import UserService from "../services/user.service";
import Buttons from "@/components/Buttons.vue";
import SquadCreation from "@/components/SquadCreation.vue";
import MySquad from "@/components/MySquad.vue";

export default {
  name: "Squad",
  components: {
    Invitation,
    Buttons,
    SquadCreation,
    MySquad,
  },
  data: function () {
    return {
      button: "my squad",
      squad: null,
      invitations: [],
      loading_squad: true,
    };
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
    notification(message, type) {
      this.$emit("notification", message, type);
    },
    create_squad(squad) {
      this.squad = squad;
    },
    delete_squad(student) {
      this.$store.dispatch("auth/userUpdate", student);
      this.squad = null;
    },
    accept_invitation(invitation_id) {
      UserService.acceptInvitation(invitation_id).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);

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
              this.notification("Joined squad " + this.squad.name, "success");
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.notification("Failed to join squad", "error");
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
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
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

        this.loading_squad = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad = false;
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
};
</script>

<style scoped>
.squad {
  background-color: #e6e6e6;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}
</style>