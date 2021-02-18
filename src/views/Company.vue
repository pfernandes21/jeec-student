<template>
  <div class="company">
    <Buttons @_click="click" :names="{ Partners: false, Messages: false }" />

    <Partner_Info
      style="margin-top: 18vh"
      class="partner-info"
      :partner="partner"
      @chat_partner="chat_partner"
      @chat_member="chat_member"
      @add_interest="add_interest"
    />
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Partner_Info from "@/components/Partner_Info.vue";
import UserService from "../services/user.service";

export default {
  name: "Company",
  components: {
    Buttons,
    Partner_Info,
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      partner: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    click(name) {
      if (name === "Partners") {
        this.$router.push("/companies");
      } else if (name === "Messages") {
        this.$router.push("/chat");
      }
    },
    chat_partner(partner_name) {
      UserService.getChatRoom(partner_name).then(
        (response) => {
          if (response.data.result) {
            this.$router.push({
              name: "Chat",
              query: { room_id: "/channel/" + partner_name.replace(" ", "_") },
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    chat_member(member_id) {
      UserService.getChatRoom("", member_id).then(
        (response) => {
          if (response.data.room_id) {
            this.$router.push({
              name: "Chat",
              query: { room_id: "/direct/" + response.data.room_id },
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    add_interest(partner) {
      UserService.addCompanies([partner]).then(
        (response) => {
          this.$store.dispatch("auth/userUpdate", response.data.data);
          this.partner.interest = true;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getPartner(this.$route.params.name).then(
      (response) => {
        this.partner = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.company {
  background-color: #e6e6e6;
}

@media screen and (max-width: 1100px) {
}

@media screen and (min-width: 1100px) {
  .button {
    width: 17vw;
    margin-left: 8vw;
    margin-right: 8vw;
  }

  .partner-info {
    width: 50vw;
  }

  .sponsors:first-of-type {
    padding-top: 3vh;
  }

  .sponsors:last-of-type {
    padding-bottom: 3vh;
  }
}
</style>
