import React, { ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';

import ShowNotes from '../components/Notes/ShowNotes';
import Create from '../components/Notes/Create';
import NotFound from '../components/NotFound';

const routes: ReactNode = (
    <Switch>
        <Route path="/" exact component={ShowNotes} />
        <Route path="/create" exact component={Create} />
        <Route component={NotFound} />
    </Switch>
);

export default routes;
