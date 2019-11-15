import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main";
import Adpost from "./pages/Adpost";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Myads from "./pages/Myads";


//redux
import { Provider } from "react-redux";
import store from "./Store";        

function App() {

  return (
    // provider is a glue from react and redux, it takes the store which holds the state tree of the whole application
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/adpost" component={Adpost} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/myads/:id" component={Myads} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
