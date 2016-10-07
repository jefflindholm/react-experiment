// @flow
import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Jumbotron, Button } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        const version = 1;
        return (
            <div>
                <div>
                    <Navbar inverse fixedTop>
                        <Grid>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/">React eShop {version}</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    <NavItem href="//github.com/manavsehgal/react-eshop">Original Code</NavItem>
                                    <NavItem href="//bitbucket.org/Team-Lindholm/experimental">My Code</NavItem>
                                    <NavItem href="//leanpub.com/reacteshop">Book</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Grid>
                    </Navbar>
                    <Jumbotron>
                        <Grid>
                            <h1>Easily Reuse eShop in React</h1>
                            <p>eShop written in React, ES6, Firebase</p>
                            <p><Button bsStyle="success" bsSize="large">Learn More</Button></p>
                        </Grid>
                    </Jumbotron>
                </div>
                <div>some text</div>
            </div>
        );
    }
}

export default App;
