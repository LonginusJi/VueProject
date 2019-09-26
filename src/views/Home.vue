<template>
  <v-card max-width="500" class="mx-auto" id="logIn">
    <v-card-text>
      <v-text-field label="Username" type="text" v-model="username"></v-text-field>
      <v-text-field label="Password" type="password" v-model="password"></v-text-field>
      <span class="caption grey--text text--darken-1">Please enter a password for your account</span>
    </v-card-text>
    <v-btn @click="logIn">Log In</v-btn>
    <v-alert type="error" v-model="show" dismissible>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password Wrong</v-alert>
  </v-card>
</template>

<script>
export default {
  data() {
    return { username: "", password: "", show: "", dismissible: "true" };
  },
  methods: {
    logIn() {
      a: if (this.password.length >= 5) {
        for (var i = 0; i < this.password.length; i++) {
          if (this.password.slice(i, i + 5) == "magic") {
            this.$router.push({ path: "/Chart" });
            break a;
          }
        }
        this.show = true;
      } else {
        this.show = true;
      }
    }
  }
};
</script>

<style>
#logIn {
  margin: 10%;
  text-align: center;
}
</style>