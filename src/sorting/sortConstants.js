/**
 * Various constant attributes related to the sorting visuals.
 * 
 * @author Chris Allen
 */

const SortConstants = {
    // Available algorithms for sorting
    AVAILABLE_ALGORITHMS: {
        BUBBLE: "BUBBLE",
        INSERTION: "INSERTION",
        MERGE: "MERGE",
        QUICK: "QUICK"
    },
    ALGORITHM_NAMES: {
        BUBBLE: "Bubble Sort",
        INSERTION: "Insertion Sort",
        MERGE: "Merge Sort",
        QUICK: "Quick Sort"
    },
    DEFAULT_ARR_SIZE: 10,  // default array size  to 10
    ARR_MIN_VALUE: 1,  // Smallest size we can have for the array element value
    ARR_MAX_VALUE: 100,  // Largest size we can have for the array element value
    ANIMATION_DELAY_MIN: 0,  // minimum delay for the sorting animation
    ANIMATION_DELAY_MAX: 35  // maximum delay for the animation

};

export default SortConstants;