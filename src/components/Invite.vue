<template>
  <div class="invite">
    <div class="squad-info-top">
      <img
        class="squad-image"
        :src="jeec_brain_url + invite.squad_image"
        alt="squad-image"
      />
      <div class="squad-data">
        <p class="squad-name">{{ invite.squad_name }}</p>
        <p class="squad-cry">{{ invite.squad_cry }}</p>
        <p class="squad-rank">Rank {{ invite.squad_rank }}</p>
      </div>
    </div>
    <div class="from">
      <v-icon style="color: yellow">mdi-star</v-icon>
      <a class="sender-name"
        >{{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}</a
      >
    </div>

    <center>
      <div class="buttons">
        <button @click.stop="accept" class="button green">Accept</button>
        <button @click.stop="reject" class="button red">Reject</button>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "Invite",
  props: {
    invite: Object,
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    nameArray() {
      var names = this.invite.sender_name.split(" ");

      if (names.length > 1) return names;
      else return [this.invite.sender_name, ""];
    },
  },
  methods: {
    accept() {
      this.$emit("accept", this.invite.external_id);
    },
    reject() {
      this.$emit("reject", this.invite.external_id);
    },
  },
};
</script>

<style scoped>
.invite {
  margin-bottom: 1vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
  background-color: #f1f1f1;
}

.squad-info-top {
  display: flex;
}

.squad-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.1vh #27ade4;
}

.squad-data {
  margin-left: 5vw;
  align-self: center;
}

.squad-name {
  margin: 0;
  margin-top: -1vh;
  margin-bottom: -0.9vh;
  font-size: 3.7vh;
  font-weight: 600;
  color: #848484;
}

.squad-cry {
  color: #848484;
  margin: 0;
  font-size: 2.5vh;
  font-style: italic;
  font-weight: 500;
}

.squad-rank {
  margin: 0;
  font-size: 2.7vh;
  font-weight: 700;
}

.from {
  text-align: center;
  font-size: 3vh;
  font-weight: 600;
}

.buttons {
  display: flex;
  padding-top: 2vh;
  padding-bottom: 1vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.button {
  border-radius: 3vh;
  font-size: 2.5vh;
  font-weight: 500;
  color: white;
  width: 43vw;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 2vw;
  margin-right: 2vw;
}
</style>
