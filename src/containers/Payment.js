import { useParams } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";

const Payment = () => {
    const { id } = useParams();
    const stripe = useStripe();
    const elements = useElements();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const stripeResponse = await stripe.createToken(
                elements.getElement(CardElement),
                { name: data.owner._id }
            );
            const stripeToken = stripeResponse.token.id;

            const formData = new FormData();
            formData.append("stripeToken", stripeToken);
            formData.append("offer_id", id);
            formData.append("user_id", data.owner._id);

            const response = await axios.post(
                "https://my-first-api-vinted.herokuapp.com/offer/payment/",
                formData
            );
            if (response.status === 200) {
                setSucceeded(true);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://my-first-api-vinted.herokuapp.com/offer/${id}`
                );
                setData(response.data);
                setIsLoading(true);
            } catch (error) {
                // créer route 404
                alert(error.message);
            }
        };
        fetchData();
    }, [id]);

    return !isLoading ? (
        <p className="isLoading" />
    ) : (
        <div className="payment">
            <div>
                <div>
                    <span>{data.product_name}</span>
                    <span>taille : </span>
                    <span>
                        {data.product_details.map((elem, i) => {
                            const key = Object.keys(elem);
                            return (
                                key[0] === "TAILLE" && (
                                    <div key={i}>
                                        <span>{elem[key]}</span>
                                    </div>
                                )
                            );
                        })}
                    </span>
                </div>
                <span>{data.product_price}€</span>
            </div>
            {!succeeded ? (
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "14px",
                                    color: "#black",
                                    "::placeholder": {
                                        color: "#09b1ba",
                                    },
                                },
                                invalid: {
                                    color: "#09b1ba",
                                },
                            },
                        }}
                    />
                    <button type="submit">Payer</button>
                </form>
            ) : (
                <span>Paiement effectué !</span>
            )}
        </div>
    );
};
export default Payment;
