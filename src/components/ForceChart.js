import * as d3 from "d3";

export default class ForceChart {
    constructor(graph, width, height) {
        this.svg = d3.select("#ForceChart")
            .attr("width", width)
            .attr("height", height);
        this.width = width;
        this.height = height;

        this.initData(graph);
        this.initSimulation();
        this.initDrag();
        this.plotLink();
        this.plotNode();
        this.plotText();
    }

    initData(graph) {
        this.graph = graph;
        this.links = this.graph.links;
        this.nodes = this.graph.nodes;
    }

    initSimulation() {
        this.simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    }

    initDrag() {
        let simulation = this.simulation

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

        this.drag = d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }

    plotNode() {
        let color = d3.scaleOrdinal(d3.schemeSet1);
        this.node = this.svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(this.nodes)
            .join("g")
        this.node
            .append('circle')
            .attr("r", 5)
            .attr("fill", d => color(d.group))
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .call(this.drag);

        this.simulation.nodes(this.nodes).on("tick", this.ticked.bind(this));
        this.simulation
            .force("link")
            .links(this.links)
            .distance(d => d.value * 20);
    }

    plotLink() {
        this.link = this.svg
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .join("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            // .attr('opacity',0)
            .attr("stroke-width", d => Math.sqrt(d.value));
    }

    plotText() {
        this.node
            .append("text")
            .text(d => d.id)
            .attr("x", 6)
            .attr("y", 3)
            .style("font-size", 12)
            .style("font-family", "Times New Roman");
        this.node
            .append("title")
            .text(d => d.id);
    }

    ticked() {
        this.link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        this.node.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    }
}