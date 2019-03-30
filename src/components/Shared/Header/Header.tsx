import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import logo from '../../../../assets/images/logo.png';
import './Header.scss';

class Header extends Component {
    render(): ReactNode {
        return (
            <header>
                <Container>
                    <Navbar>
                        <NavbarBrand tag={Link} to="/" title="Easy Notes">
                            <img src={logo} alt="Easy Notes" />
                            <p className="slogan">Easy Notes</p>
                        </NavbarBrand>
                    </Navbar>
                </Container>
            </header>
        )
    }
}

export default Header;