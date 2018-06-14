/**
 * @author Gopakumar V
 * @file Node for BST.
 */

import Node from "./Node";

const LEFT = 0;
const RIGHT = 1;

export default class BSTNode extends Node {

    constructor(value) {
        super(value);
        this._childrens = [null, null];
    }

    setLeftNode(node) {
        this._childrens[LEFT] = node;
    }

    getLeftNode() {
        return this._childrens[LEFT];
    }

    setRightNode(node) {
        this._childrens[RIGHT] = node;
    }

    getRightNode() {
        return this._childrens[RIGHT];
    }

    toJson() {
        var nodeJson = super.toJson();
        nodeJson.children = [];
        this._childrens.forEach(function(node, i){
            if(node) {
                nodeJson.children.push(node.toJson());
            }
        });
        return nodeJson;
    }
}
