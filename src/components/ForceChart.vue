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
      let width = 760;
      let height = 600;
      let graph = require("../data/miserables.json");
      new ForceChart(graph, width, height);
    }
  }
  // mounted() {
  //   var svg = d3.select("#ForceChart"),
  //     width = +svg.attr("width"),
  //     height = +svg.attr("height");

  //   var color = d3.scaleOrdinal(d3.schemeSet1);

  //   var simulation = d3
  //     .forceSimulation()
  //     .force("link", d3.forceLink().id(d => d.id))
  //     .force("charge", d3.forceManyBody())
  //     .force("center", d3.forceCenter(width / 2, height / 2));

  //   const graph = require("../data/miserables.json");

  //   var link = svg
  //     .append("g")
  //     .attr("class", "links")
  //     .selectAll("line")
  //     .data(graph.links)
  //     .join("line")
  //     .attr("stroke", "#999")
  //     .attr("stroke-opacity", 0.6)
  //     // .attr('opacity',0)
  //     .attr("stroke-width", d => Math.sqrt(d.value));

  //   var node = svg
  //     .append("g")
  //     .attr("class", "nodes")
  //     .selectAll("g")
  //     .data(graph.nodes)
  //     .join("g");

  //   node
  //     .append("circle")
  //     .attr("r", 5)
  //     .attr("fill", d => color(d.group))
  //     .attr("stroke", "#fff")
  //     .attr("stroke-width", 1.5)
  //     .call(
  //       d3
  //         .drag()
  //         .on("start", dragstarted)
  //         .on("drag", dragged)
  //         .on("end", dragended)
  //     );

  //   node
  //     .append("text")
  //     .text(d => d.id)
  //     .attr("x", 6)
  //     .attr("y", 3)
  //     .style("font-size", 12)
  //     .style("font-family", "Times New Roman");

  //   node.append("title").text(d => d.id);

  //   simulation.nodes(graph.nodes).on("tick", ticked);

  //   simulation
  //     .force("link")
  //     .links(graph.links)
  //     .distance(d => d.value * 20);

  //   function ticked() {
  //     link
  //       .attr("x1", d => d.source.x)
  //       .attr("y1", d => d.source.y)
  //       .attr("x2", d => d.target.x)
  //       .attr("y2", d => d.target.y);

  //     node.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
  //   }

  //   function dragstarted(d) {
  //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  //     d.fx = d.x;
  //     d.fy = d.y;
  //   }

  //   function dragged(d) {
  //     d.fx = d3.event.x;
  //     d.fy = d3.event.y;
  //   }

  //   function dragended(d) {
  //     if (!d3.event.active) simulation.alphaTarget(0);
  //     d.fx = null;
  //     d.fy = null;
  //   }
  // }
};
</script>

<style>
#ForceChart {
  display: block;
  margin: 50px auto;
}
</style>