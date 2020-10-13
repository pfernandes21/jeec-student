<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$vuetify.theme.themes.light.primary = '#50575C';
    this.$vuetify.theme.themes.light.secundary = '#27ADE4';
  },  
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

#app {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
</style>