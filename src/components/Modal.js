import { useState } from "react";
import Signup from "../containers/Signup";
import Login from "../containers/Login";

const Modal = ({ modalVisibility, setCookie, setUser }) => {
    const [signup, setSignup] = useState(true);
    const switchSignupOrLogin = () => {
        setSignup(!signup);
    };
    return (
        <div className="modal">
            <div>
                <button onClick={modalVisibility}>Fermer</button>
                <div>
                    {signup ? (
                        <>
                            <Login
                                setCookie={setCookie}
                                setUser={setUser}
                                modalVisibility={modalVisibility}
                            />
                            <div>
                                <span>Vous n'avez pas de compte ? </span>
                                <button onClick={switchSignupOrLogin}>
                                    S'inscrire
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Signup
                                setCookie={setCookie}
                                setUser={setUser}
                                modalVisibility={modalVisibility}
                            />
                            <div>
                                <span>Vous avez un compte ? </span>
                                <button onClick={switchSignupOrLogin}>
                                    Connectez-vous
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Modal;
