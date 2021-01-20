<template>
  <div class="partner-info">
    <div class="info-top">
      <div style="display: flex">
        <div class="partner-img">
          <img :src="jeec_brain_url + partner.logo" />
        </div>
        <div style="margin-left: 2vw">
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
        <img
          class="chat-icon"
          src="../assets/icons/chat.svg"
          @click.stop="chat_member(member.user_id, member.name, member.post)"
        />
      </div>
    </div>

    <center>
      <div class="buttons">
        <button @click.stop="add_interest" class="button" :style="partner.interest ? 'background-color: rgba(88, 185, 224, 0.638)' : ''">
          {{ !partner.interest ? 'Add Interest' : 'Interest Added'}}
        </button>
        <button @click.stop="go_to_activities" class="button">See Activities</button>
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
      if(this.partner.zoom_url)
      {
        window.location.replace(this.partner.zoom_url);
      }
    },
    go_to_activities() {
      this.$router.push("/activities");
    },
    chat() {
      this.$emit("chat_partner", this.partner.name);
    },
    chat_member(member_id, member_name, member_post) {
      this.$emit("chat_member", member_id, member_name, member_post);
    },
    add_interest() {
      if(!this.partner.interest)
      {
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
  padding-left: 4vw;
  padding-right: 4vw;
  background-color: #F1F1F1;
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
  border: 0.1vh solid #707070;
  background-color: #F1F1F1;
  margin-right: 3vw;
  overflow: hidden;
}

.partner-img img {
  position: absolute;
  margin: auto;
  max-height: 13vh;
  max-width: 13vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.team {
  width: 100%;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
  background-color: #F1F1F1;
}

.team-title {
  font-size: 4vh;
  font-weight: 600;
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

.buttons {
  margin-top: 1vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
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
</style>
