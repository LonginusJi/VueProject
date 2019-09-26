<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase d-flex align-center">
        <span>&nbsp;Contribute by Jerry</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        <span class="mr-2" @click="homepage()">Log Out</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Home from './components/Home'

export default {
  name: "App",
  methods: {
    homepage() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
