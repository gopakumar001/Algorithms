/**
 * @author Gopakumar V
 * @file Node for AVL tree
 */

import BSTNode from "../BST/BSTNode";

export default class AVLNode extends BSTNode {

    constructor(value) {
        super(value);
        this._height = null;
    }

    setHeight(height) {
        this._height = height;
    }

    getHeight() {
        return this._height;
    }
}