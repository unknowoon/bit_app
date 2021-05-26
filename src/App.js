import React from "react";
import CoinChart from "./components/coinChart";
import Welcome from "./Welcome";
import Loading from './components/Loading';
import { HashRouter, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/coinfx" component={CoinChart} />
      <Route exact path="/loading" component={Loading} />
    </HashRouter>

  );
}

export default App;
