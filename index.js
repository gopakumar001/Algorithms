import sortingAlgo from "./SORTING/SortingAlgo";
import Widgets from "./Widgets/Widgets";
import './CSS/style.css';
import {
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
                        },
                        {
                            "name": "D"
                        }
                    ]
                    },
                    {
                        "name": "D"
                    }
                ]
            },
            {
                "name": "E",
                "children": [{
                        "name": "C"
                    },
                    {
                        "name": "D",
                        "children": [{
                            "name": "C"
                        },
                        {
                            "name": "D"
                        }
                    ]
                    }
                ]
            }
        ]
    }
});