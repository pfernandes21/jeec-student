<template>
  <div class="chat">
    <Buttons @_click="click" :names="{ Partners: false, Messages: true }" />

    <div class="chat-room">
      <iframe
        class="chat-frame"
        ref="chat"
        :src="rocket_chat_room_url"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import UserService from "../services/user.service";

export default {
  name: "Chat",
  components: {
    Buttons,
  },
  data: function () {
    return {
      rocket_chat_url: process.env.VUE_APP_ROCKET_CHAT_URL,
      rocket_chat_room_url: "",
      chat_logged_in: false,
      room_id: this.$route.query.room_id,
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
      }
    },
    logs(event) {
      if (
        event.origin === process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data === "logged_in"
      ) {
        this.chat_logged_in = true;
        if (this.room_id) {
          this.rocket_chat_room_url = this.rocket_chat_url + this.room_id;
        }
      } else if (
        event.origin === process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data === "logged_out"
      ) {
        UserService.getChatToken().then(
          (response) => {
            this.rocket_chat_room_url =
              this.rocket_chat_url + "/home?resumeToken=" + response.data.token;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  destroyed() {
    window.removeEventListener("message", this.logs);
  },
  created() {
    window.addEventListener("message", this.logs);

    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getChatToken().then(
      (response) => {
        this.rocket_chat_room_url =
          this.rocket_chat_url + "/home?resumeToken=" + response.data.token;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.chat {
  background-color: white;
  margin-bottom: 0;
  height: 100vh;
  overflow-y: hidden;
}

.chat-frame {
  width: 100vw;
  height: 82vh;
  margin-top: 8vh;
}

@media screen and (max-width: 1100px) {
}

@media screen and (min-width: 1100px) {
  .chat-frame {
    width: 75vw;
    height: 92vh;
  }
}
</style>
