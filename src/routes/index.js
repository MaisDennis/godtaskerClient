import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route'
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import UpdateProfile from '~/pages/Profile';

import CreateWorker from '~/pages/Worker/Create';
import ListWorkers from '~/pages/Worker/List';
import UpdateWorker from '~/pages/Worker/Update';

import CreateTask from '~/pages/Task/Create';
import ListTasks from '~/pages/Task/List';
import UpdateTasks from '~/pages/Task/Update'
import DetailTask from '~/pages/Task/Details';
import FilteredByWorkerListTasks from '~/pages/Task/FilteredByWorkerList';

import ListMessages from '~/pages/Messages/List';
import Tutorial from '~/pages/Tutorial';
import Privacy from '~/pages/Privacy';
// -----------------------------------------------------------------------------
export default function Routes() {
// -----------------------------------------------------------------------------
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/profile" exact component={UpdateProfile} isPrivate/>

      <Route path="/tasks" exact component={CreateTask} isPrivate/>
      <Route path="/dashboard" exact component={ListTasks} isPrivate/>
      <Route path="/dashboard/:id" exact component={FilteredByWorkerListTasks} isPrivate/>
      <Route path="/tasks/details/:id" exact component={DetailTask} isPrivate/>
      <Route path="/tasks/update/:id" exact component={UpdateTasks} isPrivate/>

      <Route path="/workers" exact component={CreateWorker} isPrivate/>
      <Route path="/workers/list" exact component={ListWorkers} isPrivate/>
      <Route path="/workers/update/:id" exact component={UpdateWorker} isPrivate/>

      <Route path="/messages" exact component={ListMessages} isPrivate/>

      <Route path="/tutorial" exact component={Tutorial} isPrivate/>
      <Route path="/privacy" exact component={Privacy}/>
    </Switch>
  );
}
