<template>
  <div class="chart">
    <svg id="ForceBar" />
  </div>
</template>
<script>
import ForceBar from "./ForceBar";

export default {
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      let data = require("../data/netw_lv_1_kmeans_4_Clust_4fe.json");
      let width = 960;
      let height = 450;
      new ForceBar(data, width, height);
    }
  }
};
</script>
<style>
.barNodes circle {
  stroke: #fff;
  stroke-width: 1px;
}
#ForceBar {
  display: block;
  margin: 50px auto;
}
</style>