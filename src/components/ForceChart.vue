<template>
  <div>
    <svg id="ForceChart" width="760" height="600" />
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  mounted() {
    var svg = d3.select("#ForceChart"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeSet1);

    var simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id(function(d) {
          return d.id;
        })
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const graph = require("../data/miserables.json");

    var link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      // .attr('opacity',0)
      .attr("stroke-width", function(d) {
        return Math.sqrt(d.value);
      });

    var node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .join("g");

    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", d => color(d.group))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node
      .append("text")
      .text(d => d.id)
      .attr("x", 6)
      .attr("y", 3)
      .style("font-size", 12)
      .style("font-family", "Times New Roman");

    node.append("title").text(d => d.id);

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation
      .force("link")
      .links(graph.links)
      .distance(d => d.value * 20);

    function ticked() {
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }
};
</script>