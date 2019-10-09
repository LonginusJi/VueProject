<template>
  <div class='chart'>
    <svg id='ForceBar' />
  </div>
</template>
<script>
import ForceBar from './ForceBar';
import * as d3 from 'd3';

export default {
  // mounted() {
  //   this.initForceBar();
  // },
  methods: {
    clearAll() {
      d3.select('#ForceBar')
        .attr('width', 0)
        .attr('height', 0)
        .selectAll('*')
        .remove();
    },
    initForceBar() {
      let [data, width, height] = [
        require('../data/netw_lv_1_kmeans_4_Clust_4fe.json'),
        960,
        450,
      ];
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