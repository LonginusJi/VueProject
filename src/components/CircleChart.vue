<template>
  <div id="my_dataviz" style="display:block; margin:auto"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  mounted() {
    var width = 600;
    var height = 450;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    //Read the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv"
    ).then(data => {
      data.forEach(d => {
        d.gdpPercap = +d.gdpPercap;
        d.pop = +d.pop;
      });
      data.sort(
        (a, b) => d3.descending(a.pop, b.pop) //DEscending
      );
      var newData = [];
      for (var i = 0; i <= 9; i++) {
        newData.push(data[i]);
      }
      data = newData;
      // ---------------------------//
      //       AXIS  AND SCALE      //
      // ---------------------------//

      // Add X axis
      var x = d3
        .scaleLinear()
        .domain([0, 45000])
        .range([0, width]);
      // svg
      //   .append("g")
      //   // .attr("transform", "translate(0," + height + ")")
      //   .attr("transform", "translate(0,1000)")
      //   .call(d3.axisBottom(x).ticks(3));

      // Add X axis label:
      // svg
      //   .append("text")
      //   .attr("text-anchor", "end")
      //   .attr("x", width)
      //   .attr("y", height + 50);
      // // F;.text("Gdp per Capita");

      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([35, 90])
        .range([height, 0]);

      // svg
      //   .append("g")
      //   .call(d3.axisLeft(y))
      //   .attr("transform", "translate(0,1000)");

      // Add Y axis label:
      // svg
      //   .append("text")
      //   .attr("text-anchor", "end")
      //   .attr("x", 0)
      //   .attr("y", -20)
      //   // .text("Life expectancy")
      //   .attr("text-anchor", "start");

      // Add a scale for bubble size
      var z = d3
        .scaleSqrt()
        .domain([200000, 1310000000])
        .range([2, 30]);

      // Add a scale for bubble color
      var myColor = d3
        .scaleOrdinal()
        .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
        .range(["red", "blue", "green", "purple", "orange"]);

      // ---------------------------//
      //      TOOLTIP               //
      // ---------------------------//

      // -1- Create a tooltip div that is hidden by default:
      var tooltip = d3
        .select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .attr("align", "center")
        .style("padding", "10px")
        .style("color", "white");

      // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
      var showTooltip = d => {
        tooltip.transition().duration(200);
        tooltip
          .style("opacity", 1)
          .html("Country: " + d.country)
          .style("left", d3.mouse(this)[0] + 30 + "px")
          .style("top", d3.mouse(this)[1] + 30 + "px");
      };
      var moveTooltip = () => {
        tooltip
          .style("left", d3.mouse(this)[0] + 30 + "px")
          .style("top", d3.mouse(this)[1] + 30 + "px");
      };
      var hideTooltip = () => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
      };

      // ---------------------------//
      //       HIGHLIGHT GROUP      //
      // ---------------------------//

      // What to do when one group is hovered
      var highlight = d => {
        // reduce opacity of all groups
        d3.selectAll(".bubbles").style("opacity", 0.05);
        // expect the one that is hovered
        d3.selectAll("." + d).style("opacity", 1);
      };

      // And when it is not hovered anymore
      var noHighlight = () => {
        d3.selectAll(".bubbles").style("opacity", 1);
      };

      // ---------------------------//
      //       CIRCLES              //
      // ---------------------------//

      // Add dots
      var angleNum = data.length - 1;
      var angle = (2 * Math.PI) / angleNum;
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("id", d => d.country)
        .attr("class", d => "bubbles " + d.continent)
        // .transition().duration(2000).ease(d3.easeLinear)
        .attr("cx", (d, i) => Math.cos(angle * i) * 10 * z(d.pop) + width / 2)
        .attr("cy", (d, i) => Math.sin(angle * i) * 10 * z(d.pop) + height / 2)
        .attr("r", d => z(d.pop))
        .style("fill", d => myColor(d.continent))
        // -3- Trigger the functions for hover
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .selectAll("circle")
        // .distance(d => d.pop * 20)
        .attr("transform", (d, i) => "translate(0," + 550 * i + ")");

      data.splice(0, 1);
      svg
        .append("g")
        .attr("class", "links")
        .selectAll(".links")
        .data(data)
        .join("line")
        .style("stroke-dasharray", "5,5")
        .style("stroke-opacity", 0.4)
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr(
          "x2",
          (d, i) => Math.cos(angle * (i + 1)) * 9 * z(d.pop) + width / 2
        )
        .attr(
          "y2",
          (d, i) => Math.sin(angle * (i + 1)) * 9 * z(d.pop) + height / 2
        );

      d3.select("#China")
        .attr("cx", width / 2)
        .attr("cy", height / 2);

      // console.log(data);
      // ---------------------------//
      //       LEGEND              //
      // ---------------------------//

      // Add legend: circles
      var valuesToShow = [10000000, 100000000, 1000000000];
      var xCircle = 490;
      var xLabel = 540;
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .join("circle")
        .attr("cx", xCircle)
        .attr("cy", d => height - 160 - z(d))
        .attr("r", d => z(d))
        .style("fill", "none")
        .attr("stroke", "black");

      // Add legend: segments
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .join("line")
        .attr("x1", d => xCircle + z(d))
        .attr("x2", xLabel)
        .attr("y1", d => height - 160 - z(d))
        .attr("y2", d => height - 160 - z(d))
        .attr("stroke", "black")
        .style("stroke-dasharray", "2,2");

      // Add legend: labels
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .join("text")
        .attr("x", xLabel)
        .attr("y", d => height - 160 - z(d))
        .text(d => d / 1000000)
        .style("font-size", 10)
        .attr("alignment-baseline", "middle");

      // Legend title
      svg
        .append("text")
        .attr("x", xCircle)
        .attr("y", height - 160 + 30)
        .text("Population (M)")
        .attr("text-anchor", "middle");

      // Add one dot in the legend for each name.
      var size = 20;
      var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"];
      svg
        .selectAll("myrect")
        .data(allgroups)
        .join("circle")
        .attr("cx", 490)
        .attr("cy", (d, i) => 50 + i * (size + 5)) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", d => myColor(d))
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);

      // Add labels beside legend dots
      svg
        .selectAll("mylabels")
        .data(allgroups)
        .join("text")
        .attr("x", 490 + size * 0.8)
        .attr("y", (d, i) => i * (size + 5) + 40 + size / 2) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", d => myColor(d))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);
    });
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