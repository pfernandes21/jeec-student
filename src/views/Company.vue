<template>
  <div class="company">
    <Buttons @_click="click" :names="{ Partners: false, Messages: false }" />

    <div class="partner-wrapper" v-if="!loading">
      <Partner_Info
        class="partner-info-wrapper"
        :partner="partner"
        @chat_partner="chat_partner"
        @chat_member="chat_member"
        @add_interest="add_interest"
      />

      <div class="chat-room">
        <p>{{ room_name }} Chat Room</p>
        <iframe
          class="chat-frame"
          ref="chat"
          :src="rocket_chat_room_url"
          frameborder="0"
        ></iframe>
      </div>
    </div>

    <div class="loading" v-else>
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
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
      rocket_chat_url: process.env.VUE_APP_ROCKET_CHAT_URL,
      rocket_chat_room_url: "",
      chat_logged_in: false,
      room_name: "",
      loading: true,
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
    logs(event) {
      if (
        event.origin === process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data === "logged_in"
      ) {
        this.chat_logged_in = true;
        if (this.room_name === "") {
          this.chat_partner(this.partner.name);
        }
      } else if (
        event.origin === process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data === "logged_out"
      ) {
        UserService.getChatToken().then(
          (response) => {
            this.rocket_chat_room_url =
              this.rocket_chat_url +
              "/home?layout=embedded&resumeToken=" +
              response.data.token;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    chat_partner(partner_name) {
      UserService.getChatRoom(partner_name).then(
        (response) => {
          if (response.data.result) {
            if (window.innerWidth <= 1100) {
              this.$router.push({
                name: "Chat",
                query: {
                  room_id: "/channel/" + partner_name.replace(" ", "_"),
                },
              });
            } else {
              if (this.chat_logged_in) {
                this.room_name = partner_name;
                this.rocket_chat_room_url =
                  this.rocket_chat_url +
                  "/channel/" +
                  partner_name.replace(" ", "_") +
                  "?layout=embedded";
              }
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    chat_member(member_id, member_name) {
      UserService.getChatRoom("", member_id).then(
        (response) => {
          if (response.data.room_id) {
            if (window.innerWidth <= 1100) {
              this.$router.push({
                name: "Chat",
                query: { room_id: "/direct/" + response.data.room_id },
              });
            } else {
              if (this.chat_logged_in) {
                this.room_name = member_name;
                this.rocket_chat_room_url =
                  this.rocket_chat_url +
                  "/direct/" +
                  response.data.room_id +
                  "?layout=embedded";
              }
            }
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
    resize() {
      if (window.innerWidth > 1100 && this.rocket_chat_room_url === "") {
        UserService.getChatToken().then(
          (response) => {
            this.rocket_chat_room_url =
              this.rocket_chat_url +
              "/home?layout=embedded&resumeToken=" +
              response.data.token;
            this.loading = false;
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    },
  },
  destroyed() {
    window.removeEventListener("message", this.logs);
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("message", this.logs);
    window.addEventListener("resize", this.resize);

    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getPartner(this.$route.params.name).then(
      (response) => {
        this.partner = response.data;
        this.resize();
      },
      (error) => {
        console.log(error);
        this.resize();
      }
    );
  },
};
</script>

<style scoped>
.company {
  background-color: #e6e6e6;
}

.partner-wrapper {
  margin-top: 8vh;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

@media screen and (max-width: 1100px) {
  .chat-room {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .company {
    height: 100vh;
    overflow-y: hidden;
  }

  .button {
    width: 17vw;
    margin-left: 8vw;
    margin-right: 8vw;
  }

  .partner-info-wrapper {
    width: 37.3vw;
  }

  .sponsors:first-of-type {
    padding-top: 3vh;
  }

  .sponsors:last-of-type {
    padding-bottom: 3vh;
  }

  .partner-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .chat-room p {
    height: 7.5vh;
    margin: 0;
    margin-bottom: 0.5vh;
    background-color: #2d333a;
    color: white;
    font-size: 3vh;
    font-weight: 600;
    text-align: center;
    line-height: 7.5vh;
  }

  .chat-frame {
    width: 37.3vw;
    height: 84vh;
  }
}
</style>
