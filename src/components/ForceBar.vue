<template>
  <svg />
</template>
<script>
import ForceBar from "./ForceBar";

export default {
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      let data = require("C:/Users/magic/Documents/vscode/vue/VuetifyProject/src/data/netw_lv_1_kmeans_4_Clust_4fe.json");
      let width = 960;
      let height = 450;
      new ForceBar(data, width, height);
    }
  }
};
</script>
<style>
body {
  background: white;
}

svg {
  display: block;
  margin: 5% auto;
}

.bars line {
  stroke: #333;
  stroke-width: 1px;
  stroke-dasharray: 4px 10px;
}

.labels text {
  font: 12px sans-serif;
  text-anchor: middle;
}

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  fill: #d62333;
  stroke: #fff;
  stroke-width: 1px;
}
</style>