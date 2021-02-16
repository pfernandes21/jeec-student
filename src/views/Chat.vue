<template>
  <div class="chat">
    <Navbar :page="currentPage" />

    <center style="margin-top: 10vh">
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
          @click.stop="messages()"
        >
          Messages
        </button>
      </div>

      <div class="sponsors-page">
        <div v-if="button == 'partners'">
          <div class="main-sponsors sponsors">
            <Partner
              v-for="partner in main_sponsors"
              :key="partner.name"
              @learn="learn"
              :name="partner.name"
              :partnership="partner.partnership_tier"
              :img_src="jeec_brain_url + partner.logo"
            />
          </div>
          <div class="gold-sponsors sponsors">
            <Partner
              v-for="partner in gold_sponsors"
              :key="partner.name"
              @learn="learn"
              :name="partner.name"
              :partnership="partner.partnership_tier"
              :img_src="jeec_brain_url + partner.logo"
            />
          </div>
          <div class="silver-sponsors sponsors">
            <Partner
              v-for="partner in silver_sponsors"
              :key="partner.name"
              @learn="learn"
              :name="partner.name"
              :partnership="partner.partnership_tier"
              :img_src="jeec_brain_url + partner.logo"
            />
          </div>
          <div class="bronze-sponsors sponsors">
            <Partner
              v-for="partner in bronze_sponsors"
              :key="partner.name"
              @learn="learn"
              :name="partner.name"
              :partnership="partner.partnership_tier"
              :img_src="jeec_brain_url + partner.logo"
            />
          </div>
        </div>
      </div>
    </center>

    <div v-if="button == 'partner'">
      <center>
        <Partner_Info
          class="partner-info"
          :partner="partner"
          @chat_partner="chat_partner"
          @chat_member="chat_member"
          @add_interest="add_interest"
        />
      </center>
    </div>

    <div class="chat-room" v-show="button === 'messages'">
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
      rocket_chat_url: process.env.VUE_APP_ROCKET_CHAT_URL,
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
    main_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "main_sponsor";
      });
    },
    gold_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "gold";
      });
    },
    silver_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "silver";
      });
    },
    bronze_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "bronze";
      });
    },
  },
  methods: {
    logs(event) {
      if (
        event.origin === process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data === "logged_in"
      ) {
        this.chat_logged_in = true;
      } else if (
        event.origin === process.env.VUE_APP_ROCKET_CHAT_URL &&
        event.data === "logged_out"
      ) {
        UserService.getChatToken().then(
          (response) => {
            this.rocket_chat_room_url =
              this.rocket_chat_url + "/home?resumeToken=" + response.data.token;
            console.log(response.data.token);
          },
          (error) => {
            console.log(error);
          }
        );
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
            this.rocket_chat_room_url =
              this.rocket_chat_url +
              "/channel/" +
              partner_name.replace(" ", "_");
            if (this.chat_logged_in) {
              this.rocket_chat_url = this.rocket_chat_room_url;
              this.button = "messages";
            }
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
            this.rocket_chat_room_url =
              this.rocket_chat_url + "/direct/" + response.data.room_id;
            if (this.chat_logged_in) {
              this.rocket_chat_url = this.rocket_chat_room_url;
              this.button = "messages";
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
    messages() {
      if (this.chat_logged_in) {
        if (!this.rocket_chat_room_url) {
          this.rocket_chat_room_url =
            process.env.VUE_APP_ROCKET_CHAT_URL + "/home";
        }
        this.button = "messages";
      }
    },
  },
  created() {
    window.addEventListener("message", this.logs);
  },
  destroyed() {
    window.removeEventListener("message", this.logs);
  },
  mounted() {
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
  background-color: #e6e6e6;
}

.buttons {
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  justify-content: center;
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

.chat-frame {
  width: 100vw;
  height: 76vh;
}

.sponsors-page {
  background-color: #f1f1f1;
}

.sponsors {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
