/**
 * @author Gopakumar V
 * @file BST testcases
 */

import BST from "./BST";

const BSTInstance = new BST();
export default function BSTTestCase(Widgets) {
    console.log(BSTInstance);
    const treeWidget = new Widgets.Tree({
        renderTo: document.querySelector(".widgetContainer"),
        nodeRadius: 15,
        levelSpacing: 50,
        margin: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },
        treeHeight : 1,
        data: null
    });

    console.log(treeWidget);

    $(".formInput button").on("click", function(){

        var type = $(this).data('type');

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
            console.log(treeData);
            treeWidget.updateUI(treeData, BSTInstance.getHeight());
        }
    });
}