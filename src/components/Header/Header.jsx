import logo from "@assets/icon.svg";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <Link className="logo" to="/">
                    <img src={logo} />
                </Link>
            </div>
            <div className="header-right">
                <div className="site-name">New Stable</div>
                <input
                    className="search-input"
                    title="Coming soon"
                    type="text"
                    placeholder="Search for something"
                    disabled
                />
                <button className="wallet-btn" disabled title="Coming soon">
                    Connect Wallet
                </button>
            </div>
        </header>
    );
}

export default Header;
