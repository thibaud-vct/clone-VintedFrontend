import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import Payment from "./containers/Payment";
import Publish from "./containers/Publish";
import Product from "./containers/Product";
import Home from "./containers/Home";

function App() {
    const stripePromise = loadStripe(
        "pk_test_51ILXm3HbTP22xOZe6WdZyePpW6NM2Sh8AH9Gda9tb69eGKJkSMaRiHZm5Itmljr97n6PERQXrPOrDqSYxAOJHmWQ00Q2yQ8iEc"
    );
    const [modal, setModal] = useState(false);
    const [filters, setFilters] = useState();
    const [token, setToken] = useState(Cookies.get("loginToken") || null);
    const [user, setUser] = useState(
        { username: localStorage.getItem("_user") } || null
    );

    const modalVisibility = () => setModal(!modal);
    const setCookie = (valueToken, accountUser) => {
        if (valueToken) {
            Cookies.set("loginToken", valueToken, { expires: 7 });
            localStorage.setItem("_user", accountUser.username);
            setToken(valueToken);
            setUser({ username: accountUser });
        } else {
            Cookies.remove("loginToken");
            localStorage.clear();
            setToken(null);
            setUser(null);
        }
    };

    return (
        <Router>
            <Header
                token={token}
                modal={modal}
                setCookie={setCookie}
                setModal={setModal}
                setFilters={setFilters}
                modalVisibility={modalVisibility}
            />
            <Switch>
                <Route path="/offers">
                    <Offers filters={filters} />
                </Route>
                <Route path="/publish">
                    <Publish user={user} />
                </Route>
                <Route path="/payment/:id">
                    <Elements stripe={stripePromise}>
                        <Payment />
                    </Elements>
                </Route>
                <Route path="/offer/:id">
                    <Product />
                </Route>
                <Route path="/">
                    <Home modalVisibility={modalVisibility} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
