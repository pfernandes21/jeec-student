<template>
  <div class="chat">
    <Navbar :page="currentPage" />

    <center style="margin-top:10vh">
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
      <Partner
        v-for="partner in partners"
        :key="partner.name"
        @learn="learn"
        :name="partner.name"
        :partnership="partner.partnership_tier"
        :img_src="jeec_brain_url + partner.logo"
      />
    </div>

    <div v-if="button == 'partner'">
      <Partner_Info
        :partner="partner"
        @chat_partner="chat_partner"
        @chat_member="chat_member"
        @add_interest="add_interest"
      />
    </div>

    <div class="chat-room" v-show="button == 'chat'">
      <div class="room-info">
        <p class="room-name">{{ chat_room_name }}</p>
        <p class="room-sub" v-if="chat_room_sub !== ''">{{ chat_room_sub }} ({{ partner.name }})</p>
      </div>
      <iframe
        class="chat_frame"
        ref="chat"
        :src="rocket_chat_url"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Partner from "@/components/Partner.vue";
import Partner_Info from "@/components/Partner_Info.vue";
import UserService from "../services/user.service";

export default {
  name: "Chat",
  components: {
    Navbar,
    Partner,
    Partner_Info,
  },
  data: function () {
    return {
      currentPage: this.$route.name,
      rocket_chat_url: process.env.VUE_APP_ROCKET_CHAT_URL + "/home?layout=embedded&resumeToken=",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      button: "partners",
      partners: [],
      partner: null,
      chat_logged_in: false,
      rocket_chat_room_url: null,
      chat_room_name: "",
      chat_room_sub: "",
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
        if (this.rocket_chat_room_url) {
          this.rocket_chat_url = this.rocket_chat_room_url;
        } else {
          this.rocket_chat_url =
            process.env.VUE_APP_ROCKET_CHAT_URL +
            "/channel/general?layout=embedded";
        }
        this.chat_logged_in = true;
      }
    },
    learn(name) {
      UserService.getPartner(name).then(
        (response) => {
          this.partner = response.data;
          this.button = "partner";
        },
        (error) => {
          console.log(error);
        }
      );
    },
    chat_partner(partner_name) {
      UserService.getChatRoom(partner_name).then(
        (response) => {
          if (response.data.result) {
            this.rocket_chat_room_url = process.env.VUE_APP_ROCKET_CHAT_URL + "/channel/" + partner_name.replace(" ","_") + "?layout=embedded";
            if (this.chat_logged_in) {
              this.rocket_chat_url = this.rocket_chat_room_url;
            }
            this.chat_room_name = partner_name + " Room";
            this.chat_room_sub = "";
            this.button = "chat";
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    chat_member(member_id, member_name, member_post) {
      UserService.getChatRoom("", member_id).then(
        (response) => {
          if (response.data.room_id) {
            this.rocket_chat_room_url = process.env.VUE_APP_ROCKET_CHAT_URL + "/direct/" + response.data.room_id + "?layout=embedded";
            if (this.chat_logged_in) {
              this.rocket_chat_url = this.rocket_chat_room_url;
            }
            this.chat_room_name = member_name;
            this.chat_room_sub = member_post;
            this.button = "chat";
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

.chat-room {
  width: 100vw;
  height: 77vh;
}

.room-info {
  background-color: white;
  margin-bottom: 1vh;
  padding: 1vh;
}

.room-name {
  margin: 0;
  font-size: 4vh;
  font-weight: 600;
  text-align: center;
}

.room-sub {
  margin: 0;
  font-size: 2vh;
  font-weight: 600;
  color: #27ade4;
  text-align: center;
  line-height: 1vh;
}

.chat_frame {
  width: 100vw;
  height: 66vh;
}
</style>
