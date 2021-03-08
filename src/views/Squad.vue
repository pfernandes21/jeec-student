<template>
  <div class="squad">
    <Buttons
      @_click="click"
      :names="{
        'my squad': button === 'my squad',
        invites: button === 'invites',
      }"
      :n_invites="invites.length"
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

    <div v-show="button === 'invites'" style="margin-top: 8vh">
      <Invite
        @accept="accept_invite"
        @reject="reject_invite"
        v-for="invite in invites"
        :key="invite.sender_name"
        :invite="invite"
      />
    </div>
  </div>
</template>

<script>
import Invite from "@/components/Invite.vue";
import UserService from "../services/user.service";
import Buttons from "@/components/Buttons.vue";
import SquadCreation from "@/components/SquadCreation.vue";
import MySquad from "@/components/MySquad.vue";

export default {
  name: "Squad",
  components: {
    Invite,
    Buttons,
    SquadCreation,
    MySquad,
  },
  data: function () {
    return {
      button: "my squad",
      squad: null,
      invites: [],
      invites_sent: [],
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
    accept_invite(invite_id) {
      UserService.acceptInvite(invite_id).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);

          UserService.getSquadInvitesReceived().then(
            (response) => {
              this.invites = response.data.data;
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
    reject_invite(invite_id) {
      UserService.rejectInvite(invite_id).then(
        () => {},
        (error) => {
          console.log(error);
        }
      );

      UserService.getSquadInvitesReceived().then(
        (response) => {
          this.invites = response.data.data;
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

    UserService.getSquadInvitationsReceived().then(
      (response) => {
        this.invites = response.data.data;
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