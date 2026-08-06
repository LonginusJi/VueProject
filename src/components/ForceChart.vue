<template>
  <div class='chart'>
    <svg id='ForceChart'/>
  </div>
</template>

<script>
import ForceChart from './ForceChart';
import forceChartData from '../data/miserables.json';
export default {
  mounted() {
    this.initForceChart();
  },
  methods: {
    initForceChart() {
      let [graph, width, height] = [
        forceChartData,
        1060,
        700,
      ];
      new ForceChart(graph, width, height);
    }
  }
};
</script>

<style>
#ForceChart {
  display: block;
  margin: 10px auto;
}
</style>
