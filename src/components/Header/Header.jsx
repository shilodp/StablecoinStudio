import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">⚡</div>
                <div className="site-name">My DeFi Dashboard</div>
            </div>
            <div className="header-right">
                <div className="search-container" title="Coming soon">
                    <input type="text" placeholder="Search..." disabled />
                    <span className="search-icon">🔍</span>
                </div>
                <button className="wallet-btn" disabled title="Coming soon">
                    Connect Wallet
                </button>
            </div>
        </header>
    );
}

export default Header;
