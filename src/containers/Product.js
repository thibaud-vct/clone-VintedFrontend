import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Product = (props) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const {
        product_pictures,
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
                    `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
                );
                setData(response.data);
                setIsValid(true);
            } catch (error) {
                alert = error.message;
            }
        };
        fetchData();
    }, []);

    console.log("Product", data);

    return !isValid ? (
        <div>en télechargement...</div>
    ) : (
        <div className="product">
            <div>
                {product_pictures.map((img) => {
                    return <img src={img.url} alt={product_name} />;
                })}
            </div>
            <div>
                <h2></h2>
                <div>
                    {product_details.map((detail, i) => {
                        const key = Object.keys(detail);
                        return (
                            <div>
                                <span>{key}</span>
                                <span>{detail[key]}</span>
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
                            src={owner.account.avatar.url}
                            alt="avatar"
                            className="avatar-m"
                        />
                        <span>{owner.account.username}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Product;
