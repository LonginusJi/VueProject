<template>
  <div class="chart">
    <svg id="ForceChart" />
  </div>
</template>

<script>
import ForceChart from "./ForceChart";
export default {
  mounted() {
    this.initForceChart();
  },
  methods: {
    initForceChart() {
      let [graph, width, height] = [
        require("../data/miserables.json"),
        760,
        600
      ];
      new ForceChart(graph, width, height);
    }
  }
};
</script>

<style>
#ForceChart {
  display: block;
  margin: 50px auto;
}
</style>