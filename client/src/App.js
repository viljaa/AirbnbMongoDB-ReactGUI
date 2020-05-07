import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/*Import components*/
import Frontpage from './components/Frontpage/Frontpage';
import Manage from './components/Manage/Manage';

const App = () => (
  <Router>
    <Switch>
      <Route path='/' exact component = {Frontpage} />
      <Route path='/manage' exact component = {Manage} />
    </Switch>
  </Router>
);

export default App;
