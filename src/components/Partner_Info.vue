<template>
  <div class="partner-info" v-if="partner">
    <div class="info-top">
      <div style="display: flex; align-items: center">
        <div
          class="partner-img"
          :style="
            'background-image:' + 'url(' + jeec_brain_url + partner.logo + ')'
          "
        ></div>
        <div>
          <p class="name">{{ partner.name }}</p>
          <p class="bio">{{ partner.business_area }}</p>
        </div>
      </div>
      <center>
        <div class="buttons">
          <button @click.stop="chat" class="button">Chat Room</button>
          <button @click.stop="go_to_zoom" class="button" :style="zoom_style">
            ZOOM
          </button>
        </div>
      </center>
    </div>

    <div class="team">
      <p class="team-title">Team</p>
      <div
        class="member"
        v-for="member in partner.team.data"
        :key="member.user_id"
      >
        <div class="member-info">
          <p class="member-name">{{ member.name }}</p>
          <p class="member-post">{{ member.post }}</p>
        </div>
        <button
          class="chat-icon"
          @click.stop="chat_member(member.user_id, member.name)"
        >
          <img src="../assets/icons/chat.svg" />
        </button>
      </div>
    </div>

    <center>
      <div class="buttons">
        <button
          @click.stop="add_interest"
          class="button"
          :style="
            partner.interest
              ? 'background-color: rgba(88, 185, 224, 0.638)'
              : ''
          "
        >
          {{ !partner.interest ? "Add Interest" : "Interest Added" }}
        </button>
        <button @click.stop="go_to_activities" class="button">
          See Activities
        </button>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "Partner_Info",
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  props: {
    partner: Object,
  },
  computed: {
    zoom_style() {
      if (this.partner.zoom_url) {
        return "";
      } else {
        return "background-color: rgba(88, 185, 224, 0.638);";
      }
    },
  },
  methods: {
    go_to_zoom() {
      if (this.partner.zoom_url) {
        location.href = this.partner.zoom_url;
      }
    },
    go_to_activities() {
      this.$router.push("/activities");
    },
    chat() {
      this.$emit("chat_partner", this.partner.name);
    },
    chat_member(member_id, member_name) {
      this.$emit("chat_member", member_id, member_name);
    },
    add_interest() {
      if (!this.partner.interest) {
        this.$emit("add_interest", this.partner.name);
      }
    },
  },
};
</script>

<style scoped>
.partner-info {
  width: 100%;
}

.info-top {
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
  background-color: #f1f1f1;
  margin-bottom: 1vh;
}

.name {
  font-size: 5vh;
  font-weight: 600;
  margin: 0;
}

.bio {
  font-size: 2.4vh;
  font-weight: 500;
  margin: 0;
  line-height: 2vh;
}

.partner-img {
  position: relative;
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.3vh solid #707070;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5vw;
  overflow: hidden;
}

.team {
  width: 100%;
  min-height: 39.4vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
  background-color: #f1f1f1;
}

.team-title {
  font-size: 4vh;
  font-weight: 600;
  text-align: center;
}

.member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2vh;
}

.member-name {
  font-size: 4vh;
  font-weight: 500;
  margin: 0;
  line-height: 3.5vh;
}

.member-post {
  font-size: 2vh;
  font-weight: 600;
  color: #27ade4;
  margin: 0;
}

.chat-icon {
  height: 4vh;
  margin-bottom: 1vh;
  filter: invert(71%) sepia(6%) saturate(135%) hue-rotate(169deg)
    brightness(97%) contrast(88%);
}

.chat-icon img {
  height: 4vh;
  width: 4vh;
}

.buttons {
  margin-top: 1vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  justify-content: center;
}

.button {
  background-color: #27ade4;
  border-radius: 3vh;
  font-size: 2.7vh;
  font-weight: 500;
  color: white;
  width: 39vw;
  height: auto;
  padding-top: 1.2vh;
  padding-bottom: 1.2vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

@media screen and (max-width: 1100px) {
}

@media screen and (min-width: 1100px) {
  .buttons {
    padding-left: 1vw;
    padding-right: 1vw;
  }

  .button {
    width: 15vw;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }

  .info-top,
  .team {
    padding-left: 2vw;
    padding-right: 2vw;
  }

  .partner-img {
    height: 17vh;
    width: 17vh;
    margin-right: 2vw;
  }

  .name {
    font-size: 5.5vh;
  }

  .team {
    height: 41vh;
    overflow-y: auto;
  }
}
</style>
