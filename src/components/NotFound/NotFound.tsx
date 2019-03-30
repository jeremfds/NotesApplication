import React, { FunctionComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound: FunctionComponent = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="not-found text-center">
                        <h1 className="text-uppercase">404</h1>
                        <p className="page-not-available">Sorry, the page that your are looking for is not available.</p>
                        <Link to="/"
                              title="Go to homepage"
                              className="link-to-home">
                            Homepage
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
};

export default NotFound;