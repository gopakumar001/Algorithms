import './CSS/style.css';
import allTestCases from "./DS/TREE/TestCases";


var selectbox = $("<select></select>").addClass("testcaseList").appendTo($('body'));
$("<option value='' disabled selected>Select your option</option>").appendTo(selectbox);

console.log(allTestCases);
for (var name in allTestCases) {
    $("<option></option>")
        .text(name)
        .prop('value', name)
        .appendTo(selectbox);
}

selectbox.on("change", function (el) {
    var type = $(this).val(),
        cntr = $(".mainContainer");
    cntr.empty();
    new allTestCases[type](cntr);
});

//BSTTestcase();
//AVLTestcase();

// import sortingAlgo from "./SORTING/SortingAlgo";
/* import {
    $,
    jQuery
} from "jquery";

sortingAlgo.mergeSort();
new Widgets.Tree({
    renderTo: document.querySelector(".widgetContainer"),
    nodeRadius: 15,
    levelSpacing: 100,
    margin: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    },
    data: {
        "name": "A",
        "children": [{
                "name": "B",
                "children": [{
                    "name": "C",
                    "children": [{
                        "name": "C"
                    }, {
                        "name": "D"
                    }]
                }, {
                    "name": "D"
                }]
            },
            {
                "name": "E",
                "children": [{
                    "name": "C"
                }, {
                    "name": "D",
                    "children": [{
                        "name": "C"
                    }, {
                        "name": "D"
                    }]
                }]
            }
        ]
    }
}); */