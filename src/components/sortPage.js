import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SortContainer from './sortContainer';

/**
 * Component for the sorting algorithms page. Displays the two page panels;
 * left side is the algorithm definition and right side is the sorting visual
 * @param {*} props 
 */
const SortPage = function(props) {

    let sortType = props.location.type;
    const sortAlgos = [
        "merge", "bubble", "quick"
    ];

    // Check if a sort type was included in the properties. If not (or not valid),
    // default to the merge sort algorithm
    if (!sortType || !sortAlgos.includes(sortType)) {
        sortType = "merge";
    }

    return (
        <Container fluid={true}>
            <Row className="sort-page-container">

            {/* Print out the left side for the algo definition */}
            <Col md={3}>
                <div>Printing out {sortType} algorithm definition</div>
            </Col>

            {/* Print out the right side for the algorithm visual */}
            <Col md={9}>
                <SortContainer size={25}/>
            </Col>

            </Row>
        </Container>
    );
}

export default SortPage;