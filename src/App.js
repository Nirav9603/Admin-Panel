import './App.css';
import { Route, Switch } from 'react-router-dom'
import Medicines from './containers/Medicines';
import Layout from './components/Layout';
import Doctors from './containers/Doctors';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/medicines'} exact component={Medicines} />
        <Route path={'/doctors'} exact component={Doctors} />
      </Switch>
    </Layout>
  );
}

export default App;
