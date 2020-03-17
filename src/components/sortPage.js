import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SortContainer from './sortContainer';
import SortConstants from '../sorting/sortConstants';
import SortControls from './sortControls';
import BubbleSortViz from '../sorting/bubbleSortViz';
import InsertionSortViz from '../sorting/insertionSortViz';
import MergeSortViz from '../sorting/mergeSortViz';
import QuickSortViz from '../sorting/quickSortViz';


/**
 * Component for the sorting algorithms page. Displays the two page panels;
 * left side is the algorithm definition and right side is the sorting visual
 */
class SortPage extends React.Component {

    /**
     * Constructor for the SortPage component. This component handles generating the array elements,
     * animation properties, etc.
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        
        // Check if a sort type was included in the properties. If not (or not valid),
        // default to the merge sort algorithm
        let sortType = props.location.type;
        if (!sortType || !SortConstants.AVAILABLE_ALGORITHMS.hasOwnProperty(sortType)) {
            sortType = SortConstants.AVAILABLE_ALGORITHMS.MERGE;
        }
    
        this.state = {
            sortType: sortType,
            elements: [],
            sortInterval: null,
            animationDelay: Math.floor((SortConstants.ANIMATION_DELAY_MAX - SortConstants.ANIMATION_DELAY_MIN)/2),
            isSorted: false
        };
    }

    /**
     * Once the component is initially rendered in the dom, call the generate array method to fill with data
     */
    componentDidMount() {
        this.generateNewArray(SortConstants.DEFAULT_ARR_SIZE);
    }

    /**
     * When the URL route changes, update the state sortType so we are using the newly selected sorting algorithm
     * @param {*} prevProps 
     * @param {*} prevState 
     * @param {*} snapshot 
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.type !== prevProps.location.type) {
            // Location changed so update the type and generate a new array as well (if previously sorted)

            // If we are currently in the middle of a sort, clear the sorting interval
            if (this.state.sortInterval) {
                clearInterval(this.state.sortInterval);
            }

            let state = {
                sortType: this.props.location.type,
                sortInterval: null,
                isSorted: false
            };
            
            // If the current array is sorted already or in the process of being sorted, generate a new array
            if (this.state.isSorted || this.state.sortInterval) {
                // Generate a new array and get the sort implementation for that new array
                state.elements = this.getNewArray(this.state.elements.length);
                state.sortImpl = this.getSortImplementation(state.sortType, state.elements);
            } else {
                // Get the sort implemenation for the new algorithm with the existing array
                state.sortImpl = this.getSortImplementation(state.sortType, this.state.elements);
            }

            this.setState(state);
        }
    }

    /**
     * Callback function for the animation slider change
     * @param {Event} e 
     */
    onChangeSlider(e) {
        this.setState({
            animationDelay: e.target.value
        });
    }

    /**
     * When the array size is changed, regenerate array with random values
     * @param {Event} e event callback state
     */
    onChangeArrSize(e) {
        let val = e.target.value;
        // Check to make sure this is a numeric value and between 1 and 99
        if (val && (isNaN(val) || !(Math.floor(val) == val) || val < 1 || val > 99)) {
            val = SortConstants.DEFAULT_ARR_SIZE;
            alert("Please enter a number between 1 and 99");
            return;
        }

        // Generate a new array
        this.generateNewArray(val);
    }

    /**
     * Callback handler for when the generate array button is clicked
     * @param {Event} e event callback state
     */
    onGenerateNewArrayClick(e) {
        this.generateNewArray(this.state.elements.length);
    }

    /**
     * Generates a new array and sets it to the state properties.
     * @param {int} numElements number of elements to set the new size of the array to
     */
    generateNewArray(numElements) {

        // If there is a sort in progress, stop it as we are generating a new array
        if (this.state.sortInterval) {
            clearInterval(this.state.sortInterval);
        }

        // Get the new random array
        const elementList = this.getNewArray(numElements);

        // Instantiate the correct SortViz based on the type to set the new array
        const sort =this.getSortImplementation(this.state.sortType, elementList);

        this.setState({
            elements: elementList,
            sortInterval: null,
            sortImpl: sort,
            isSorted: false
        });
    }

