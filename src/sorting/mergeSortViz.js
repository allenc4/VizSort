import SortViz from './sortViz';

class MergeSortViz extends SortViz {

    constructor(array, compareProp) {
        super(array, compareProp);
        this.arrayHistory = [];
    }

    printAlgorithm() {
        return ( 
            "mergesort(left, right) {" +
            "   // If right > left, find middle point to divide array into two halves" +
            "   if (right > left) {" +
            "       let middle = Math.floor((left + right) / 2);" +
            "       // Call mergesort for the first half" +
            "       mergesort(left, middle);" +
            "       // Call mergesort for second half" +
            "       mergesort(middle+1, right);" +
            "       // Merge the two halves" +
            "       merge(left, middle, right);" +
            "   }" +
            "}"); 
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
     * Performs the full recursive sort of the array using the merge sort implementation.
     * This method maintains a history queue and pushes all sort operations (including defining current
     * element being looked at, comparision element, swaps, etc) and pushes each of those states
     * onto the queue. Continues this operation until the array is fully sorted, then returns the 
     * history queue for the visualization to iterate and render in the UI
     */
    fullSort() {
        /**
         * Algoritm details
         * 
         * MergeSort(arr[], l,  r):
         *   If r > l
         *       1. Find the middle point to divide the array into two halves:  
         *               middle m = (l+r)/2
         *       2. Call mergeSort for first half:   
         *               Call mergeSort(arr, l, m)
         *       3. Call mergeSort for second half:
         *               Call mergeSort(arr, m+1, r)
         *       4. Merge the two halves sorted in step 2 and 3:
         *               Call merge(arr, l, m, r)
         */

        this.init();
        this.mergesort(0, this.array.length - 1);
        return this.arrayHistory;
    }

    /**
     * Recursive method for the mergesort. This method handles dividing the array into
     * smaller subproblems and recursively calls itself until we are down to the smallest
     * one element. Then we start calling merge() method and rebuilding the array
     * @param {int} left 
     * @param {int} right 
     */
    mergesort(left, right) {
        // If right > left, find middle point to divide array into two halves
        if (right > left) {
            let middle = Math.floor((left + right) / 2);
            // Call mergesort for the first half
            this.mergesort(left, middle);
            // Call mergesort for the second half
            this.mergesort(middle+1, right);
            // Merge the two halves
            this.merge(left, middle, right);
        }
    }

    /**
     * Handles merging the two subarrays: [left, middle] and [middle+1, right]
     * @param {int} left 
     * @param {int} mid 
     * @param {int} right 
     */
    merge(left, mid, right) {
        // We now have two subarrays:
        //  1) [left, middle]
        //  2) [middle+1, right]
        // Need to mere these two arrays together so [left, right] is sorted
        
        // Only one element so return
        if (left === right) {
            return;
        }

        // Create a temp array
        let tArr = [];
        let i = left;
        let j = mid+1;

        // Traverse both arrays and in each iteration, add smaller of both elements to tArr
        while (i <= mid && j <= right) {
            if (this.compare(this.array[i], this.array[j]) <= 0) {
                tArr.push({...this.array[i]});
                this.setCurrent(i);
                i++;
            } else {
                tArr.push({...this.array[j]});
                this.setCurrent(j);
                j++;
            }
            this.arrayHistory.push(this.copyArray());
        }

        // Add any elements left in the left subarray
        while (i <= mid) {
            tArr.push({...this.array[i++]});
        }
        // Add any elements left in the right subarray
        while (j <= right) {
            tArr.push({...this.array[j++]});
        }

        // Copy temp array back to main array
        for (let t = left, i=0; t <= right; t++, i++) {
            this.array[t] = tArr[i];
            this.array[t].sorted = true;
        }
        this.arrayHistory.push(this.copyArray());
    }


}

export default MergeSortViz;