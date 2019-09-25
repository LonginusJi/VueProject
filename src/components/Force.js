import * as d3 from "d3";

export default class ForceBar {
    constructor(data, width, height) {
        const volumes = d3.set(data.clustNodes.map(d => d.id)).values();
        this.height = height;
        this.width = width;
        const nodeRadius = d3.scaleSqrt().range([6, 10]);


        this.xGravity = d3
            .scaleOrdinal()
            .domain(volumes)
            .range(
                d3
                    .range(0, volumes.length)
                    .map(d => width / (2 * volumes.length) + (d * width) / volumes.length)
            );

        const xMin = d3
            .scaleOrdinal()
            .domain(volumes)
            .range(
                d3.range(0, volumes.length).map(d => (d * width) / volumes.length)
            );

        const xMax = d3
            .scaleOrdinal()
            .domain(volumes)
            .range(
                d3.range(0, volumes.length).map(d => ((d + 1) * width) / volumes.length)
            );

        const drag = d3
            .drag()
            .on("start", dragStart)
            .on("drag", dragging)
            .on("end", dragEnd);

        const svg = d3
            .select("svg")
            .attr("width", width)
            .attr("height", height);

        this.initSimulation()

        // Make sure small nodes are drawn on top of larger nodes
        // use d.w as the radius of the circle

        data.nodes.sort(function (a, b) {
            return b.w - a.w;
        });
        //
        nodeRadius.domain([
            data.nodes[data.nodes.length - 1].w,
            data.nodes[0].w
        ]);

        // linkWidth.domain(d3.extent(data.links, function(d) {
        // 	return d.chapters.length;
        // }));

        // data.nodes.forEach(function(d) {
        // 	d.x = xGravity(d.firstVolume) + width * (Math.random() - 0.5);
        // 	d.y = height * (Math.random() - 0.5);
        // });

        const bars = svg
            .append("g")
            .attr("class", "bars")
            .selectAll("line")
            .data(volumes.slice(0, volumes.length - 1))
            .enter()
            .append("line")
            .attr("x1", d => xMax(d))
            .attr("y1", 0)
            .attr("x2", d => xMax(d))
            .attr("y2", height);

        const labels = svg
            .append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(volumes)
            .enter()
            .append("text")
            .attr("x", d => this.xGravity(d))
            .attr("y", height - 10)
            .attr("dy", "0.35em")
            .text(d => "Vol. " + d);

        const link = svg
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")

        const node = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", d => nodeRadius(d.belogsToClust))
            .call(drag);

        node.append("title").text(d => d.label);

        this.forceSim.nodes(data.nodes).on("tick", tick);

        this.forceSim.force("link").links(data.links);

        function tick() {
            data.nodes.forEach(function (d) {
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

            node.attr("cx", d => d.x).attr("cy", d => d.y);
        }

        function dragStart(d) {
            if (!d3.event.active) this.forceSim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragging(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnd(d) {
            if (!d3.event.active) this.forceSim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }



    }
    initSimulation() {
        const linkForce = d3
            .forceLink()
            .id(d => d.id)
            .strength(function (d) {
                if (d.source.belogsToClust === d.target.belogsToClust) return 0.2;
                else
                    return Math.pow(
                        0.3,
                        Math.abs(+d.source.belogsToClust - +d.target.belogsToClust)
                    );
            });

        this.forceSim = d3
            .forceSimulation()
            .velocityDecay(0.2)
            .force("link", linkForce)
            .force("charge", d3.forceManyBody())
            .force(
                "forceX",
                d3
                    .forceX()
                    .strength(0.33)
                    .x(d => this.xGravity(d.belogsToClust))
            )
            .force(
                "forceY",
                d3
                    .forceY()
                    .strength(0.15)
                    .y(this.height / 2
                    )
            );
    }
}