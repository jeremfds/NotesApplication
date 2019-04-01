import React, { FunctionComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Heart from '../../../../assets/images/heart.svg';
import './Footer.scss';

const Footer: FunctionComponent = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <div className="footer-container text-center">
                            <p>
                                Made with<img src={Heart} alt="Made with heart"/>by Jérémy
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};

export default Footer;