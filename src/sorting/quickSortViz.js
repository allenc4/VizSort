import SortViz from './sortViz';

class QuickSortViz extends SortViz {

    constructor(array, compareProp) {
        super(array, compareProp);
        this.arrayHistory = [];
    }

    printAlgorithm() {
        return ( 
            "quicksort(low, high) {\n" +
            "   if (low < high) {\n" +
            "       // pi is partitioning index, arr[pi] is now at the right place\n" +
            "       const pi = partition(low, high);\n" +
            "       array[pi].sorted = true;\n" +
            "       \n" +
            "       // Sort before pi\n" +
            "       this.quicksort(low, pi-1);\n" +
            "       // Sort after pi\n" +
            "       this.quicksort(pi+1, high);\n" +
            "   }\n" +
            "}\n");
    }

    /**
     * To be called after initializing the object. Sets and returns the array with the current flags for the elements
     * before sorting starts
     */
    init() {
        // Clear sorted class for all array elements
        this.setSorted(-1);
        return this.array;
    }

    /**
     * Performs the full recursive sort of the array using the quick sort implementation.
     * This method maintains a history queue and pushes all sort operations (including defining current
     * element being looked at, comparision element, swaps, etc) and pushes each of those states
     * onto the queue. Continues this operation until the array is fully sorted, then returns the 
     * history queue for the visualization to iterate and render in the UI
     */
    fullSort() {
        /**
         * Algoritm details
         * 
         * //low  --> Starting index,  high  --> Ending index
         *  quickSort(arr[], low, high)
         *  {
         *      if (low < high)
         *      {
         *          //pi is partitioning index, arr[pi] is now
         *          //at right place 
         *          pi = partition(arr, low, high);
         *
         *          quickSort(arr, low, pi - 1);  // Before pi
         *          quickSort(arr, pi + 1, high); // After pi
         *      }
         *  }
         */

        this.init();
        this.quicksort(0, this.array.length - 1);
        // Array is sorted
        this.setSorted(this.array.length - 1);
        this.arrayHistory.push(this.array);
        return this.arrayHistory;
    }

    /**
     * Recursive quicksort algorithm implementation. This method continually pivots the array 
     * (to place lower elements before it and higher elements after it), breaking the array
     * into smaller pieces until the entire array is sorted
     * @param {int} low 
     * @param {int} high 
     */
    quicksort(low, high) {
        if (low < high) {
            // pi is partitioning index, arr[pi] is now at the right place
            const pi = this.partition(low, high);
            this.setCurrent(-1);
            this.setCurrent2(-1);
            this.array[pi].sorted = true;
            this.arrayHistory.push(this.copyArray());

            this.quicksort(low, pi-1); // sort before pi
            this.quicksort(pi+1, high);  // sort after pi
        }
    }

    /**
     * Given a low and high index, pivots this array so that the element at array index[high]
     * is in the middle (all elements lower are placed before and all elements greater are placed after)
     * @param {int} low 
     * @param {int} high 
     * @returns index at which the partition is at ()
     */
    partition(low, high) {
        // set the pivot point to the high point of the subset
        const pivotIndex = high;
        const pivot = {...this.array[pivotIndex]};
        this.setPivot(pivotIndex);
        this.arrayHistory.push(this.copyArray());

        // Loop through the array from index low to high-1 making sure all elements to the left
        // of a given index are less than pivot point and all items to right are greater than
        let leftIndex = low;
        let rightIndex = high-1;
        while (leftIndex < rightIndex) {
            // Set the current flags
            this.setCurrent(leftIndex);
            this.setCurrent2(rightIndex);

            // Continue incrementing leftIndex until we find an element > pivot point
            if (this.compare(this.array[leftIndex], pivot) > 0){
                // Continue decrementing rightIndex until we find an element <= pivot point
                if (this.compare(this.array[rightIndex], pivot) <= 0) {
                    // Swap elements at left and right index
                    const tElement = {...this.array[leftIndex]};
                    this.array[leftIndex] = this.array[rightIndex];
                    this.array[rightIndex] = tElement;

                    // Set the current flags to left and right indexes after the swap
                    this.setCurrent(leftIndex);
                    this.setCurrent2(rightIndex);
                    // Increment left index
                    leftIndex++;
                } else {
                    rightIndex--;
                }
            } else {
                leftIndex++;
            }

            this.arrayHistory.push(this.copyArray());
        }

        this.setPivot(-1);
        this.setCurrent(high);
        this.setCurrent2(rightIndex);
        this.arrayHistory.push(this.copyArray());

        if (this.compare(pivot, this.array[rightIndex]) < 0) {
            this.array[pivotIndex] = this.array[rightIndex];
            this.array[rightIndex] = pivot;
            this.setCurrent(rightIndex);
            this.setCurrent2(pivotIndex);
            this.arrayHistory.push(this.copyArray());
            return rightIndex;
        } else {
            return pivotIndex;
        }
    }

   


}

export default QuickSortViz;