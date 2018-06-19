/**
 * @author Gopakumar V
 * @file AVL Tree widget
 */
import AVLNode from "./AVLNode";
import Tree from "../Tree";

export default class AVLTree extends Tree {

    createNode(value) {
        return new AVLNode(value);
    }

    getHeight(node) {
        return node == null ? -1 : node.getHeight();
    }

    getBalance(node) {

        if (node == null)
            return 0;

        return this.getHeight(node.getLeftNode()) - this.getHeight(node.getRightNode());
    }

    _updateHeight(node) {
        var leftTreeHt = this.getHeight(node.getLeftNode()),
            rightTreeHt = this.getHeight(node.getRightNode());

        node.setHeight(Math.max(leftTreeHt, rightTreeHt) + 1);
    }

    rotateLeft(node) {
        var tempRightNode = node.getRightNode(),
            t = tempRightNode.getLeftNode();

        tempRightNode.setLeftNode(node);
        node.setRightNode(t);

        this._updateHeight(node);
        this._updateHeight(tempRightNode);

        return tempRightNode;
    }

    rotateRight(node) {
        var tempLeftNode = node.getLeftNode(),
            t = tempLeftNode.getRightNode();
        tempLeftNode.setRightNode(node);
        node.setLeftNode(t);

        this._updateHeight(node);
        this._updateHeight(tempLeftNode);

        return tempLeftNode;
    }

    insert(value) {
        this._root = this._insert(this._root, value);
    }

    _insert(node, value) {
        if (node == null) return this.createNode(value);

        if (value < node.getValue()) {
            node.setLeftNode(this._insert(node.getLeftNode(), value));
        } else {
            node.setRightNode(this._insert(node.getRightNode(), value));
        }

        this._updateHeight(node);
        node = this._handleHeightVoliation(node, value);
        return node;
    }

    /**
     * We need to handle 4 scenarios here
     *      1 : Left Left scenario
     *      2 : Left Right scenario
     *      3 : Right Right scenario
     *      4 : Right Left scenario 
     */
    _handleHeightVoliation(node, value) {
        var balance = this.getBalance(node);
        //case 1 & 2
        if (balance > 1) {
            var leftNode = node.getLeftNode();
            //1: Left Left scenario.
            if (value < leftNode.getValue()) {
                return this.rotateRight(node);
            }
            //2: Left Right scenario.
            else if (value > leftNode.getValue()) {
                node.setLeftNode(this.rotateLeft(leftNode));
                return this.rotateRight(node);
            }
        }

        //Case 2 & 3
        if (balance < -1) {
            var rightNode = node.getRightNode();

            //1 : Right Right scenario
            if (value > rightNode.getValue()) {
                return this.rotateLeft(node);
            }
            //2: Right Left scenario
            if (value < rightNode.getValue()) {
                node.setRightNode(this.rotateRight(rightNode));
                return this.rotateLeft(node);
            }
        }

        return node;
    }

    delete(value) {
        this._root = this._removeNode(value, this._root);
    }

    _removeNode(value, node) {
        if (node == null) {
            return node;
        }

        if (value < node.getValue()) {
            node.setLeftNode(this._removeNode(value, node.getLeftNode()));
        } else if (value > node.getValue()) {
            node.setRightNode(this._removeNode(value, node.getRightNode()));
        } else {

            //CASE 1 : WHEN NODE TO REMOVE THE LEAF NODE.
            if (node.getLeftNode() == null && node.getRightNode() == null) {
                console.log("Removing leaf");
                return null;
            }

            //CASE 2 :: WHEN NODE TO REMOVE HAS ONE CHILD.
            /**
             * TYPE 1 : Node to remove has one right child.
             */
            if (node.getLeftNode() == null) {
                console.log("removing node with only right child");
                var orphan = node.getRightNode();
                node = null;
                return orphan;
            }
            /**
             * TYPE 2 : Node to remove has one left child.
             */
            else if (node.getRightNode() == null) {
                console.log("removing node with only left child");
                var orphan = node.getLeftNode();
                node = null;
                return orphan;
            }

            //CASE 3 :: WHEN NODE TO REMOVE HAS 2 CHILDRENS
            /**
             * APPROACH 1 : USING PREDESSOR.
             */
            else {

                console.log("removing node with 2 children");
                //get the height node on the left sub tree and thn swap it with the item to remove.
                var highestNode = this._getRightMostNode(node.getLeftNode());
                node.setValue(highestNode.getValue());
                node.setLeftNode(this._removeNode(highestNode.getValue(), node.getLeftNode()));
            }

            /**
             * APPROACH 2 : USING SUCCESSOR.
             
            else {
                var successor = node.getRightNode();
                node.setValue(successor.getValue());
                node.setRightNode(this._removeNode(successor.getValue(), node.getRightNode()));
            }*/
        }
        this._updateHeight(node);
        return this._handleDeletion(node);
    }

    _handleDeletion(node) {
        var balance = this.getBalance(node);
        if (balance > 1) {
            var leftNode = node.getLeftNode();
            if (this.getBalance(leftNode) < 0) {
                node.setLeftNode(this.rotateLeft(leftNode));
            }
            return this.rotateRight(node);
        }

        if (balance < -1) {
            var rightNode = node.getRightNode();
            if (this.getBalance(rightNode) > 0) {
                node.setRightNode(this.rotateRight(rightNode));
            }
            return this.rotateLeft(node);
        }
        return node;
    }
}