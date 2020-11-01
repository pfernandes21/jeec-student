<template>
  <div class="member">
    <img src="../assets/profile.jpg" alt="profile photo" class="profile-photo">
    <div class="profile-info">
      <p v-if="true" class="captain">Captain</p>
      <p class="name">Pedro Fernandes</p>
      <p class="level">level 3</p>
    </div>
    <img src="../assets/icons/kick.svg" alt="kick" class="kick">
  </div>
</template>

<script>
export default {
  name: "Member",
  props: {
    
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

.profile-info *{
  margin: 0;
}

.captain {
  font-size: 1.6vh;
  font-weight: 700;
  color: #A1A1A1;
  margin-bottom: -0.5vh;
}

.name {
  font-size: 2.7vh;
  font-weight: 600;
}

.level {
  font-size: 1.6vh;
  font-weight: 700;
  color: #27ADE4;
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
