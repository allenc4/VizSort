import SortViz from './sortViz';

class InsertionSortViz extends SortViz {

    constructor(array, compareProp) {
        super(array, compareProp);
        // Declare all of the variables needed to iterate through the sort algorithm
        this.outerIndex = 1;
        this.innerIndex = 0;
        this.kSwapIndex = 1;
        this.prevSwap = false;
    }

    /**
     * Traverses the next step in the sort. Updates array element properties such as the current traversal,
     * position of elements, etc and returns the updated array.
     * 
     * Algorithm for insertion sort:
     *   for (let i = 1; i < arr.length; i++) {
     *       // Get the current element at position i
     *       var cur = arr[i];
     *       
     *       if (cur < arr[i-1]) {
     *           // Traverse backwards until current element is sorted from position 0 to i
     *           for (let k=i,a=k-1; a >= 0; a--,k--) {
     *               if (cur < arr[a]) {
     *                   // swap the elements at index i and a
     *                   arr[k] = arr[a];
     *                   arr[a] = cur;
     *               } else {
     *                   // element cur is greater than arr[a] which means it is greater than anything before index a
     *                   break;
     *               
     *           }
     *       }
     *   } 
     */
    sortNext() {
        if (this.outerIndex < this.array.length) {
            // Get the current element at the swap index (will be same as outerIndex if we are not currently in a loop)
            var cur = this.array[this.kSwapIndex];
            
            // Compare the current element with value at arr[innerIndex]
            // We want to show the swap in the animation so if the values need to be swapped, set the prevSwap flag (and switch current/current2 flags)
            // and on next iteration, we can handle decrementing indecies and handling next cases
            if (this.prevSwap) {
                this.prevSwap = false;
                // Decrement inner index and kswap index
                this.innerIndex--;
                this.kSwapIndex--;

                // If the next inner index >= 0, set the current to the kSwapIndex and current2 to inner index
                // Since the next sort step we will compare are these two elements
                if (this.innerIndex >= 0) {
                    this.setCurrent(this.kSwapIndex);
                    this.setCurrent2(this.innerIndex);
                } else {
                    // Otherwise, we moved this element to the very first position in the array, so set current to index 0 and no current2
                    this.setCurrent(0);
                    this.setCurrent2(-1);
                }
            } else if (this.innerIndex >= 0 && this.compare(cur, this.array[this.innerIndex]) < 0) {

                // swap elements at index i (kSwapIndex) and index a
                this.array[this.kSwapIndex] = this.array[this.innerIndex];
                this.array[this.innerIndex] = cur;

                this.prevSwap = true;

                // Switch the current and current2 flags
                this.swapCurrents();

            } else {
                // Element cur is greater than array[innerIndex], which means it is greater than anything before inner index
                // and less than anything between inner index and outer index
                this.setSorted(this.outerIndex);
                this.setCurrent(this.outerIndex+1);
                this.setCurrent2(this.outerIndex);

                // Increment outer index and reset kSwap and inner indecies 
                this.outerIndex++;
                this.kSwapIndex = this.outerIndex;
                this.innerIndex = this.kSwapIndex - 1;
            }

        } else {
            this.bHasNext = false;
        }

        return this.array;
    }

    /**
     * Performs the full iterative sort of the array using the insertion sort implementation.
     * This method maintains a history queue and pushes all sort operations (including defining current
     * element being looked at, comparision element, swaps, etc) and pushes each of those states
     * onto the queue. Continues this operation until the array is fully sorted, then returns the 
     * history queue for the visualization to iterate and render in the UI
     */
    fullSort() {
        // Loop through all elements. Once main loop decrements, the largest value will be placed at the end each iteration
        let arrayHistory = [];
        // Initialize array and push initial state to queue
        this.init();
        arrayHistory.push(this.copyArray());

        for (let i = 1; i < this.array.length; i++) {
            // Get the current element at position i
            var cur = this.array[i];

            // Compare current element with previous index to determine if we need to 
            // start sorting backwards
            if (this.compare(cur, this.array[i-1]) < 0) {
                // Traverse backwards until current element is sorted from position 0 to i
                for (let k=i, a=k-1; a >= 0; a--, k--) {
                    // Set the current position
                    this.setCurrent(k);
                    this.setCurrent2(a);
                    arrayHistory.push(this.copyArray());
                    if (this.compare(cur, this.array[a]) < 0) {
                        // Swat the elements at index i and a
                        this.array[k] = this.array[a];
                        this.array[a] = cur;

                        // Reset the current positions after the swap
                        this.setCurrent(a);
                        this.setCurrent2(k);
                        arrayHistory.push(this.copyArray());
                    } else {
                        // element cur is greater than arr[a] which means it is greater than anything before index a
                        break;
                    }
                }
            } else {
                // set the current position
                this.setCurrent(i);
                this.setCurrent2(i-1);
                arrayHistory.push(this.copyArray());
            }
            
            // We should now be sorted from index 0 to i
            this.setSorted(i);
            arrayHistory.push(this.copyArray());
        }

        return arrayHistory;
    }


}

export default InsertionSortViz;