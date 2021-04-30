import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route'
import LandIn from '~/pages/LandIn';
import LandInBr from '~/pages/LandInBr';
import SignInPhonenumber from '~/pages/SignInPhonenumber';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import UpdateProfile from '~/pages/Profile';

import CreateWorker from '~/pages/Worker/Create';
import ListContacts from '~/pages/Worker/List';
import UpdateWorker from '~/pages/Worker/Update';

import CreateTask from '~/pages/Task/Create';
import ListTasks from '~/pages/Task/List';
import UpdateTasks from '~/pages/Task/Update'
import DetailTask from '~/pages/Task/Details';
import FilteredByWorkerListTasks from '~/pages/Task/FilteredByWorkerList';

import Tutorial from '~/pages/Tutorial';
import Privacy from '~/pages/Privacy';
// -----------------------------------------------------------------------------
export default function Routes() {
// -----------------------------------------------------------------------------
  return (
    <Switch>
      <Route path="/en" exact component={LandIn} />
      <Route path="/" exact component={LandInBr} />
      <Route path="/login" exact component={SignInPhonenumber} />
      <Route path="/password" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/profile" exact component={UpdateProfile} isPrivate/>

      <Route path="/tasks" exact component={CreateTask} isPrivate/>
      <Route path="/dashboard" exact component={ListTasks} isPrivate/>
      <Route path="/dashboard/:id" exact component={FilteredByWorkerListTasks} isPrivate/>
      <Route path="/tasks/details/:id" exact component={DetailTask} isPrivate/>
      <Route path="/tasks/update/:id" exact component={UpdateTasks} isPrivate/>

      <Route path="/contact-list" exact component={CreateWorker} isPrivate/>
      <Route path="/contact-list/list" exact component={ListContacts} isPrivate/>
      <Route path="/contact-list/update/:worker_name" exact component={UpdateWorker} isPrivate/>

      <Route path="/tutorial" exact component={Tutorial} isPrivate/>
      <Route path="/privacy" exact component={Privacy}/>
    </Switch>
  );
}
