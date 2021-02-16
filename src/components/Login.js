import { useState } from "react";
import axios from "axios";
const Login = ({ setCookie, modalVisibility }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            const response = await axios.post(
                "https://my-first-api-vinted.herokuapp.com/user/login",
                { email: email, password: password }
            );
            setCookie(response.data.token, response.data.account);
        };
        fetchData();
        modalVisibility();
    };

    return (
        <form
            action=""
            style={{ display: "flex", flexDirection: "column", width: 250 }}
            onSubmit={handleLogin}
        >
            <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button type="submit">Se connecter</button>
        </form>
    );
};
export default Login;
