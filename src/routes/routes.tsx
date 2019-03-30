import React, { ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';

import Notes from '../components/Notes';
import NotFound from '../components/NotFound';

const routes: ReactNode = (
    <Switch>
        <Route path="/" exact component={Notes} />
        <Route component={NotFound} />
    </Switch>
);

export default routes;
