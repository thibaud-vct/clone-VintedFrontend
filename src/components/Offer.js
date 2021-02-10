import { Link } from "react-router-dom";

const Offer = ({ data }) => {
    // console.log("offer", data.owner.account.avatar.secure_url);
    const {
        _id,
        owner,
        product_name,
        product_price,
        product_description,
        product_pictures,
    } = data;
    return (
        <div className="offer">
            <Link to={`/product/${_id}`}>
                <div>
                    <img
                        src={owner.account.avatar.url}
                        alt="avatar"
                        className="avatar"
                    />
                    <span>{owner.account.username}</span>
                </div>
                <img src={product_pictures[0].url} alt="" />
            </Link>
            <div>
                <div>
                    <span>{product_price}</span>
                    <p>{product_name}</p>
                    <p>{product_description}</p>
                </div>
                <div>
                    <div>
                        <span>{"<3"}</span>
                        <span></span>
                    </div>
                    <span>Bousté</span>
                </div>
            </div>
        </div>
    );
};
export default Offer;
