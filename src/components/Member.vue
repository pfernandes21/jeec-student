<template>
  <div class="member">
    <img
      :src="'data: ' + member.photo_type + ';base64, ' + member.photo"
      alt="profile photo"
      class="profile-photo"
    />
    <div class="profile-info">
      <p v-if="member.is_captain" class="captain">Captain</p>
      <p class="name">
        {{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}
      </p>
      <p class="level">level {{ member.level }}</p>
    </div>
    <img
      v-if="member.is_captain"
      src="../assets/icons/kick.svg"
      alt="kick"
      class="kick"
    />
  </div>
</template>

<script>
export default {
  name: "Member",
  props: {
    member: Object,
  },
  computed: {
    nameArray() {
      return this.member.name.split(" ");
    },
  },
};
</script>

<style scoped>
.member {
  display: flex;
  margin-bottom: 1.5vh;
}

.profile-photo {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  align-self: center;
}

.profile-info {
  align-self: center;
  margin-left: 3vw;
}

.profile-info * {
  margin: 0;
}

.captain {
  font-size: 1.8vh;
  font-weight: 700;
  color: #a1a1a1;
  margin-bottom: -0.5vh;
}

.name {
  font-size: 2.7vh;
  font-weight: 600;
}

.level {
  font-size: 1.8vh;
  font-weight: 700;
  color: #27ade4;
  margin-top: -0.5vh;
}

.kick {
  height: 5vh;
  align-self: center;
  justify-self: flex-end;
  transform: scaleX(-1);
  margin-left: auto;
}
</style>
