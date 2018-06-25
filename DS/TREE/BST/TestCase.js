/**
 * @author Gopakumar V
 * @file Test case for binary search tree.
 * 
 *      1. Insert node into BST
 *      2. Delete node from BST
 */

import BST from "./BST";
import Widgets from "../../../Widgets/Widgets";

const BSTInstance = new BST();
const treeData = [10, 5, 4, 6, 15, 12, 16];
const treeData1 = [100, 50, 20, 10, 30, 60, 55, 65, 150, 120, 110, 130, 160, 155, 165];

function addTemplate(cntr) {
    var form = `<div class="formInput">
                    <div style="float: left; clear: both;">
                        <input class="add" value="100,50,20,10,30,60,55,65,150,120,110,130,160,155,165"/>
                        <button data-type='add' >Add</button>
                        <br>
                        <input class="remove"/>
                        <button data-type='remove' >Remove</button>
                    </div>
                    <div style="float: left; clear: both; margin-top: 10px;">
                        <button data-type='INORDER' >Inorder</button>
                        <button data-type='PREORDER' >Preorder</button>
                        <button data-type='POSTORDER' >Postorder</button>
                    </div>
                </div>`;

    cntr
        .append(form)
        .append("<div class='widgetContainer'></div>")
        .append("<div class='result'></div>");
}

function createTree() {
    return new Widgets.Tree({
        renderTo: document.querySelector(".widgetContainer"),
        nodeRadius: 15,
        levelSpacing: 50,
        margin: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        data: null
    });
}

export default function BSTTestCase(cntr) {

    addTemplate(cntr);
    const treeWidget = createTree();


    console.log("------------- BST AND TREE WIDGET INSTANCE -----------------");
    console.log(BSTInstance);
    console.log(treeWidget);
    console.log("------------------------------------------------------------");

    $(".formInput button").on("click", function () {

        var type = $(this).data('type');

        if (type == "INORDER" || type == "POSTORDER" || type == "PREORDER") {
            var list = BSTInstance.traverse(type);
            $(".result").empty().append("<div class='value' >" + list.map(function (val) {
                return "<span>" + val + "</span>";
            }).join("") + "</div>");
        } else {

            let inputField = $(".formInput input." + type);
            let input = inputField.val();
            if (input !== "") {
                let _value = [];
                if (isNaN(input)) {
                    _value = input.split(",").map(function (v) {
                        return v * 1;
                    });
                } else {
                    _value.push(input * 1);
                }

                _value.forEach(element => {
                    if (type == 'add')
                        BSTInstance.insert(element);
                    else
                        BSTInstance.delete(element);
                });

                inputField.val("");
                var treeData = BSTInstance.toJson();
                treeWidget.updateUI(treeData);
            }
        }

    });
}