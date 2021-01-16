<template>
  <div class="chat">
    <Navbar :page="currentPage" />

    <center>
      <div class="buttons">
        <button
          class="button"
          :class="{ active: button === 'partners' }"
          @click.stop="button = 'partners'"
        >
          Partners
        </button>
        <button
          class="button"
          :class="{ active: button === 'messages' }"
          @click.stop="button = 'messages'"
        >
          Messages
        </button>
      </div>
    </center>

    <div v-if="button == 'partners'">
      <Partner v-for="partner in partners" :key="partner.name" @learn="learn" :name="partner.name" :partnership="partner.partnership_tier" :img_src="jeec_brain_url + partner.logo" />
    </div>

    <iframe
      v-show="button == 'messages'"
      class="chat_frame"
      ref="chat"
      :src="rocket_chat_url"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Partner from "@/components/Partner.vue";
import UserService from "../services/user.service";

export default {
  name: "Chat",
  components: {
    Navbar,
    Partner
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      rocket_chat_url: process.env.VUE_APP_ROCKET_CHAT_URL + "/home?layout=embedded&resumeToken=",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      button: "partners",
      partners: [],
      partner: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    login(event) {
      if (
        event.origin == process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data == "logged_in"
      ) {
        this.rocket_chat_url =
          process.env.VUE_APP_ROCKET_CHAT_URL + "/channel/general?layout=embedded";
      }
    },
    learn(name) {
      UserService.getPartner(name).then(
      (response) => {
        this.partner = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    },
  },
  created() {
    window.addEventListener("message", this.login);
  },
  destroyed() {
    window.removeEventListener("message", this.login);
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getChatToken().then(
      (response) => {
        this.rocket_chat_url = this.rocket_chat_url + response.data.token;
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getPartners().then(
      (response) => {
        this.partners = response.data.data;
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
  height: 100vh;
  background-color: #e6e6e6;
}

.chat_frame {
  width: 100%;
  height: 76%;
}

.buttons {
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.button {
  background-color: rgba(88, 185, 224, 0.638);
  border-radius: 3vh;
  font-size: 3.5vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.active {
  background-color: #27ade4;
}

.button1 {
  margin-right: 2vw;
}

.button2 {
  margin-left: 2vw;
}
</style>
