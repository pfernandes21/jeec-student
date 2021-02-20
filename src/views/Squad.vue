<template>
  <div class="squad">
    <Buttons
      @_click="click"
      :names="{
        'my squad': button === 'my squad',
        invitations: button === 'invitations',
      }"
    />

    <div v-show="button === 'my squad'" style="margin-top: 18vh">
      <SquadCreation v-if="squad === null" @create="create_squad" />
      <MySquad v-else :squad="squad" @delete="delete_squad" />
    </div>

    <div v-show="button === 'invitations'" style="margin-top: 18vh">
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
    };
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
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
        },
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

      UserService.getUserSquad().then(
        (response) => {
          this.squad = response.data.data;
        },
        (error) => {
          console.log(error);
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
      },
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
};
</script>

<style scoped>
.squad {
  height: 100%;
  background-color: #e6e6e6;
}

</style>