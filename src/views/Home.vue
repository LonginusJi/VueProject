<template>
  <v-parallax
    dark
    style="height:700px; max-width:100%; max-height:100%"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row align="center" justify="center">
      <v-card max-width="500" class="mx-auto" id="logIn">
        <v-card-text>
          <v-text-field label="Username" type="text" v-model="username"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          <span class="caption grey--text text--darken-1">Please enter a password for your account</span>
        </v-card-text>
        <v-btn @click="logIn">Log In</v-btn>
        <v-alert type="info" v-model="show" dismissible>You can add '/Chart' after the local address</v-alert>
      </v-card>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return { username: "", password: "", show: "" };
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
.v-parallax {
  overflow: visible;
}
.v-parallax__image-container {
  contain: none;
}
#logIn {
  margin: 10%;
  text-align: center;
}
.v-alert .v-alert__icon.v-icon,
.v-alert__dismissible .v-icon {
  color: #fff;
}
</style>