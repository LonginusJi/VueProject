<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class='headline text-uppercase d-flex align-center'>
        <span>&nbsp;Contribute by Jerry</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text">
        <span class='mr-2' @click='homepage()'>Log Out</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import Home from './components/Home'

export default {
  name: 'App',
  methods: {
    homepage() {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style>
.v-application{
  background: white
}
</style>
