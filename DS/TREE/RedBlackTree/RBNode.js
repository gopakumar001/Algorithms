/**
 * @author Gopakumar V
 * @file description of file created
 */

import BSTNode from "../BST/BSTNode";

const COLOR = "_COLOR";
const PARENT = "_PARENT";

export const colors = {
    RED: "red",
    BLACK: "#000"
};

export class RBNode extends BSTNode {

    setColor(color) {
        this.setProperty(COLOR, color);
    }

    getColor() {
        return this.getProperty(COLOR);
    }

    setParent(parent) {
        this.setProperty(PARENT, parent);
    }

    getParent() {
        return this.getProperty(PARENT);
    }
}