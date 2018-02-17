/**
 * @Gopakumar V
 * 
 * Algorithm to sort content using Merge Sort. It uses divide and conquer approach to sort the content.
 * 
 * ---------------------------------------------------
 * Steps involved are :-
 *      1. Divide the array into 2 halfs.
 *      2. Recursively sort each half.
 *      3. Merge two halfs
 * 
 * -------------------------------------------------- 
 * Logic :-
 * 
 *    lo           mid             hi
 *   ---------------------------------
 *   | 1 | 2 | 5 | 6 | 7 | 3 | 4 | 9 |
 *   --------------------------------- 
 *   i --->           j --->
 * 
 * --------------------------------------------------
 * 
 * This can be implemented in two ways one is bottoms
 * up approach without using recursion and other is by
 * using recursion.
 * 
 * --------------------------------------------------
 * 
 * Big(o) - n(logn)
 * 
 * Link :- https://en.wikipedia.org/wiki/Merge_sort
 * 
 */

export default function mergeSort() {

    return {

        sort: function (input, btmUp) {
            this._sort(input, [], 0, input.length - 1);

            if(btmUp) {
                this._sort_BottomUp(input);
            }

            return input;
        },

        /**
         * Merge sort bottom up approach using recursion.
         */
        _sort_BottomUp: function (input) {

            var temp = [...input],
                N = input.length;

            for (let sz = 1; sz < N; sz = (2 * sz)) {
                for (let lo = 0; lo < N - sz; lo += (2 * sz)) {
                    this._merge(input, temp, lo, lo + sz - 1, Math.min(lo + (2 * sz) - 1, N - 1));
                }
            }
        },

        /**
         * Merge sort using recursion.
         */
        _sort: function (input, temp, low, high) {

            if (low >= high) return;
            var mid = Math.floor(low + ((high - low) / 2));

            //Sort first half.
            this._sort(input, temp, low, mid);

            //Sort second half.
            this._sort(input, temp, mid + 1, high);

            //Merge both halfs.
            this._merge(input, temp, low, mid, high);

        },

        _merge: function (input, temp, low, mid, high) {

            //Copy input to temporary array.
            for (var i = low; i <= high; i++) {
                temp[i] = input[i];
            }

            var i = low,
                j = mid + 1;
            for (var k = low; k <= high; k++) {

                //Copy the second half to the input array. once first half is completed.
                if (i > mid)
                    input[k] = temp[j++];
                //Copy the first half to the input array. once second half is completed.
                else if (j > high)
                    input[k] = temp[i++];

                //Find smallest/equal by comparision element in first and second half.
                //Then move it to the input array.
                else if (temp[i] < temp[j])
                    input[k] = temp[i++];
                else
                    input[k] = temp[j++];
            }
        }
    };
};