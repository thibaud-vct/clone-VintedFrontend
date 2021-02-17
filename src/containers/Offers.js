import { useState, useEffect } from "react";
import axios from "axios";
import Offer from "../components/Offer";

const Offers = ({ filters }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // let params = "";
            // if (param1) {
            //     params = params + "param1=toto";
            // }
            // if (param2) {
            //     params = params + "param2=tata";
            // }
            try {
                const response = await axios.get(
                    `https://my-first-api-vinted.herokuapp.com/offers?title=${filters}`
                );
                setData(response.data);
                setIsLoading(true);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, [filters]);

    return !isLoading ? (
        <p className="isLoading" />
    ) : (
        <div>
            <section className="filters">
                <div>Filtre à refaire</div>
            </section>
            <section className="offers">
                {data.offers.map((offer) => {
                    return <Offer key={offer._id} offer={offer} />;
                })}
            </section>
        </div>
    );
};
export default Offers;
