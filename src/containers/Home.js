import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Offer from "../components/Offer";

const Home = ({ modalVisibility }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://my-first-api-vinted.herokuapp.com/offers`
                );
                setData(response.data);
                setIsLoading(true);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, []);

    return !isLoading ? (
        <p className="isLoading" />
    ) : (
        <div>
            <section className="hero">
                <div>
                    <p>Prêts à faire du tri dans vos placards ?</p>
                    {Cookies.get("loginToken") ? (
                        <Link to="/publish">
                            <button>Commencer à vendre</button>
                        </Link>
                    ) : (
                        <button onClick={modalVisibility}>
                            Commencer à vendre
                        </button>
                    )}
                </div>
            </section>
            <section className="offers">
                {data.offers.map((offer) => {
                    return <Offer key={offer._id} offer={offer} />;
                })}
            </section>
        </div>
    );
};
export default Home;
