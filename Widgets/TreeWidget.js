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
            nodeSpacing: config.nodeSpacing || 100,
            data: config.data,
            treeLevel: 2,
            maxLeafNode: 4,
            margin: config.margin
        };
        this.renderUI();
    }

    getTreeHeight() {
        return this._config.treeLevel * this._config.levelSpacing;
    }

    getTreeWidth() {
        return this._config.maxLeafNode * this._config.nodeSpacing;
    }

    renderUI() {
        var width = this._config.width - this._config.margin.left - this._config.margin.right,
            height = this._config.height - this._config.margin.top - this._config.margin.bottom,
            svg = d3.select(this._config.renderTo).append("svg")
            .attr("width", width)
            .attr("height", height),
            g = svg.append("g")
            .attr("transform",
                "translate(-" + (this._config.margin.left + this._config.nodeRadius) + "," + (this._config.margin.top + this._config.nodeRadius) + ")");

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([this.getTreeWidth(), this.getTreeHeight()]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(this._config.data);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

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
                return d.data.name;
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