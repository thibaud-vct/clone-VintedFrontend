import { useState, useEffect } from "react";
import axios from "axios";
import Offer from "../components/Offer";

const Home = (props) => {
    const [data, setData] = useState([]);
    const [isValid, setIsValid] = useState(false);
    // "https://my-first-api-vinted.herokuapp.com/offers"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://lereacteur-vinted-api.herokuapp.com/offers"
                );
                setData(response.data);
                setIsValid(true);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, []);

    console.log("home", data.offers); // Data à la Home Page

    return !isValid ? (
        <div>en télechargement...</div>
    ) : (
        <div>
            <section>
                <div>
                    <p>Prêts à faire du tri dans vos placards ?</p>
                    <button>Commencer à vendre</button>
                </div>
            </section>
            <section className="offers">
                {data.offers.map((offer) => {
                    return <Offer key={offer._id} data={offer} />;
                })}
            </section>
        </div>
    );
};
export default Home;