    /**
     * Based on the number of elements passed in the parameter, generates a new random value array
     * with the size of the numElements param
     * @param {int} numElements 
     * @returns Array of objects to use as the new sorting array input
     */
    getNewArray(numElements) {
        let elementList = [];
        for (let i = 0; i < numElements; i++) {
            // Generate random number 1-100 (array min and array max)
            const height = Math.floor(Math.random() * (SortConstants.ARR_MAX_VALUE) + SortConstants.ARR_MIN_VALUE);
            // Add Rectangle element with the random height
            const element = {
                height: height,
                traverse: false
            };
            elementList.push(element);
        }

        return elementList;
    }

    /**
     * Instantiates a new sorting implementation based on the passed sort type.
     * Passes the list of array elements to the constructor for the sorting.
     * @param {String} sortType String name of the sorting algorithm to use
     * @param {Object[]} elementList Array of objects to sort
     * @returns instantiated object of the correct sorting type
     */
    getSortImplementation(sortType, elementList) {
        let sort = null;

        if (sortType === SortConstants.AVAILABLE_ALGORITHMS.INSERTION) {
            sort = new InsertionSortViz(elementList, "height");
        } else if (sortType === SortConstants.AVAILABLE_ALGORITHMS.BUBBLE) {
            sort = new BubbleSortViz(elementList, "height");
        } else if (sortType === SortConstants.AVAILABLE_ALGORITHMS.MERGE) {
            sort = new MergeSortViz(elementList, "height");
        } else if (sortType === SortConstants.AVAILABLE_ALGORITHMS.QUICK) {
            sort = new QuickSortViz(elementList, "height");
        }

        return sort;
    }

    /**
     * Starts the sorting execution. Uses the underlying sort algorithm implementation to generate the list of 
     * states (array elements with set properties at each step of the sorting execution) and updates the current state 
     * element properties with the current history element.
     * Sets an interval to continuously pop the next sort state from the list to show the next sort execution visual
     * based on the animation delay property
     */
    startSort() {
        // Get the rectangle elements and the type of sort requested
        let elementProps = this.state.elements.slice();
        const sort = this.state.sortImpl;

        if (sort) {
            // Put the sorting in an interval so we can see the sorting animation update and do not allow it to run
            // if it is already running
            if (!this.state.sortInterval) {

                // Compute the interval time based on the delay slider value
                var animationDelay = this.state.animationDelay;
                var elementSortHistory = sort.fullSort();
                elementProps = elementSortHistory.shift();
                var sortInterval = setInterval(_displaySortStates.bind(this), animationDelay * 25);
                var isSorted = this.state.isSorted;

                this.setState({
                    elements: elementProps,
                    sortInterval: sortInterval
                });

                function _displaySortStates() {
                    elementProps = elementSortHistory.shift();
                    
                    if (animationDelay != this.state.animationDelay) {
                        // Reset the interval to make sure the animation delay speed is up to date if it was changed
                        clearInterval(sortInterval);
                        animationDelay = this.state.animationDelay;
                        sortInterval = setInterval(_displaySortStates.bind(this), animationDelay * 25);
                    }
                    // If there are no further elements in the queue, clear the interval
                    if (elementSortHistory.length == 0) {
                        clearInterval(sortInterval);
                        sortInterval = null;
                        isSorted = true;
                    }

                    this.setState({
                        elements: elementProps,
                        sortInterval: sortInterval,
                        isSorted: isSorted
                    });
                }

            }
        }

    }


    render() {

        let sortImpl = this.state.sortImpl;
        let algoDef = null;
        if (sortImpl) {
            algoDef = sortImpl.printAlgorithm();
        }
        
        return (
            <Container fluid={true}>
                {/* First print out the row for the sort controls */}
                <Row>
                    <Col md={3}/>
                    <Col md={9}>
                        <SortControls
                            elementSize={this.state.elements.length}
                            elementSizeOnChange={this.onChangeArrSize.bind(this)}
                            generateNewArrayOnClick={this.onGenerateNewArrayClick.bind(this)}
                            sortOnClick={this.startSort.bind(this)}
                            animationDelat={this.state.animationDelay}
                            animationSliderOnChange={this.onChangeSlider.bind(this)}
                        />
                    </Col>
                </Row>
                <Row className="sort-page-container">

                {/* Print out the left side for the algo definition */}
                <Col md={4}>
                    <label className="sort-name">{SortConstants.ALGORITHM_NAMES[this.state.sortType]}</label><br/>
                    <code type="text" className="sort-definition">
                        {algoDef}
                    </code>
                </Col>

                {/* Print out the right side for the algorithm visual */}
                <Col md={8}>
                    <SortContainer elements={this.state.elements} />
                </Col>

                </Row>
            </Container>
        );

    }
}

export default SortPage;