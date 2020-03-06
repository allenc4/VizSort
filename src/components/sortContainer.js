import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InsertionSortViz from '../sorting/insertionSortViz';
import BubbleSortViz from '../sorting/bubbleSortViz';

const DEFAULT_ARR_SIZE = 10;  // default array size  to 10
const ANIMATION_DELAY_MIN = 0;  // minimum delay for the sorting animation
const ANIMATION_DELAY_MAX = 35;  // maximum delay for the animation


/**
 * Normalizes a number in a given range to a new range
 * @param {double} num Number to normalize to a new range
 * @param {double} min Minimum value of the number in current range
 * @param {double} max Maximum value of the number in the current range
 * @param {double} minNorm Minimum value scale in the new requested range
 * @param {double} maxNorm Maximum value scale in the new requested range
 */
function normalizeAndConvertEM(num, min, max, minNorm, maxNorm) {
    // Normalize the size to fit between new min and max scale
    return ((maxNorm - minNorm)*(num - min))/(max-min) + min;
}

/**
 * Rectangle component for the data visual
 */
class Rectangle extends React.Component {
    render() {
        const height = this.props.height;
        const sorted = this.props.sorted;
        const current = this.props.current;
        const current2 = this.props.current2;
    
        const recStyle = {
            height: normalizeAndConvertEM(height, 0, 100, 0, 9) + "em"
        };

        // Add classes based on if the current rectangle is current, sorted, etc
        let rectangleClass = "rectangle";
        if (current) {
            rectangleClass += " sort current";
        } else if (current2) {
            rectangleClass += " sort current2";
        } else if (sorted) {
            rectangleClass += " sort sorted";
        }
    
        return(
            <div className="single-rectangle-container">
                <div> 
                    <div className={rectangleClass} style={recStyle} />
                    <span className="rectangle-label-below">{height}</span>
                </div>
            </div>
        );
        
    }
}


/**
 * Component class that holds the container for the sorting visual.
 * Randomly generates height, builds rectangle components, and handles sorting
 */
class SortContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            sortInterval: null,
            animationDelay: Math.floor((ANIMATION_DELAY_MAX-ANIMATION_DELAY_MIN)/2)
        };
    }

    /**
     * Once the component is initially rendered in the dom, call the generate array method to fill with data
     */
    componentDidMount() {
        this.generateNewArray(DEFAULT_ARR_SIZE);
    }

    onChangeSlider(e) {
        this.setState({
            animationDelay: e.target.value
        });
    }

    /**
     * When the array size is changed, regenerate array with random values
     * @param {*} e 
     */
    onChangeArrSize(e) {
        let val = e.target.value;
        // Check to make sure this is a numeric value and between 1 and 99
        if (val && (isNaN(val) || !(Math.floor(val) == val) || val < 1 || val > 99)) {
            val = DEFAULT_ARR_SIZE;
            alert("Please enter a number between 1 and 99");
            return;
        }

        // Generate a new array
        this.generateNewArray(val);
    }

    onGenerateNewArrayClick(e) {
        this.generateNewArray(this.state.elements.length);
    }

    generateNewArray(numElements) {

        // If there is a sort in progress, stop it as we are generating a new array
        if (this.state.sortInterval) {
            clearInterval(this.state.sortInterval);
        }

        let elementList = [];

        for (let i = 0; i < numElements; i++) {
            // Generate random number 1-100
            const height = Math.floor(Math.random() * (100) + 1);
            // Add Rectangle element with the random height
            const element = {
                height: height,
                traverse: false
            };
            elementList.push(element);
        }

        this.setState({
            elements: elementList,
            sortInterval: null
        });

    }

    onSortClick() {
        // Get the rectangle elements and the type of sort requested
        let elementProps = this.state.elements.slice();
        const type = this.props.sortType;
        let sort;

        // Instantiate the correct SortViz based on the type
        if (type === 'insertion') {
            sort = new InsertionSortViz(elementProps, "height");
        } else if (type === 'bubble') {
            sort = new BubbleSortViz(elementProps, "height");
        }

        if (sort) {
            // Put the sorting in an interval so we can see the sorting animation update and do not allow it to run
            // if it is already running
            if (!this.state.sortInterval) {
                // Initialize the sort state
                elementProps = sort.init();

                // Compute the interval time based on the delay slider value
                var animationDelay = this.state.animationDelay;
                var sortInterval = setInterval(_runSort.bind(this), animationDelay*25);

                this.setState({
                    elements: elementProps,
                    sortInterval: sortInterval
                });

                function _runSort() {
                    elementProps = sort.sortNext();
            
                    if (!sort.hasNext) {
                        clearInterval(sortInterval);
                        sortInterval = null;
                    } else if (animationDelay != this.state.animationDelay) {
                        // Reset the interval to make sure the animation delay speed is up to date if it was changed
                        clearInterval(sortInterval);
                        animationDelay = this.state.animationDelay;
                        sortInterval = setInterval(_runSort.bind(this), animationDelay*25);
                    }

                    this.setState({
                        elements: elementProps,
                        sortInterval: sortInterval
                    });
                }

            }
        }


    }

    render() {
        const elementList = this.state.elements;
        let rectangleList = [];
        // Push each rectangle element into the list of columns
        // {...props} passes all properties to the Rectangle component (includes height, current, sorted, etc)
        elementList.map((props, index) => {
            return rectangleList.push(
                <Col key={index}>
                    <Rectangle {...props}/></Col>
            );
        });

        return (
            <div>
                <div className="sort-controls">
                    <Row>
                        {/* Print out the input box for the size and two buttons */}
                            <label>Array Size: 
                                <input type="text" 
                                        onChange={this.onChangeArrSize.bind(this)}
                                        value={elementList.length}
                                        />
                            </label>
                            <button onClick={this.onGenerateNewArrayClick.bind(this)}>Generate</button>
                            <button onClick={this.onSortClick.bind(this)}>Sort</button>

                    </Row>
                    <Row>
                        <label>
                            Delay:
                            <input type="range" min={ANIMATION_DELAY_MIN} max={ANIMATION_DELAY_MAX} 
                                    onChange={this.onChangeSlider.bind(this)}
                                    value={this.state.animationDelay}/>
                        </label>
                    </Row>
                </div>
                
                {/* Print out the container for the rectangles */}
                <Row className="rectangle-container">
                    {rectangleList}
                </Row>
            </div>
        );
    }
}


export default SortContainer;