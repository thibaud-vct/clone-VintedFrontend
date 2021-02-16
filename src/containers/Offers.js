import { useState, useEffect } from "react";
import axios from "axios";
import Offer from "../components/Offer";

const Offers = ({ filters }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const params = { title: filters, sort: "price-desc" };

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
                const response = await axios
                    .get
                    // `https://my-first-api-vinted.herokuapp.com/offers?title=${searchInput}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}&page=${page}&limit=${limit}`
                    ();
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
