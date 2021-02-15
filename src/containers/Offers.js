import { useState, useEffect } from "react";

import axios from "axios";
import Offer from "../components/Offer";

const Offers = ({ filters }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const params = { title: filters };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://my-first-api-vinted.herokuapp.com/offers`,
                    {
                        params,
                        paramsSerializer: function paramsSerializer(params) {
                            // "Hide" the `answer` param
                            return Object.entries(
                                Object.assign({}, params, { answer: "HIDDEN" })
                            )
                                .map(([key, value]) => `${key}=${value}`)
                                .join("&");
                        },
                    }
                );
                setData(response.data);
                setIsLoading(true);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, [filters]);

    console.log("filters =>", params);

    return !isLoading ? (
        <p className="isLoading" />
    ) : (
        <div>
            <section className="filters">
                <div></div>
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
