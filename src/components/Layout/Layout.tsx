import React, { FunctionComponent, ReactNode } from 'react';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

interface IProps {
    children: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({children}) => {
    return (
        <div id="wrap" className="wrap">
            <Header />
            <main role="main">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
