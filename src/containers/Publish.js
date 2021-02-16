import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import noImage from "../assets/img/no-image.jpg";
import avatar from "../assets/img/avatar.jpg";

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
    const [files, setFiles] = useState();
    const [newData, setNewData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitNewOffer = async (e) => {
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

    return isLoading ? (
        <Redirect to={`/offer/${newData.newOffer._id}`} />
    ) : (
        <>
            <div className="userPublish">
                <img
                    src={user.avatar ? user.avatar.url : avatar}
                    alt="avatar"
                    className="avatar-m"
                />
                <span>{user.username}</span>
            </div>
            <form className="newOffer" onSubmit={handleSubmitNewOffer}>
                <label htmlFor="uploadFile">
                    <img
                        src={files ? URL.createObjectURL(files) : noImage}
                        alt="array grey"
                    />
                    <span>
                        {files ? "Modifier l'image" : "Télécharger une image"}
                    </span>
                </label>
                <input
                    accept="image/*"
                    id="uploadFile"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => setFiles(e.target.files[0])}
                />

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
                    <div>
                        <span>Nom : </span>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Descrition : </span>
                        <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Prix : </span>
                        <input
                            type="text"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Publier</button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Publish;
