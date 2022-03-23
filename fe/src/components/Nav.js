import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Nav = ({props}) => {
    const cookies = new Cookies();
    const categories = props;
    const authToken = cookies.get("token");
    
    return (
        <>
        <div className="navbar_container">
            <div className="logo_container">
                <Link to="/">
                    <h2>Stay Techy</h2>
                </Link>
            </div>
            <div className="nav_links_container">
                <ul className="categories_ul">
                    {!authToken ? (
                        <Link to="/signup">
                        <li>Sign Up / Login</li>
                        </Link>
                    ) : ""}
                    {categories.map((c, i) => (
                        <Link key={i} to={`/category/${c.attributes.category_name}`}>
                            <li key={i}>{c.attributes.category_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default Nav;