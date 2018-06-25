/**
 * @author Gopakumar V
 * @file Red black tree.
 */

import { colors, RBNode } from "../RedBlackTree/RBNode";
import Tree from "../Tree";

export default class RBTree extends Tree {

    insert(value) {
        var node = new RBNode(value);
        node.setColor(colors.RED);
        this._root = this._insertNode(this._root, node);
    }

    _insertNode(node, newNode) {

        if (node == null) {
            return newNode;
        }

        if (newNode.getValue() < node.getValue()) {
            node.setLeftNode(this._insertNode(node.getLeftNode(), newNode));
        } else {
            node.setRightNode(this._insertNode(node.getRightNode(), newNode));
        }

        return node;
    }
}