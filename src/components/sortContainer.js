import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DEFAULT_ARR_SIZE = 10;  // default array size  to 10

class SortContainer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            size: DEFAULT_ARR_SIZE
        };
    }

    onChangeArrSize(e) {
        let val = e.target.value;
        // Check to make sure this is a numeric value and between 1 and 99
        if (val && (isNaN(val) || !(Math.floor(val) == val) || val < 1 || val > 99)) {
            val = DEFAULT_ARR_SIZE;
            alert("Please enter a number between 1 and 99");
        }

        this.setState({
            size: val
        });
    }

    generateNewArray() {
        this.setState({
            size: this.state.size
        });
    }

    render() {
        const numElements = this.state.size;

        const rectangleList = [];
        for (let i = 0; i < numElements; i++) {
            // Generate random number 1-100
            const height = Math.floor(Math.random() * (100) + 1);
            // Add Rectangle element with the random height
            rectangleList.push(<Col key={i}><Rectangle height={height}/></Col>);
        }

        return (
            <div>
                {/* Print out the input box for the size and two buttons */}
                <div className="sort-controls">
                    <label>Array Size: 
                        <input type="text" 
                                onChange={this.onChangeArrSize.bind(this)}
                                value={this.state.size}
                                />
                    </label>
                    <button onClick={this.generateNewArray.bind(this)}>Generate</button>
                    <button>Sort</button>
                </div>

                {/* Print out the container for the rectangles */}
                <Row className="rectangle-container">
                    {rectangleList}
                </Row>
            </div>
        );
    }
}


// Initialize the Visual bars

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

function Rectangle(props) {
    const height = props.height;
    const bDisplaySizeAbove = (height < 5) ? true : false;

    const recStyle = {
        height: normalizeAndConvertEM(height, 0, 100, 0, 9) + "em"
    };

    return (
        <div className="single-rectangle-container">
            <div> 
                <div className="rectangle" style={recStyle} />
                <span className="rectangle-label-below">{height}</span>
            </div>
        </div>
    );
}


export default SortContainer;