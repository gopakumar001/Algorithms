/**
 * @author Gopakumar V
 * @file This code will create a tree layout using D3.js
 */
import * as d3 from "d3";
import "./TreeWidget.css";

export default class TreeWidget {

    constructor(config) {
        this._config = {
            renderTo: config.renderTo,
            height: config.renderTo.clientHeight,
            width: config.renderTo.clientWidth,
            nodeRadius: config.nodeRadius || 10,
            levelSpacing: config.levelSpacing || 30,
            data: config.data,
            margin: config.margin
        };

        if (config.data)
            this.renderUI();
    }

    updateUI(data, treeHeight) {
        if (data) {
            this._config.data = data;
            this.renderUI();
        }
    }


    renderUI() {
        this._config.renderTo.innerHTML = "";
        var elem = $(this._config.renderTo),
            nodeSize = (this._config.nodeRadius * 2) + this._config.levelSpacing,
            topOffset = (this._config.margin.top + (this._config.nodeRadius * 2)),
            svg = d3.select(this._config.renderTo).append("svg");


        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .nodeSize([nodeSize, nodeSize]);
        this._treemap = treemap;
        //  assigns the data to a hierarchy using parent-child relationships
        var hierarchy = d3.hierarchy(this._config.data);
        this._hierarchy = hierarchy;
        // maps the node data to the tree layout
        var nodes = treemap(hierarchy);
        this._nodes = nodes;


        var minX = 0,
            maxX = 0,
            svgHeight = (nodeSize * (hierarchy.height + 1));

        nodes.leaves().forEach(function (node) {
            if (node.x < minX) {
                minX = node.x;
            }
            if (node.x > maxX) {
                maxX = node.x;
            }
        });

        var svgWidth = (Math.abs(minX) + maxX) +  (2 * nodeSize),
            leftOffset = (svgWidth / 2) +  this._config.margin.left;
        svg
            .attr("height", svgHeight)
            .attr("width", svgWidth);

        var g = svg.append("g")
            .attr("transform", "translate(" + leftOffset + "," + topOffset + ")");

        this.drawLinks(nodes, g);
        this.drawNodes(nodes, g);
    }

    /**
     * Creates nodes in the tree
     */
    drawNodes(nodes, mainGrp) {
        // adds each node as a group
        var node = mainGrp.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" +
                    (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });


        // adds the circle to the node
        node.append("circle")
            .attr("r", this._config.nodeRadius);

        // adds the text to the node
        node.append("text")
            .attr("y", function (d) {
                return 4;
            })
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.value;
            });
    }

    /**
     * Create links between the nodes
     */
    drawLinks(nodes, mainGrp) {
        //Adds the links between the nodes
        var link = mainGrp.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                return "M" + d.x + "," + d.y +
                    "C" + d.x + "," + (d.y + d.parent.y) / 2 +
                    " " + d.parent.x + "," + (d.y + d.parent.y) / 2 +
                    " " + d.parent.x + "," + d.parent.y;
            });
        // .enter()
        // .append("line")
        // .attr("class", "link")
        // .attr('x1', function (d) {
        //     return d.parent.x;
        // })
        // .attr('y1', function (d) {
        //     return d.parent.y;
        // })
        // .attr('x2', function (d) {
        //     return d.x;
        // })
        // .attr('y2', function (d) {
        //     return d.y;
        // });

    }
}