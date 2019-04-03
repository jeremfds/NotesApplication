import React, { Component, ReactNode } from 'react';
import Layout from './Layout';
import routes from '../routes';
import './App.scss';

class App extends Component {
    render(): ReactNode {
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

export default App;