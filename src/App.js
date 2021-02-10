import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Product from "./containers/Product";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/product/:id">
                    <Product />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
