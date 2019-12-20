import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/loginPage";
import MainPage from "./components/pages/mainPage";
import RootPage from "./components/pages/rootPage";
import ChatWindow from "./components/pages/chatWindow";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        {/* <RootPage></RootPage> */}
        <div>
        <MainPage/>
          <Switch>
            <Route path="/" exact component={RootPage} />
            <Route path="/login" component={Login} />
            {/* <Route path="/main" component={MainPage} /> */}
          </Switch>
          </div>
       
      </Router>
    );
  }
}