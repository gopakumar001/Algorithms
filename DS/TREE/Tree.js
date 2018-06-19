/**
 * @author Gopakumar V
 * @file Tree interface
 */

export default class Tree {
    constructor() {
        this._root = null;
    }
    createNode(value) {}
    delete(value) {}
    insert(value) {}
    toJson() {
        return this._root.toJson();
    }
}