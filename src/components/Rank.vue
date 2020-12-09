<template>
  <div class="rank" @click="dialog = true">
    <p class="index" :style="{ color: color }">{{ index }}#</p>
    <img class="image" :src="img_src" alt="image" />
    <div class="personal-info">
      <p class="name">
        {{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}
      </p>
      <p v-if="level != null" class="level">level {{ level }}</p>
    </div>

    <v-dialog v-model="dialog" v-if="members">
      <v-card>
        <div class="dialog-wrapper">
          <div v-for="member in members" :key="member.ist_id" class="member">
            <img :src="member.photo" class="member-photo" />
            <p class="member-name">{{ memberName(member.name) }}</p>
            <v-icon v-if="member.is_captain" style="color: yellow" class="star"
              >mdi-star</v-icon
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data: function () {
    return {
      dialog: false,
    };
  },
  props: {
    index: Number,
    img_src: String,
    name: String,
    level: Number,
    members: Array,
  },
  computed: {
    color() {
      if (this.index == 1) return "#FFC02E";
      else if (this.index == 2) return "#BCBCBC";
      else if (this.index == 3) return "#DC8A26";
      else return "black";
    },

    nameArray() {
      var names = this.name.split(" ");

      if (names.length > 1) return names;
      else return [this.name, ""];
    },
  },
  methods: {
    memberName(name) {
      var names = name.split(" ");

      if (names.length > 1) return names[0] + " " + names[names.length - 1];
      else return this.name, "";
    },
  },
};
</script>

<style scoped>
.rank {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  margin-bottom: 0.7vh;
}

.index {
  margin: 0;
  font-weight: 700;
  font-size: 6.1vh;
  text-shadow: 0.5vh 0.5vh 1vh rgba(0, 0, 0, 0.219);
  margin-left: 3vw;
  margin-right: 3vw;
  width: 15vw;
  text-align: right;
}

.image {
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
}

.personal-info p {
  margin: 0;
  margin-left: 3vw;
}

.name {
  font-size: 3.5vh;
  font-weight: 500;
  line-height: 3vh;
}

.level {
  font-size: 2.1vh;
  font-weight: 700;
  line-height: 2.5vh;
  color: #27ade4;
}

.dialog-wrapper {
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 2vw;
  padding-right: 2vw;
}

.member {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.member-photo {
  height: 9vh;
  width: 9vh;
  border-radius: 50%;
}

.member-name {
  margin: 0;
  font-size: 3vh;
  font-weight: 600;
  margin-left: 2vw;
  width: 51vw;
}

.star {
  position: absolute;
  right: 3vw;
}
</style>
