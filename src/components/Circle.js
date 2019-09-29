import * as d3 from "d3";
export default class CircleChart {
    constructor(data) {
        // set the dimensions and margins of the graph
        let margin = {
            top: 40,
            right: 150,
            bottom: 60,
            left: 30
        };
        this.width = 600 - margin.left - margin.right;
        this.height = 500 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        this.svg = d3
            .select("#CircleChart")
            .append("svg")
            .attr("width", this.width + margin.left + margin.right)
            .attr("height", this.height + margin.top + margin.bottom)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.initData(data)
        this.initLegend_pop()
        this.initLegend_country()
        this.initTooltip()
        this.plotLinks()
        this.plotCircles()
    }

    initData(data) {
        data.sort((a, b) => (d3.descending(a.pop, b.pop))); //DEscending 
        let newData = [];
        for (let i = 0; i <= 9; i++) {
            newData.push(data[i]);
        }
        this.data = newData;
        let angleNum = this.data.length - 1;
        this.angle = (2 * Math.PI) / angleNum;
        this.linkData = this.data.slice(1);

        // Add a scale for bubble size
        this.radius = d3
            .scaleSqrt()
            .domain([200000, 1310000000])
            .range([2, 30]);
        // Add a scale for bubble color
        this.myColor = d3
            .scaleOrdinal()
            .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
            .range(d3.schemeSet1);
    }
    // ---------------------------//
    //      TOOLTIP               //
    // ---------------------------//
    initTooltip() {
        // -1- Create a tooltip div that is hidden by default:
        let tooltip = d3
            .select("#CircleChart")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("color", "white");

        // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
        this.showTooltip = d => (
            tooltip
                .style("opacity", 1)
                .html("Country: " + d.country + ", Continent: " + d.continent + ", Population: " + d.pop / 1000000 + "M")
            // .style("left", d3.mouse(this)[0] + 30 + "px")
            // .style("top", d3.mouse(this)[1] + 30 + "px");
        );
        // let moveTooltip = function (d) {
        //     tooltip
        //         .style("left", d3.mouse(this)[0] + 30 + "px")
        //         .style("top", d3.mouse(this)[1] + 30 + "px");
        // };
        this.hideTooltip = () => (
            tooltip.style("opacity", 0)
        );
    }
    // ---------------------------//    
    //       LEGEND              //
    // ---------------------------//
    initLegend_pop() {
        // Add legend: circles
        let valuesToShow = [10000000, 100000000, 1000000000];
        let xCircle = 490;
        let xLabel = 540;
        const legend_pop = this.svg
            .append('g')
            .attr('class', 'legend_pop')

        legend_pop.selectAll("legend")
            .data(valuesToShow)
            .join("circle")
            .attr("cx", xCircle)
            .attr("cy", d => (this.height - 150 - this.radius(d)))
            .attr("r", d => this.radius(d))
            .style("fill", "none")
            .attr("stroke", "black");

        // Add legend: segments
        legend_pop
            .selectAll("legend")
            .data(valuesToShow)
            .join("line")
            .attr("x1", d => (xCircle + this.radius(d)))
            .attr("x2", xLabel)
            .attr("y1", d => (this.height - 150 - this.radius(d)))
            .attr("y2", d => (this.height - 150 - this.radius(d)))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "2,2");

        // Add legend: labels
        legend_pop
            .selectAll("legend")
            .data(valuesToShow)
            .join("text")
            .attr("x", xLabel)
            .attr("y", d => (this.height - 150 - this.radius(d)))
            .text(d => d / 1000000)
            .style("font-size", 10)
            .attr("alignment-baseline", "middle");

        // Legend title
        legend_pop
            .append("text")
            .attr("x", xCircle)
            .attr("y", this.height - 150 + 30)
            .text("Population (M)")
            .style('font-size', 14)
            .attr("text-anchor", "middle");
    }
    initLegend_country() {
        // ---------------------------//
        //       HIGHLIGHT GROUP      //
        // ---------------------------//

        // What to do when one group is hovered
        let highlight = d => {
            // reduce opacity of all groups
            d3.selectAll(".bubbles").style("opacity", 0.1);
            // expect the one that is hovered
            d3.selectAll("." + d).style("opacity", 1);
        };
        // And when it is not hovered anymore
        let noHighlight = () => {
            d3.selectAll(".bubbles").style("opacity", 1);
        };

        // Add one dot in the legend for each name
        let distance = 25;
        let allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"];

        const legend_country = this.svg.append('g')
            .attr('class', 'legend_country')

        legend_country.selectAll("myrect")
            .data(allgroups)
            .join("circle")
            .attr("cx", 490)
            .attr("cy", (d, i) => (20 + i * (distance + 5))) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", d => this.myColor(d))
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight);

        // Add labels beside legend dots
        legend_country
            .selectAll("mylabels")
            .data(allgroups)
            .join("text")
            .attr("x", 490 + distance * 0.8)
            .attr("y", (d, i) => (i * (distance + 5) + distance / 2 + 10)) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", d => this.myColor(d))
            .text(d => d)
            .attr("text-anchor", "left")
            .style('font-size', 14)
            .style("alignment-baseline", "middle")
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight);
    }
    // ---------------------------//
    //       CIRCLES              //
    // ---------------------------//
    plotCircles() {
        // Add circles
        this.svg
            .append("g")
            .attr("class", "circles")
            .selectAll("circle")
            .data(this.data)
            .join("circle")
            .attr("id", d => d.country)
            .attr("class", d => ("bubbles " + d.continent))
            .attr("cx", (d, i) => (Math.cos(this.angle * i) * 10 * this.radius(d.pop) + this.width / 2))
            .attr("cy", (d, i) => (Math.sin(this.angle * i) * 10 * this.radius(d.pop) + this.height / 2))
            .attr("r", d => this.radius(d.pop))
            .style("fill", d => this.myColor(d.continent))
            // -3- Trigger the functions for hover
            .on("mouseover", this.showTooltip)
            // .on("mousemove", moveTooltip)
            .on("mouseleave", this.hideTooltip)
            .selectAll("circle")
            // .distance(d => d.pop * 20)
            .attr("transform", (d, i) => ("translate(0," + 550 * i + ")"));

        d3.select("#China")
            .attr("cx", this.width / 2)
            .attr("cy", this.height / 2);
    }
    // ---------------------------//
    //         LINKS              //
    // ---------------------------//
    plotLinks() {
        this.svg
            .append("g")
            .attr("class", "links")
            .selectAll(".links")
            .data(this.linkData)
            .join("line")
            .attr("x1", this.width / 2)
            .attr("y1", this.height / 2)
            .attr("x2", (d, i) => (Math.cos(this.angle * (i + 1)) * 9 * this.radius(d.pop) + this.width / 2))
            .attr("y2", (d, i) => (Math.sin(this.angle * (i + 1)) * 9 * this.radius(d.pop) + this.height / 2))
            .attr('stroke', '#999')
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', ('5, 5'));
    }
}