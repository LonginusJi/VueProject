<template>
  <div class="chart" id="CircleChart" style="text-align:center">
    <div id="information">You need to set a local serve to load data</div>
  </div>
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
      d3.csv("http://127.0.0.1:5500/src/data/circle_chart.csv").then(data => {
        data.forEach(d => {
          d.gdpPercap = +d.gdpPercap;
          d.pop = +d.pop;
        });
        new CircleChart(data);
        d3.select("#information").style("opacity", 0);
      });
    }
  }
};
</script>

<style>
#information {
  margin: 0;
  font-size: 30px;
}
#CircleChart {
  margin: 10px auto;
}
svg .bubbles {
  stroke-width: 1px;
  stroke: black;
  /* opacity: 0.8; */
}

.bubbles:hover {
  stroke: black;
}
</style>