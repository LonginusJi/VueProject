import * as d3 from "d3";

export default class ForceBar {
    constructor(data, width, height) {
        this.height = height;
        this.width = width;
        this.svg = d3.select('#ForceBar')
            .attr("width", width)
            .attr("height", height);

        this.initData(data);
        this.initSimulation();
        this.initDrag();
        this.plotlink();
        this.plotNode();
        this.plotLabel();
        this.plotBar();
    }

    initData(data) {
        this.data = data;
        this.nodes = this.data.nodes;
        this.links = this.data.links;
        this.clustNodes = this.data.clustNodes;
        this.volumes = d3.set(this.clustNodes.map(d => d.id)).values();

        this.xGravity = d3
            .scaleOrdinal()
            .domain(this.volumes)
            .range(
                d3
                    .range(0, this.volumes.length)
                    .map(d => this.width / (2 * this.volumes.length) + (d * this.width) / this.volumes.length)
            );

        this.xMax = d3
            .scaleOrdinal()
            .domain(this.volumes)
            .range(
                d3.range(0, this.volumes.length).map(d => ((d + 1) * this.width) / this.volumes.length)
            );

        this.xMin = d3
            .scaleOrdinal()
            .domain(this.volumes)
            .range(
                d3.range(0, this.volumes.length).map(d => (d * this.width) / this.volumes.length)
            );
    }

    initSimulation() {
        let linkForce = d3
            .forceLink()
            .id(d => d.id)
            .strength(d => {
                if (d.source.belogsToClust === d.target.belogsToClust) return 0.2;
                else
                    return Math.pow(0.3, Math.abs(+d.source.belogsToClust - +d.target.belogsToClust));
            });

        this.forceSim = d3
            .forceSimulation()
            .velocityDecay(0.2)
            .force("link", linkForce)
            .force("charge", d3.forceManyBody())
            .force(
                "forceX",
                d3.forceX()
                    .strength(0.33)
                    .x(d => this.xGravity(d.belogsToClust))
            )
            .force(
                "forceY",
                d3
                    .forceY()
                    .strength(0.15)
                    .y(this.height / 2)
            );

    }

    initDrag() {
        let forceSim = this.forceSim
        let dragStart = d => {
            if (!d3.event.active) forceSim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        let dragging = d => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        let dragEnd = d => {
            if (!d3.event.active) forceSim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        this.drag = d3
            .drag()
            .on("start", dragStart)
            .on("drag", dragging)
            .on("end", dragEnd);
    }

    plotlink() {
        this.link = this.svg
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .join('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.8);
    }

    plotNode() {
        let color = d3.scaleOrdinal(d3.schemeDark2);
        this.nodes.sort((a, b) => b.w - a.w);
        this.nodeRadius = d3.scaleSqrt()
            .domain([this.nodes[this.nodes.length - 1].w, this.nodes[0].w])
            .range([6, 10]);

        this.node = this.svg
            .append("g")
            .attr("class", "barNodes")
            .selectAll("circle")
            .data(this.nodes)
            .join("circle")
            .attr('fill', d => color(d.belogsToClust))
            .attr("r", d => this.nodeRadius(d.belogsToClust))
            .call(this.drag);
        this.node.append("title").text(d => d.label);

        this.forceSim.nodes(this.nodes).on("tick", this.tick.bind(this));
        this.forceSim.force('link').links(this.links);


    }

    tick() {
        let height = this.height;
        let xMax = this.xMax;
        let xMin = this.xMin;
        let nodeRadius = this.nodeRadius;
        let link = this.link;
        let node = this.node;

        this.nodes.forEach(d => {
            // Viewport constraint.
            if (d.y < 0 + nodeRadius(d.w)) d.y = nodeRadius(d.w);
            else if (d.y > height - nodeRadius(d.w)) d.y = height - nodeRadius(d.w);

            // Chapter boundary constraints.
            if (d.x < xMin(d.belogsToClust) + nodeRadius(d.w) + 2)
                d.x = xMin(d.belogsToClust) + nodeRadius(d.w) + 2;
            else if (d.x > xMax(d.belogsToClust) - nodeRadius(d.w) - 2)
                d.x = xMax(d.belogsToClust) - nodeRadius(d.w) - 2;
        });

        link
            .attr("x1", d => d.source.x)
            .attr("x2", d => d.target.x)
            .attr("y1", d => d.source.y)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }

    plotLabel() {
        this.svg
            .append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(this.volumes)
            .join("text")
            .attr("x", d => this.xGravity(d))
            .attr("y", this.height - 10)
            .attr("dy", "0.35em")
            .attr('font-size', 14)
            .attr('font-family', 'Times New Roman')
            .attr('text-anchor', 'middle')
            .text(d => "Vol. " + d);
    }

    plotBar() {
        this.svg
            .append("g")
            .attr("class", "bars")
            .selectAll("line")
            .data(this.volumes.slice(0, this.volumes.length - 1))
            .join("line")
            .attr("x1", d => this.xMax(d))
            .attr("y1", 0)
            .attr("x2", d => this.xMax(d))
            .attr("y2", this.height)
            .attr('stroke', '#333')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '10,10');
    }
}