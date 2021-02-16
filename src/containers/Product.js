import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import avatar from "../assets/img/avatar.jpg";
import axios from "axios";

const Product = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {
        product_image,
        product_name,
        product_description,
        product_details,
        product_price,
        owner,
    } = data;

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
        <div className="product">
            <div>
                <img src={product_image.secure_url} alt={product_name} />
            </div>
            <div>
                <h2>{product_price}</h2>
                <div>
                    {product_details.map((detail, i) => {
                        const key = Object.keys(detail);
                        return (
                            <div key={i}>
                                <span>{key[0]}</span>
                                <span>{detail[key[0]]}</span>
                            </div>
                        );
                    })}
                </div>
                <hr />
                <div>
                    <h3>{product_name}</h3>
                    <p>{product_description}</p>
                    <div>
                        <img
                            src={
                                owner.account.avatar
                                    ? owner.account.avatar.url
                                    : avatar
                            }
                            alt="avatar"
                            className="avatar-m"
                        />
                        <span>{owner.account.username}</span>
                    </div>
                </div>
                <hr />
                <Link to={`/payment/${id}`}>
                    <button>Acheter</button>
                </Link>
            </div>
        </div>
    );
};
export default Product;
