<template>
  <div class="card">
    <p class="title">
      <img :src="require(`@/assets/${icon_src}`)" class="icon" />
      {{ title }}
      <a :href="path" target="_blank"
        ><v-btn
          depressed
          @click.stop="go_to"
          class="redeem white--text"
          color="secundary"
          style="float: right"
          >See All</v-btn
        ></a
      >
    </p>
    <p>
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ActivityDescription",
  data: function() {
    return {};
  },
  props: {
    title: String,
    icon_src: String,
    description: String,
    path: String
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.card {
  background-color: #f1f1f1;
  margin-bottom: 0.5vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}
.icon {
  height: 4vh;
  vertical-align: middle;
}
</style>
