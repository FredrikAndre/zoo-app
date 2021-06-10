
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Animals from './components/Animals';
import OneAnimal from './components/OneAnimal';
import PageNotFound from './components/PageNotFound';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Animals></Animals>
        </Route>
        <Route path="/animal/:id">
          <OneAnimal></OneAnimal>
        </Route>
        <Route path="*">
          <PageNotFound></PageNotFound>
        </Route>
    </Switch>
    </Router>

  );
}

export default App;
