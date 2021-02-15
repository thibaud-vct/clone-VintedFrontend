import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import noImage from "../assets/img/no-image.jpg";

const Publish = ({ user }) => {
    const token = Cookies.get("loginToken");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [files, setFiles] = useState({});
    const [newData, setNewData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitNewOffer = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("picture", files);

        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://my-first-api-vinted.herokuapp.com/offer/publish",
                    formData,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                setNewData(response.data);
                setIsLoading(true);
            } catch (error) {
                // créer route 404
                alert(error.message);
            }
        };
        fetchData();
    };

    return isLoading ? (
        <Redirect to={`/offer/${newData.newOffer._id}`} />
    ) : (
        <form className="product" onSubmit={handleSubmitNewOffer}>
            <div>
                <img src={noImage} alt="array grey" />
                <input
                    type="file"
                    onChange={(e) => setFiles(e.target.files[0])}
                />
            </div>
            <div>
                <div>
                    {user.avatar && (
                        <img
                            src={user.avatar.url}
                            alt="avatar"
                            className="avatar-m"
                        />
                    )}

                    <span>{user.username}</span>
                </div>

                <div>
                    <div>
                        <span>MARQUE</span>
                        <span>
                            <input
                                type="text"
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </span>
                    </div>
                    <div>
                        <span>TAILLE</span>
                        <span>
                            <input
                                type="text"
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </span>
                    </div>
                    <div>
                        <span>ÉTAT</span>
                        <span>
                            <input
                                type="text"
                                onChange={(e) => setCondition(e.target.value)}
                            />
                        </span>
                    </div>
                    <div>
                        <span>COULEUR</span>
                        <span>
                            <input
                                type="text"
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </span>
                    </div>
                    <div>
                        <span>EMPLACEMENT</span>
                        <span>
                            <input
                                type="text"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </span>
                    </div>
                </div>
                <hr />
                <div>
                    <h3>Nom : </h3>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p>Descrition : </p>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <p>Prix : </p>
                    <input
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <button onSubmit="">Publier</button>
                </div>
            </div>
        </form>
    );
};
export default Publish;
