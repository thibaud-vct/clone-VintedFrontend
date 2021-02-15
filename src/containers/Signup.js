import { useState } from "react";
import axios from "axios";
const Signup = ({ setCookie, modalVisibility, setUser }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordIsComfirmed, SetasswordIsComfirmed] = useState(true);

    const passwordIsIdem = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return SetasswordIsComfirmed(false);
        } else {
            return SetasswordIsComfirmed(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        passwordIsIdem(password, confirmPassword);
        if (!passwordIsComfirmed) {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        "https://my-first-api-vinted.herokuapp.com/user/signup",
                        {
                            username: username,
                            email: email,
                            password: password,
                        }
                    );
                    setCookie(response.data.token);
                    setUser(response.data.account);
                } catch (error) {
                    // créer page 404
                    alert(error.message);
                }
            };
            fetchData();
            modalVisibility();
        }
    };

    return (
        <form
            action=""
            style={{ display: "flex", flexDirection: "column", width: 250 }}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="name"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type="email"
                name="email"
                placeholder="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                style={{
                    backgroundColor: !passwordIsComfirmed
                        ? "lightcoral"
                        : "none",
                }}
            />
            <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="confirm password"
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
                style={{
                    backgroundColor: !passwordIsComfirmed
                        ? "lightcoral"
                        : "none",
                }}
            />
            <button type="submit">S'inscrire</button>
        </form>
    );
};
export default Signup;
