import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Collapse, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../../../assets/images/logo.png';
import './Header.scss';

interface IProps {}

interface IState {
    isOpen: boolean;
}

class Header extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render(): ReactNode {
        return (
            <header>
                <Container>
                    <Navbar expand="md">
                        <NavbarBrand tag={Link} to="/" title="Easy Notes">
                            <img src={logo} alt="Easy Notes" />
                            <p className="slogan">Easy Notes</p>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className={this.state.isOpen ? 'open' : ''} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link}
                                             title="Homepage"
                                             to="/">
                                        Homepage
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link}
                                             title="Create a note"
                                             to="/create">
                                        Create a note
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </header>
        )
    }
}

export default Header;