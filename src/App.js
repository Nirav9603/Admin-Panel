import './App.css';
import { Route, Switch } from 'react-router-dom'
import Medicines from './containers/Medicines';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/medicines'} exact component={Medicines} />
      </Switch>
    </Layout>
  );
}

export default App;
