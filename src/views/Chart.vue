<template>
  <div class="charts">
    <v-tabs fixed-tabs background-color="indigo" dark grow>
      <v-tab>Force Chart</v-tab>
      <v-tab>Force Chart(Divided)</v-tab>
      <v-tab>Bar Chart</v-tab>
      <v-tab>Circle Chart</v-tab>
      <v-tab-item>
        <ForceChart></ForceChart>
      </v-tab-item>
      <v-tab-item>
        <v-btn
          class="ma-2 white--text"
          @click="drawForceBar(),loader = 'loading'"
          :loading="loading"
          :disabled="loading"
          color="blue-grey"
        >Draw Chart</v-btn>
        <v-btn @click="clear()">Clear Chart</v-btn>
        <ForceBar ref="child"></ForceBar>
      </v-tab-item>
      <v-tab-item>
        <HighChart></HighChart>>
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
        this.$refs.child.initForceBar();
      }, 1000);
    },
    clear() {
      this.$refs.child.clearAll();
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
.chart {
  display: block;
  margin: 50px auto;
}
</style>