import logo from "@assets/icon.svg";
import search from "@assets/search.svg";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img src={logo} />
                </div>
            </div>
            <div className="header-right">
                <div className="site-name">Stablecoin Studio</div>
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
