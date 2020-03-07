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
        this.setSorted(-1);
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

    /**
     * Sets the current and current2 properties = false and sorted property = true for index startIndex to array length.
     * Sort flag in reverse order
     * @param {int} startIndex 
     * @param {boolean} clearCurrents clears out the current/current2 flags for all elements
     */
    setSortedReverse(startIndex, clearCurrents) {
        for (let i = 0; i < this.array.length; i++) {
            if (i < startIndex) {
                this.array[i].sorted = false;
                if (clearCurrents) {
                    this.array[i].current = false;
                    this.array[i].current2 = false;
                }
            } else {
                this.array[i].current = false;
                this.array[i].current2 = false;
                this.array[i].sorted = true;
            }
        }
    }

    setSortedSubset(startIndex, endIndex) {
        for (let i = startIndex; i <= endIndex; i++) {
            this.array[i].sorted = true;
        }
    }

    /**
     * Iterates through array elements and swaps the current and current2 flags
     */
    swapCurrents() {
        let current = -1;
        let current2 = -1;

        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i].current) {
                current = i;
                if (current2 >= 0) {
                    break;
                }
            } else if (this.array[i].current2) {
                current2 = i;
                if (current >= 0) {
                    break;
                }
            }
        }

        if (current >= 0 && current[2] >= 0) {
            this.array[current].current = false;
            this.array[current].current = true;
            this.array[current2].current2 = false;
            this.array[current2].current2 = true;
        }
    }

    /**
     * Copies the array elements and returns a deep copy of the array
     */
    copyArray() {
        // Cannot just use array.slice() because our array elements are objects which will 
        // still maintain the main reference, not copied
        let arr = [];
        for (let i = 0; i < this.array.length; i++) {
            // spread operator {... object} will copy the object. This is a shallow copy of the object
            // but ok for this use since we dont have any nested objects within each array element
            arr.push({...this.array[i]});
        }
        return arr;
    }

}

export default SortViz;