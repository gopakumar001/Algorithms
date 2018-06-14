/**
 * @author Gopakumar V
 * @file Binary Search Tree
 */

import BSTNode from "./BSTNode";

export default class BST {

    constructor() {
        this._root = null;
    }

    getHeight() {
        return this._getHeight(this._root);
    }

    _getHeight(node) {
        if(node == null) {
            return 0;
        }
        var leftNode = node.getLeftNode(),
            rightNode = node.getRightNode();

        return Math.max(this._getHeight(leftNode), this._getHeight(rightNode)) +1;
    }

    insert(value) {
        if (this._root == null) {
            this._root = new BSTNode(value);
        } else {
            this._insert(this._root, value);
        }
        this._nodeCount++;
    }

    /**
     * 3 cases to handle.
     *      node to remove is leaf.
     *      node to remove has one child.
     *      node to remove has two child.
     */
    delete(value) {
        if (this._root !== null) {
            var removedNode = this._removeNode(value, this._root);   
        }
    }

    _removeNode(value, node) {
        if(node == null) {
            return node;    
        }
        
        if(value < node.getValue()){
            node.setLeftNode(this._removeNode(value, node.getLeftNode()));
        }else if(value > node.getValue()) {
            node.setRightNode(this._removeNode(value, node.getRightNode()));
        }else {

            //CASE 1 : WHEN NODE TO REMOVE THE LEAF NODE.
            if(node.getLeftNode() == null && node.getRightNode() == null) {
                console.log("Removing leaf");
                return null;
            }

            //CASE 2 :: WHEN NODE TO REMOVE HAS ONE CHILD.
            /**
             * TYPE 1 : Node to remove has one right child.
             */
            if(node.getLeftNode() == null) {
                console.log("removing node with only right child");
                var orphan = node.getRightNode();
                node = null;
                return orphan;
            }
            /**
             * TYPE 2 : Node to remove has one left child.
             */
            else if(node.getRightNode() == null) {
                console.log("removing node with only left child");
                var orphan = node.getLeftNode();
                node = null;
                return orphan;
            }
            
            //CASE 3 :: WHEN NODE TO REMOVE HAS 2 CHILDRENS
            /**
             * APPROACH 1 : USING PREDESSOR.
            else {

                console.log("removing node with 2 children");
                //get the height node on the left sub tree and thn swap it with the item to remove.
                var highestNode = this._getRightMostNode(node.getLeftNode());
                node.setValue(highestNode.getValue());
                node.setLeftNode(this._removeNode(highestNode.getValue(), node.getLeftNode()));
            }*/
            
            /**
             * APPROACH 2 : USING SUCCESSOR.
             */
            else {
                var successor = node.getRightNode();
                node.setValue(successor.getValue());
                node.setRightNode(this._removeNode(successor.getValue(), node.getRightNode()));
            }
        }

        return node;
    }

    _getRightMostNode(node) {
        if(node.getRightNode() == null){
            return node;
        }
        return this._getRightMostNode(node.getRightNode());
    }

    _search(value, node) {
        if (value < node.getValue()) {
            return this._search(value, node.getLeftNode());
        } else if (value > node.getValue()) {
            return this._search(value, node.getRightNode());
        } else {
            return node;
        }
    }

    _insert(node, value) {
        if (value < node.getValue()) {
            var leftNode = node.getLeftNode();
            if (leftNode === null) {
                node.setLeftNode(new BSTNode(value));
            } else {
                this._insert(leftNode, value);
            }
        } else {
            var rightNode = node.getRightNode();
            if (rightNode === null) {
                node.setRightNode(new BSTNode(value));
            } else {
                this._insert(rightNode, value);
            }
        }
    }

    traverse(type) {

        if (type === "POSTORDER") {
            this._postOrder(this._root);
        } else if (type === "PREORDER") {
            this._preOrder(this._root);
        } else {
            this._inorder(this._root);
        }
    }

    _postOrder(node) {

        var leftNode = node.getLeftNode();
        if (leftNode)
            this._postOrder(leftNode);

        var rightNode = node.getRightNode();
        if (rightNode)
            this._postOrder(rightNode);

        console.log(node.getValue());
    }

    _preOrder(node) {
        console.log(node.getValue());
        var leftNode = node.getLeftNode();
        if (leftNode)
            this._preOrder(leftNode);

        var rightNode = node.getRightNode();
        if (rightNode)
            this._preOrder(rightNode);
    }

    _inorder(node) {
        var leftNode = node.getLeftNode();
        if (leftNode)
            this._inorder(leftNode);
        console.log(node.getValue());
        var rightNode = node.getRightNode();
        if (rightNode)
            this._inorder(rightNode);
    }

    toJson() {
        return this._root.toJson();
    }
}