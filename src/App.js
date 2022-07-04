import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/Patients/Patients";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={"/medicines"} exact component={Medicines} />
          <Route path={"/patients"} exact component={Patients} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
