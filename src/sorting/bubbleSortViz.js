import SortViz from './sortViz';

class BubbleSortViz extends SortViz {

    constructor(array, compareProp) {
        super(array, compareProp);
        // Declare all of the variables needed to iterate through the sort algorithm
        this.endIndex = array.length - 1;
        this.innerIndex = 1;
    }

    printAlgorithm() {
        return ( 
            "// Loop through all elements. Once mainn loop decrements, the largest value" +
            "// will be placed at the end each iteration" +
            "for (eIndex = array.length - 1; eIndex >= 0; eIndex--) {" +
            "   for (i = 1; i < eIndex; i++) {" +
            "       // Get current and previous element" +
            "       let cur = array[i];" +
            "       let prev = array[i-1];" +
            "       " +
            "       // Compare these two and swap if prev is > cur" +
            "       if (prev > cur) {" + 
            "           array[i] = prev;" + 
            "           array[i-1] = cur;" +
            "       }" +
            "   }" +
            "}");
    }

    /**
     * Traverses the next step in the sort. Updates array element properties such as the current traversal,
     * position of elements, etc and returns the updated array.
     * 
     * Algorithm for bubble sort:
     *   // Loop through all elements. Once main loop decrements, the largest value will be placed at the end each iteration
     *   for (let endIndex = this.array.length - 1; endIndex >= 0; endIndex--) {
     *       for (let i = 1; i <= endIndex; i++) {
     *           // Get current and previous element
     *           let cur = this.array[i];
     *           let prev = this.array[i-1];
     * 
     *           // Compare these two and swap if prev is > cur
     *           if (this.compare(prev, cur) > 0) {
     *               this.array[i] = prev;
     *               this.array[i-1] = cur;
     *           }
     *       }
     *   }
     */
    sortNext() {
        // Bubblesort starts from beginning of the array and continues to traverse, swapping higher elements to be at the end of the list
        // Get the current and previous elements
        let cur = this.array[this.innerIndex];
        let prev = this.array[this.innerIndex - 1];

        // Compare these two and swap if prev is > cur. If we need to swap, perform the swap and switch the current and current2 values
        // then on the next iteration, we continue with the loop since we want to visually show the swap
        if (this.compare(prev, cur) > 0) {
            this.array[this.innerIndex] = prev;
            this.array[this.innerIndex - 1] = cur;

            // Switch the current and current2 flags
            this.setCurrent(this.innerIndex);
            this.setCurrent2(this.innerIndex - 1);
        } else {
            // If inner index is < end index, increment inner index and set the current flags
            if (this.innerIndex < this.endIndex) {
                this.innerIndex++;
                this.setCurrent(this.innerIndex);
                this.setCurrent2(this.innerIndex-1);
            } else if (this.endIndex > 0) {
                // Otherwise, inner loop finished. If the end index > 0, decrement end index and start inner loop again
                this.endIndex--;
                this.innerIndex = 1;
                this.setCurrent(1);
                this.setCurrent2(0);
                // We are now sorted from endIndex to array.length
                this.setSortedReverse(this.endIndex+1);

            } else {
                // Else the inner and outer loop finished, so set sorted and quit
                this.setSorted(this.array.length);
                this.bHasNext = false;
            }
        }
        
        return this.array;
    }

    /**
     * Performs the full iterative sort of the array using the bubble sort implementation.
     * This method maintains a history queue and pushes all sort operations (including defining current
     * element being looked at, comparision element, swaps, etc) and pushes each of those states
     * onto the queue. Continues this operation until the array is fully sorted, then returns the 
     * history queue for the visualization to iterate and render in the UI
     */
    fullSort() {
        // Loop through all elements. Once main loop decrements, the largest value will be placed at the end each iteration
        let arrayHistory = [];
        // Initialize the array
        this.init();
        arrayHistory.push(this.copyArray());

        for (let eIndex = this.array.length - 1; eIndex >= 0; eIndex--) {
            for (let i = 1; i <= eIndex; i++) {
                // Get current and previous element
                let cur = this.array[i];
                let prev = this.array[i-1];

                // Set the current and current2 values
                this.setCurrent(i);
                this.setCurrent2(i-1);
                arrayHistory.push(this.copyArray());

                // Compare these two and swap if prev > cur
                if (this.compare(prev, cur) > 0) {
                    this.array[i] = prev;
                    this.array[i-1] = cur;
                    this.setCurrent(i);
                    this.setCurrent2(i-1);
                    arrayHistory.push(this.copyArray());
                }
            }
            this.setSortedReverse(eIndex, true);
            arrayHistory.push(this.copyArray());
       }

       return arrayHistory;
    }


}

export default BubbleSortViz;