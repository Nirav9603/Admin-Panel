import { Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin'
import Medicines from './containers/Medicines/Medicines'
import Patient from './containers/Patient/Patient'

function App() {
  return (
    <>
      <Admin>
        <Switch>
          <Route path={"/medicines"} exact component={Medicines} />
          <Route path={"/patient"} exact component={Patient} />
        </Switch>
      </Admin>
    </>
  );
}

export default App;
