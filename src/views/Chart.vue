<template>
  <div>
    <v-tabs fixed-tabs background-color="indigo" dark grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      <v-tab-item>
        <ForceChart></ForceChart>
      </v-tab-item>
      <v-tab-item>
        <div display:middle>
          <v-btn
            class="my-12 white--text"
            @click="drawForceBar(),loader = 'loading'"
            :loading="loading"
            :disabled="loading"
            color="blue-grey"
          >Draw Chart</v-btn>
          <v-btn @click="clear()">Clear Chart</v-btn>
        </div>
        <ForceBar ref="ForceBar"></ForceBar>
      </v-tab-item>
      <v-tab-item>
        <HighChart></HighChart>
      </v-tab-item>
      <v-tab-item>
        <CircleChart></CircleChart>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import HighChart from "../components/HighChart.vue";
import ForceChart from "../components/ForceChart.vue";
import CircleChart from "../components/CircleChart.vue";
import ForceBar from "../components/ForceBar.vue";
export default {
  data() {
    return {
      items: [
        "Force Chart",
        "Force Chart(Divided)",
        "Bar Chart",
        "Circle Chart"
      ],
      loader: null,
      loading: false
    };
  },
  components: {
    ForceChart,
    CircleChart,
    HighChart,
    ForceBar
  },
  methods: {
    drawForceBar() {
      setTimeout(() => {
        this.$refs.ForceBar.initForceBar(); // use function in ForceBar.vue
      }, 1000);
    },
    clear() {
      this.$refs.ForceBar.clearAll(); // use function in ForceBar.vue
    }
  },
  watch: {
    loader() {
      let l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 1000);
      this.loader = null;
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
</style>