class SortViz {
    constructor(array, compareProp) {
        this.array = array;
        this.compareProp = compareProp;
        this.bHasNext = true;
    }

    /**
     * Returns true if there are additional elements to sort, false if it has finished
     */
    get hasNext() {
        return this.bHasNext;
    }

    /**
     * To be called after initializing the object. Sets and returns the array with the current flags for the elements
     * before sorting starts
     */
    init() {
        this.setCurrent(1);
        this.setCurrent2(0);
        return this.array;
    }

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
        for (let i = 0; i <= endIndex; i++) {
            this.array[i].current = false;
            this.array[i].current2 = false;
            this.array[i].sorted = true;
        }
    }

}

export default SortViz;