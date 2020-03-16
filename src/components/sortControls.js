/**
 * Main react controller and functions for handling the controls of the algorithm sorting
 * 
 * @author Chris Allen
 */

import React from 'react';
import Row from 'react-bootstrap/Row';
import SortConstants from '../sorting/sortConstants';


/**
 * Returns the React component for the sorting controls for the sorting visualizations
 * Expects the following properties defined in props object:
 *  - elementSize: Size of the array to sort
 *  - elementSizeOnChange: Function to call when the onChange event is fired for the array size input
 *  - generateNewArrayOnClick: Function to call when the onClick event is fired for the generate new array button
 *  - sortOnClick: Function to call when the onClick event is fired for the sort button
 *  - animationDelay: Time in ms for the sorting animation to be delayed by when stepping through
 *  - animationSliderOnChange: Function to call when the onChange event is fired for the range slider input
 * @param {*} props 
 */
const SortControls = function(props) {

    const elementSize = props.elementSize;
    const elementSizeOnChange = props.elementSizeOnChange;
    const generateNewArrayOnClick = props.generateNewArrayOnClick;
    const sortOnClick = props.sortOnClick;
    const sliderOnChange = props.animationSliderOnChange;
    const animationDelay = props.animationDelay;

    return (
        <div className="sort-controls">
            <Row>
                {/* Print out the input box for the size and two buttons */}
                    <label>Array Size: 
                        <input type="text" 
                                onChange={elementSizeOnChange}
                                value={elementSize}
                                />
                    </label>
                    <button onClick={generateNewArrayOnClick}>Generate</button>
                    <button onClick={sortOnClick}>Sort</button>

            </Row>
            <Row>
                <label>
                    Delay:
                    <input type="range" min={SortConstants.ANIMATION_DELAY_MIN} max={SortConstants.ANIMATION_DELAY_MAX} 
                            onChange={sliderOnChange}
                            value={animationDelay}/>
                </label>
            </Row>
        </div>
    );

}

export default SortControls;