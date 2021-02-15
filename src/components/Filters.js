import { useState } from "react";
import { useHistory } from "react-router-dom";

const Filters = ({ setFilters }) => {
    const [search, setSearch] = useState();
    const history = useHistory();
    // setFilters(search);
    const handleSearch = (e) => {
        e.preventDefault();
        setFilters(search);
        history.push(`/offers/${search}`);
    };
    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    type="serach"
                    name="research"
                    placeholder="Recherche des articles"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input type="submit" style={{ display: "none" }} />
            </form>
        </>
    );
};
export default Filters;
