/**
 * @author Gopakumar V
 * @file Test case for AVL Tree
 *  
 *  1. Insert node into a tree.
 *     
 *  2. Remove node from the tree.
 */

import AVLTree from "./AVLTree";
import Widgets from "../../../Widgets/Widgets";


function addTemplate() {
    var form = `<div class="formInput">
                    <h4>AVL TREE TEST CASE</h4>
                    <div style="float: left; clear: both;">
                        <input class="add" value="1,2,3,4,5,6"/>
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

    $('body')
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

const tree = new AVLTree()
export default function AVLTestCase() {
    addTemplate();
    const treeWidget = createTree();
    
    console.log("------------- AVL TREE AND TREE WIDGET INSTANCE -----------------");
    console.log(tree);
    console.log(treeWidget);
    console.log("------------------------------------------------------------");

    $(".formInput button").on("click", function () {

        var type = $(this).data('type');

        if (type == "INORDER" || type == "POSTORDER" || type == "PREORDER") {
            var list = tree.traverse(type);
            $(".result").empty().append("<div class='value' >" + list.map(function(val) {
                return "<span>"+val+"</span>";
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
                        tree.insert(element);
                    else
                        tree.delete(element);
                });

                inputField.val("");
                var treeData = tree.toJson();
                treeWidget.updateUI(treeData);
            }
        }
    });
}
