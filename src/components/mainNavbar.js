import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from 'react-bootstrap';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import SortPage from './sortPage';
import SortConstants from '../sorting/sortConstants';

const MainNavbar = function(params) {

    // Sort algorithms
    let sortAlgos = [];
    for (let [key,value] of Object.entries(SortConstants.ALGORITHM_NAMES)) {
        sortAlgos.push({
            linkText: value,
            type: key
        });
    }

    let links = sortAlgos.map((algo, i) => {
        return (
            <Link to={
                {
                    pathname: '/sort',
                    type: algo.type
                }
             } key={i}>
                <div className="dropdown-item">{algo.linkText}</div>
            </Link>
        );
    });

    return (
        <BrowserRouter>

            <Navbar className="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand>Home</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Sorting" id="sorting-collasible-nav-dropdown">
                        {links}
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

            <Switch>
                <Route exact path-="/" component={SortPage}/>
                <Route path="/sort" component={SortPage} />
            </Switch>
            
        </BrowserRouter>
    );
}

export default MainNavbar;