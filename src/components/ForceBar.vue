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

  // mounted() {
  //   const graph = require("C:/Users/magic/Documents/vscode/vue/VuetifyProject/src/data/netw_lv_1_kmeans_4_Clust_4fe.json");
  //   const volumes = d3.set(graph.clustNodes.map(d => d.id)).values();
  //   const width = 960;
  //   const height = 450;
  //   const nodeRadius = d3.scaleSqrt().range([6, 10]);

  //   const xGravity = d3
  //     .scaleOrdinal()
  //     .domain(volumes)
  //     .range(
  //       d3
  //         .range(0, volumes.length)
  //         .map(d => width / (2 * volumes.length) + (d * width) / volumes.length)
  //     );

  //   const xMin = d3
  //     .scaleOrdinal()
  //     .domain(volumes)
  //     .range(
  //       d3.range(0, volumes.length).map(d => (d * width) / volumes.length)
  //     );

  //   const xMax = d3
  //     .scaleOrdinal()
  //     .domain(volumes)
  //     .range(
  //       d3.range(0, volumes.length).map(d => ((d + 1) * width) / volumes.length)
  //     );

  //   const drag = d3
  //     .drag()
  //     .on("start", dragStart)
  //     .on("drag", dragging)
  //     .on("end", dragEnd);

  //   const svg = d3
  //     .select("svg")
  //     .attr("width", width)
  //     .attr("height", height);

  //   const linkForceBar = d3
  //     .forceBarLink()
  //     .id(d => d.id)
  //     .strength(function(d) {
  //       if (d.source.belogsToClust === d.target.belogsToClust) return 0.2;
  //       else
  //         return Math.pow(
  //           0.3,
  //           Math.abs(+d.source.belogsToClust - +d.target.belogsToClust)
  //         );
  //     });

  //   const forceBarSim = d3
  //     .forceBarSimulation()
  //     .velocityDecay(0.2)
  //     .forceBar("link", linkForceBar)
  //     .forceBar("charge", d3.forceBarManyBody())
  //     .forceBar(
  //       "forceBarX",
  //       d3
  //         .forceBarX()
  //         .strength(0.33)
  //         .x(d => xGravity(d.belogsToClust))
  //     )
  //     .forceBar(
  //       "forceBarY",
  //       d3
  //         .forceBarY()
  //         .strength(0.15)
  //         .y(function() {
  //           return height / 2;
  //         })
  //     );

  //   // Make sure small nodes are drawn on top of larger nodes
  //   // use d.w as the radius of the circle

  //   graph.nodes.sort(function(a, b) {
  //     return b.w - a.w;
  //   });
  //   //
  //   nodeRadius.domain([
  //     graph.nodes[graph.nodes.length - 1].w,
  //     graph.nodes[0].w
  //   ]);

  //   // linkWidth.domain(d3.extent(graph.links, function(d) {
  //   // 	return d.chapters.length;
  //   // }));

  //   // graph.nodes.forEach(function(d) {
  //   // 	d.x = xGravity(d.firstVolume) + width * (Math.random() - 0.5);
  //   // 	d.y = height * (Math.random() - 0.5);
  //   // });

  //   const bars = svg
  //     .append("g")
  //     .attr("class", "bars")
  //     .selectAll("line")
  //     .data(volumes.slice(0, volumes.length - 1))
  //     .enter()
  //     .append("line")
  //     .attr("x1", d => xMax(d))
  //     .attr("y1", 0)
  //     .attr("x2", d => xMax(d))
  //     .attr("y2", height);

  //   const labels = svg
  //     .append("g")
  //     .attr("class", "labels")
  //     .selectAll("text")
  //     .data(volumes)
  //     .enter()
  //     .append("text")
  //     .attr("x", d => xGravity(d))
  //     .attr("y", height - 10)
  //     .attr("dy", "0.35em")
  //     .text(d => "Vol. " + d);

  //   const link = svg
  //     .append("g")
  //     .attr("class", "links")
  //     .selectAll("line")
  //     .data(graph.links)
  //     .enter()
  //     .append("line")
 
  //   const node = svg
  //     .append("g")
  //     .attr("class", "nodes")
  //     .selectAll("circle")
  //     .data(graph.nodes)
  //     .enter()
  //     .append("circle")
  //     .attr("r", d => nodeRadius(d.belogsToClust))
  //     .call(drag);

  //   node.append("title").text(d => d.label);

  //   forceBarSim.nodes(graph.nodes).on("tick", tick);

  //   forceBarSim.forceBar("link").links(graph.links);

  //   function tick() {
  //     graph.nodes.forEach(function(d) {
  //       // Viewport constraint.
  //       if (d.y < 0 + nodeRadius(d.w)) d.y = nodeRadius(d.w);
  //       else if (d.y > height - nodeRadius(d.w)) d.y = height - nodeRadius(d.w);

  //       // Chapter boundary constraints.
  //       if (d.x < xMin(d.belogsToClust) + nodeRadius(d.w) + 2)
  //         d.x = xMin(d.belogsToClust) + nodeRadius(d.w) + 2;
  //       else if (d.x > xMax(d.belogsToClust) - nodeRadius(d.w) - 2)
  //         d.x = xMax(d.belogsToClust) - nodeRadius(d.w) - 2;
  //     });

  //     link
  //       .attr("x1", d => d.source.x)
  //       .attr("x2", d => d.target.x)
  //       .attr("y1", d => d.source.y)
  //       .attr("y2", d => d.target.y);

  //     node.attr("cx", d => d.x).attr("cy", d => d.y);
  //   }

  //   function dragStart(d) {
  //     if (!d3.event.active) forceSim.alphaTarget(0.3).restart();
  //     d.fx = d.x;
  //     d.fy = d.y;
  //   }

  //   function dragging(d) {
  //     d.fx = d3.event.x;
  //     d.fy = d3.event.y;
  //   }

  //   function dragEnd(d) {
  //     if (!d3.event.active) forceSim.alphaTarget(0);
  //     d.fx = null;
  //     d.fy = null;
  //   }
  // }
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