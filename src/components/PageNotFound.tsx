import { Link } from "react-router-dom";
import "./PageNotFoundstyle.css";

const PageNotFound = () => {
    return (
        <div className="errorcontainer">
            <div className="textcontainer">
                <h1 className="errortext">Oj då! Något gick fel.</h1>
                <Link to="/" className="linktostart">Klicka här för att gå till startsidan.</Link>
            </div>
        </div>
    )
}

export default PageNotFound
