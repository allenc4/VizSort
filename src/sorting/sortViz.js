class SortViz {
    constructor(array, compareProp) {
        this.array = array;
        this.compareProp = compareProp;
        this.bHasNext = true;
    }

    /**
     * Returns true if there are additional elements to sort, false if it has finished
     * @returns true | false if there is still additional steps to sort
     */
    get hasNext() {
        return this.bHasNext;
    }

    /**
     * To be called after initializing the object. Sets and returns the array with the current flags for the elements
     * before sorting starts
     */
    init() {
        // Clear sorted class for all array elements
        this.setSorted(0);
        // Set the current parameters
        this.setCurrent(1);
        this.setCurrent2(0);
        return this.array;
    }

    /**
     * Runs the next iteration of the sort algorithm. Handles updating internal attributes to hold state of the sort
     * for the next iteration of the algorithm to run.
     * @returns array with the modified structure after the current sort iteration finishes
     */
    sortNext() {
        // Empty method definition. Needs to be defined by child inheriting this class
    }

    /**
     * Compares the values of these two elements based on the comparison property.
     * Returns 0 if the property at element 1 is the same as element 2.
     * Returns -1 if element1.compareProp < element2.compareProp
     * Returns 1 if element1.compareProp > element2.compareProp
     * @param {*} element1 
     * @param {*} element2 
     */
    compare(element1, element2) {
        if (element1[this.compareProp] < element2[this.compareProp]) {
            return -1;
        } else if (element1[this.compareProp] === element2[this.compareProp]) {
            return 0;
        } else {
            return 1;
        }
    }

    /**
     * Sets the current property = true at the specified index of the array. 
     * Sets this property to false for all other indecies
     * @param {int} curIndex 
     */
    setCurrent(curIndex) {
        for (let i = 0; i < this.array.length; i++) {
            if (i == curIndex) {
                this.array[i].current = true;
            } else {
                this.array[i].current = false;
            }
        }
    }

    /**
     * Sets the current2 property = true at the specified index of the array. 
     * Sets this property to false for all other indecies
     * @param {int} curIndex 
     */
    setCurrent2(curIndex) {
        for (let i = 0; i < this.array.length; i++) {
            if (i == curIndex) {
                this.array[i].current2 = true;
            } else {
                this.array[i].current2 = false;
            }
        }
    }

    /**
     * Sets the current and current2 properties = false and sorted property = true for index 0 to endIndex
     * of the array elements
     * @param {int} endIndex 
     */
    setSorted(endIndex) {
        for (let i = 0; i < this.array.length;i++) {
            this.array[i].current = false;
            this.array[i].current2 = false;
            if (i <= endIndex) {
                this.array[i].sorted = true;
            } else {
                this.array[i].sorted = false;
            }
        }
    }

}

export default SortViz;