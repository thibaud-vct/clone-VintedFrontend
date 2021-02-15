import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // useLocation,
} from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Product from "./containers/Product";
import Offers from "./containers/Offers";
import Publish from "./containers/Publish";
import Header from "./components/Header";

function App() {
    const [token, setToken] = useState(Cookies.get("loginToken") || null);
    const [user, setUser] = useState(false);
    const [modal, setModal] = useState(false);
    const [filters, setFilters] = useState();

    const setCookie = (valueToken) => {
        if (valueToken) {
            Cookies.set("loginToken", valueToken, { expires: 7 });
            setToken(valueToken);
        } else {
            Cookies.remove("loginToken");
            setToken(null);
        }
    };
    const modalVisibility = () => {
        setModal(!modal);
    };
    // const useQuery = () => {
    //     return new URLSearchParams(useLocation().search);
    // };
    // let query = useQuery();
    // filters={query.get("name")}

    return (
        <Router>
            <Header
                token={token}
                modal={modal}
                setUser={setUser}
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
