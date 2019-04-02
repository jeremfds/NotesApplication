import React, { ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';

import All from '../components/Notes/All';
import Create from '../components/Notes/Create';
import Show from '../components/Notes/Show';
import Edit from '../components/Notes/Edit';
import NotFound from '../components/NotFound';

const routes: ReactNode = (
    <Switch>
        <Route path="/" exact component={All} />
        <Route path="/create" exact component={Create} />
        <Route path="/show/:id" exact component={Show} />
        <Route path="/edit/:id" exact component={Edit} />
        <Route component={NotFound} />
    </Switch>
);

export default routes;
