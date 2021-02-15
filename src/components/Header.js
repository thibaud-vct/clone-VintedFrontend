import { Link, useHistory } from "react-router-dom";
import logo from "../assets/img/logo.jpg";
import Modal from "../components/Modal";
import Filters from "../components/Filters";

const Header = ({
    token,
    modal,
    setUser,
    setCookie,
    setFilters,
    modalVisibility,
    setModal,
}) => {
    const history = useHistory();

    return (
        <>
            {modal && (
                <Modal
                    modalVisibility={modalVisibility}
                    modal={modal}
                    setUser={setUser}
                    setModal={setModal}
                    setCookie={setCookie}
                />
            )}
            <header>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Filters setFilters={setFilters} />
                <div>
                    {token ? (
                        <button
                            className="login"
                            onClick={() => {
                                setCookie(null);
                                history.push("/");
                            }}
                        >
                            Déconnecter
                        </button>
                    ) : (
                        <>
                            <button className="login" onClick={modalVisibility}>
                                S'inscrire | Se connecter
                            </button>
                        </>
                    )}
                    <button>Vends tes articles</button>
                </div>
            </header>
        </>
    );
};
export default Header;
