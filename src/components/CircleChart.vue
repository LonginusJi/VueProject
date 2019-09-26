<template>
  <div id="CircleChart" style="text-align:center"></div>
</template>

<script>
import CircleChart from "./Circle";
import * as d3 from "d3";
export default {
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      // let data = require("../data/netw_lv_1_kmeans_4_Clust_4fe.json");
      // let width = 960;
      // let height = 450;
      d3.csv(
        "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv"
      ).then(data => {
        new CircleChart(data);
      });
    }
  }
};
</script>

<style>
svg .bubbles {
  stroke-width: 1px;
  stroke: black;
  opacity: 0.8;
}

.bubbles:hover {
  stroke: black;
}

.links {
  stroke: #999;
  stroke-width: 1.5px;
}
</style>