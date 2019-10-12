<template>
  <div>
    <svg>
      <defs>
        <filter id="saturate-around-path">
          <feGaussianBlur result="blured" in="SourceAlpha" stdDeviation="5" />
          <feColorMatrix
            result="remove-pixels-to-far-from-path"
            in="blured"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.5"
          />
          <feGaussianBlur result="blured2" in="remove-pixels-to-far-from-path" stdDeviation="10" />
          <feComposite result="composed" in="SourceGraphic" in2="blured2" operator="in" />
        </filter>
      </defs>
    </svg>
    <div id="options-absoluter">
      <div id="options-relativer">
        <div id="options">
          <div id="drag-opton" class="option">Click and drag to make your own path.</div>
          <div class="options-separator"></div>
          <div id="predef-pathes-option">
            Or choose among predefined pathes
            <br />
          </div>
          <div class="options-separator"></div>
          <div id="input-option" class="option">
            <div id="input-option-text">
              Or write a (valid) SVG.path.d as below
              <br />
            </div>
            <input type="text" id="letters" value="M100,100v300h760v-300z" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  mounted() {
    var width = 960,
      halfWidth = width / 2,
      height = 500,
      halfHeight = height / 2,
      _2PI = 2 * Math.PI,
      halfPI = Math.PI / 2,
      LOW_SPEED = 2000,
      HIGH_SPEED = 1000;

    var sampling = 10, //lower values for smaller cells, at cost of performance
      squaredSampling = Math.pow(sampling, 2),
      maxSpread = 20, //max distance of voronoi seeds from path
      squaredMaxSpread = Math.pow(maxSpread, 2);

    var normalDistrib = d3.randomNormal(0, 0.8); //spread voronoi seeds not far away

    var pathLiner = d3.line().curve(d3.curveLinear);

    var cellLiner = d3.line().curve(d3.curveLinearClosed); //good looking result with d3.curveBasisClosed, and artistic result with d3.curveStep

    var strokeOpacityScale = d3
      .scaleLinear()
      .domain([0, 2 * maxSpread])
      .range([1, 0]);

    var predefPathes, pathData, voronoiSeedConstraints, voronoiSeeds;
    initData();

    var drawnPath, voronoiLayer;
    initLayout();

    var xAccessor = d => d.x;
    var yAccessor = d => d.y;
    var voronoi = d3
      .voronoi()
      .x(xAccessor)
      .y(yAccessor)
      .extent([[0, 0], [width, height]]);

    var input = d3
      .select("input")
      .on("click", function() {
        this.value = "M100,100v300h760v-300z";
        inputed();
      })
      .on("input", function() {
        inputed();
      });

    //first render
    updateVoronoi(LOW_SPEED);

    ///////////
    //  Init //
    ///////////

    function initData() {
      pathData = [];
      voronoiSeedConstraints = [];
      voronoiSeeds = [];
    }

    function initLayout() {
      var svg = d3
        .select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "playground")
        .call(
          d3
            .drag()
            .container(function(d) {
              return this;
            })
            .subject(function(d) {
              var p = [d3.event.x, d3.event.y];
              return [p, p];
            })
            .on("start", dragStarted)
            .on("drag", dragging)
        );

      const lineData = [
        {
          x1: 0,
          y1: 0,
          x2: width,
          y2: 0
        },
        {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: height
        },
        {
          x1: width,
          y1: 0,
          x2: width,
          y2: height
        },
        {
          x1: 0,
          y1: height,
          x2: width,
          y2: height
        }
      ];

      svg
        .append("g")
        .attr("class", "edging")
        .selectAll("line")
        .data(lineData)
        .enter()
        .append("line")
        .attr("x1", d => d.x1)
        .attr("y1", d => d.y1)
        .attr("x2", d => d.x2)
        .attr("y2", d => d.y2)
        .attr("stroke", "black");

      var drawingArea = svg.append("g").attr("id", "drawing-area");

      drawnPath = drawingArea
        .append("path")
        .attr("id", "drawn-path")
        .attr("d", infinityPath());

      voronoiLayer = drawingArea.append("g").attr("id", "voronoi-layer");

      var predefPathes = getPredefPathes();

      var predefPathesSvg = d3
        .select("#predef-pathes-option")
        .append("svg")
        .attr("width", (predefPathes.length + 2) * 30) //+2 for 'space' and '?'
        .attr("height", 20);

      //begin: draw predef pathes
      predefPathesSvg
        .selectAll(".predef-path")
        .data(predefPathes)
        .enter()
        .append("path")
        .classed("predef-path", true)
        .attr("d", d => d)
        .attr(
          "transform",
          (d, i) => "translate(" + [10 + i * 30, 5] + ")scale(0.025)"
        )
        .on("click", predefPathClicked);

      predefPathesSvg
        .append("text")
        .text("?")
        .attr("x", 10 + (predefPathes.length + 1) * 30) //+1 for space between pathes and '?'
        .attr("y", 15)
        .on("click", makeRandomPath);
      //end: draw predef pathes
    }

    ///////////////////////
    //  User interaction //
    ///////////////////////

    function dragStarted() {
      input.node().value =
        "M100,100v300h760v-300z";
      pathData = [];
      voronoiSeedConstraints = [];
      voronoiSeeds = [];

      voronoiLayer.selectAll(".cell").remove();
    }

    function dragging() {
      var d = d3.event.subject,
        x0 = d3.event.x,
        y0 = d3.event.y;

      d3.event.on("drag", () => {
        var mx = maxSpread,
          x1 = d3.event.x,
          y1 = d3.event.y,
          dx = x1 - x0,
          dy = y1 - y0;

        if (x1 < mx || x1 > width - mx || y1 < mx || y1 > height - mx) {
          return;
        }

        if (dx * dx + dy * dy > squaredSampling) {
          pathData.push([(x0 = x1), (y0 = y1)]);
          drawnPath.attr("d", pathLiner(pathData));
          updateVoronoi(HIGH_SPEED);
        }
      });
    }

    function predefPathClicked(d, i) {
      input.node().value =
        "M100,100v300h760v-300z";
      initData();
      voronoiLayer.selectAll(".cell").remove();

      drawnPath.attr("d", d);

      updateVoronoi(LOW_SPEED);
    }

    function makeRandomPath() {
      var mx = maxSpread,
        randomWidth = width - 2 * mx,
        randomHeight = height - 2 * mx,
        path = "";
      var segmentCount,
        cps,
        cp,
        prevCp,
        prevPrevCp,
        v0,
        v1,
        squaredDist,
        angle,
        cpFound;

      input.node().value =
        "M100,100v300h760v-300z";
      initData();
      voronoiLayer.selectAll(".cell").remove();

      segmentCount = Math.floor(1 + 2 * Math.random());
      d3.range(segmentCount).forEach(function() {
        cps = [];
        v0 = [];
        v1 = [];
        d3.range(8 / segmentCount).forEach(function(i) {
          cpFound = false;
          while (!cpFound) {
            cp = [
              mx + randomWidth * Math.random(),
              mx + randomHeight * Math.random()
            ];
            prevCp = cps[i - 1];
            prevPrevCp = cps[i - 2];
            if (prevCp === undefined) {
              cpFound = true;
            } else {
              v0[0] = cp[0] - prevCp[0];
              v0[1] = cp[1] - prevCp[1];
              squaredDist = Math.pow(v0[0], 2) + Math.pow(v0[1], 2);
              if (squaredDist > squaredMaxSpread) {
                //cp far enought form prevCp
                if (prevPrevCp === undefined) {
                  cpFound = true;
                } else {
                  v1[0] = prevPrevCp[0] - prevCp[0];
                  v1[1] = prevPrevCp[1] - prevCp[1];
                  angle = Math.atan2(v1[1], v1[0]) - Math.atan2(v0[1], v0[0]);
                  if (Math.abs(angle) > _2PI / 18) {
                    //not a back and forth, angle<20°
                    cpFound = true;
                  }
                }
              }
            }
          }
          cps.push(cp);
        });
        path += d3.line().curve(d3.curveBasis)(cps);
      });
      drawnPath.attr("d", path);

      updateVoronoi(LOW_SPEED);
    }

    function inputed() {
      initData();
      voronoiLayer.selectAll(".cell").remove();

      drawnPath.attr("d", input.node().value);

      updateVoronoi(LOW_SPEED);
    }

    /////////////////////
    //  Main algorithm //
    /////////////////////

    function updateVoronoi(speed) {
      updateVoronoiConstraints();
      redrawVoronoi(speed);
    }

    function updateVoronoiConstraints() {
      var pathNode = drawnPath.node(),
        pathLength = drawnPath.node().getTotalLength(),
        length = voronoiSeedConstraints.length * sampling;
      var point0,
        point1,
        midX,
        midY,
        spread,
        pathDist,
        dx,
        dy,
        dist,
        tangentAngle,
        spreadCoef,
        strokeColor;

      point1 = pathNode.getPointAtLength(length);

      //begin: compute path-based constraints for Voronoï seeds
      for (length += sampling; length <= pathLength; length += sampling) {
        point0 = point1;
        point1 = pathNode.getPointAtLength(length);
        midX = (point0.x + point1.x) / 2;
        midY = (point0.y + point1.y) / 2;
        spread = maxSpread;

        //begin: limit spread of too closed path's portions
        voronoiSeedConstraints.forEach(function(sc) {
          if (length - sc.length > maxSpread) {
            //skip too adjacent path's portions
            dx = midX - sc.x;
            dy = midY - sc.y;
            dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 2;
            if (dist < sc.spread) {
              sc.spread = dist;
              spread = Math.min(dist, spread);
            }
          }
        });
        //end: limit spread of too closed path's portions

        dx = point1.x - point0.x;
        dy = point1.y - point0.y;
        tangentAngle = Math.atan2(dy, dx);
        spreadCoef = Math.min(2, Math.abs(normalDistrib()));
        strokeColor = d3.hsl((length / 2) % 360, 1, 0.45);
        tangentAngle += Math.PI / 2;
        voronoiSeedConstraints.push({
          length: length,
          x: midX,
          y: midY,
          angle: tangentAngle,
          cos: Math.cos(tangentAngle),
          sin: Math.sin(tangentAngle),
          strokeColor: strokeColor,
          spreadCoef: spreadCoef,
          spread: spread
        });
      }
      //end: compute path-based constraints for Voronoï seeds
    }

    function redrawVoronoi(speed) {
      var spread, strokeOpacity, dx, dy;

      speed = speed || LOW_SPEED;

      //begin: compute Voronoï seeds, more or less close to the path
      voronoiSeeds = [];
      voronoiSeedConstraints.forEach(function(sc) {
        spread = sc.spread * sc.spreadCoef;
        strokeOpacity = strokeOpacityScale(spread);
        dx = spread * sc.cos;
        dy = spread * sc.sin;
        voronoiSeeds.push({
          x: sc.x + dx,
          y: sc.y + dy,
          strokeOpacity: strokeOpacity,
          strokeColor: sc.strokeColor
        });
        //add a seed which symetric wrt. the path
        voronoiSeeds.push({
          x: sc.x - dx,
          y: sc.y - dy,
          strokeOpacity: strokeOpacity,
          strokeColor: sc.strokeColor
        });
      });
      //end: compute Voronoï seeds, more or less close to the path

      //begin: draw Voronoï cells
      var limitedCells = voronoi(voronoiSeeds).polygons();
      var drawnCells = voronoiLayer.selectAll(".cell").data(limitedCells);
      drawnCells = drawnCells
        .enter()
        .append("path")
        .classed("cell", true)
        .style("stroke-opacity", function(d) {
          return d ? d.data.strokeOpacity : 0;
        })
        .style("stroke", function(d) {
          return d ? d.data.strokeColor : "white";
        })
        .attr("transform", function(d) {
          return (
            "translate(" +
            [50 * (Math.random() - 0.5), 50 * (Math.random() - 0.5)] +
            ")"
          );
        })
        .merge(drawnCells);
      drawnCells
        .attr("d", cellLiner)
        .transition()
        .duration(speed)
        .ease(d3.easeCircleOut)
        .attr("transform", "translate(0,0)");
      //end: draw Voronoï cells
    }

    ////////////////////
    //  Block utility //
    ////////////////////

    function getPredefPathes() {
      var rect = "M100,100v300h760v-300z";
      var circle = "M330,250a120,120 0 1,0 240,0a120,120 0 1,0 -240,0";
      var plus = "M480,100v300M100,250h760";
      var cross = "M130,130L830,370M130,370L830,130";
      var star = starPath();
      var infinity = infinityPath();

      return [rect, circle, plus, cross, star, infinity];
    }

    function infinityPath() {
      return (
        d3.line().curve(d3.curveBasisClosed)([
          [150, 0],
          [810, 500],
          [810, 0],
          [150, 500]
        ]) + "z"
      );
    }

    function starPath() {
      var size = 350,
        twoFifthAngle = (_2PI / 5) * 2;
      var angle, cps;

      cps = d3.range(5).map(function(i) {
        angle = -halfPI + i * twoFifthAngle;
        return [
          size * Math.cos(angle) + halfWidth,
          size * Math.sin(angle) + halfHeight
        ];
      });

      return d3.line().curve(d3.curveBasisClosed)(cps) + "z";
    }
  }
};
</script>

<style>
#playground {
  display: block;
  margin: 5% auto;
}

#options-absoluter {
  width: 100%;
  position: absolute;
  bottom: 100px;
}

#options-relativer {
  position: relative;
}

#options {
  width: 960px;
  display: flex;
  margin: auto;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  color: lightgrey;
  background-color: white;
}

.options-separator {
  height: 10px;
  border: 1px solid lightgrey;
}

input {
  /* color: lightgrey; */
  /* width: 400px; */
  text-align: start;
}

#drawing-area {
  filter: url("#saturate-around-path");
}

#drawn-path {
  fill: none;
  stroke-linecap: round;
  stroke: white;
  stroke-width: 20px;
}

.cell {
  fill: none;
  stroke: cyan;
}

#predef-pathes-option path {
  cursor: pointer;
  fill: transparent;
  stroke: lightgrey;
  stroke-width: 50px;
}

#predef-pathes-option text {
  cursor: pointer;
  fill: lightgrey;
}
</style>