import { Link } from "react-router-dom";

const Offer = ({ offer }) => {
    // console.log("offer", offer);
    const {
        _id,
        owner,
        product_name,
        product_price,
        product_description,
        product_image,
    } = offer;
    return (
        <div className="offer">
            <Link to={`/offer/${_id}`}>
                <div>
                    {owner.account.avatar && (
                        <img
                            src={owner.account.avatar.url}
                            alt="avatar"
                            className="avatar"
                        />
                    )}
                    <span>{owner.account.username}</span>
                </div>
                <img src={product_image.secure_url} alt="" />
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
