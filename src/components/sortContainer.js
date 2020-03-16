/**
 * Set of React componenents and functions for handling the container for the sorting visuals and the array elements
 * 
 * @author Chris Allen
 */

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SortConstants from '../sorting/sortConstants';

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
 * @property {*} props
 */
const Rectangle = function(props) {
    
    let height = props.height;
    const sorted = props.sorted;
    const current = props.current;
    const current2 = props.current2;
    const pivot = props.pivot;
    
    const recStyle = {
        height: normalizeAndConvertEM(height, SortConstants.ARR_MIN_VALUE, SortConstants.ARR_MAX_VALUE, 0, 9) + "em"
    };

    // Add classes based on if the current rectangle is current, sorted, etc
    let rectangleClass = "rectangle";
    if (current) {
        rectangleClass += " sort current";
    } else if (current2) {
        rectangleClass += " sort current2";
    } else if (pivot) {
        rectangleClass += " sort pivot";
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


/**
 * Component that holds the container for the sorting visual.
 * Givent the array elements in the properties object, prints the Rectangle component for each element
 * and prints out the entire element list
 * @param {*} props
 */
const SortContainer = function(props) {
    
    const elementList = props.elements;
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
            {/* Print out the container for the rectangles */}
            <Row className="rectangle-container">
                {rectangleList}
            </Row>
        </div>
    );
}


export default SortContainer;