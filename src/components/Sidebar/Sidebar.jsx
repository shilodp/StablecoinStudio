import coins from "@assets/icons/coins.svg";
import users from "@assets/icons/users.svg";
import fingerprint from "@assets/icons/fingerprint.svg";
import pricetag from "@assets/icons/pricetag.svg";
import document from "@assets/icons/document.svg";
import cog from "@assets/icons/cog.svg";
import instruments from "@assets/icons/instruments.svg";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const links = [
    { name: "Operations", icon: coins, path: "#", disabled: true },
    { name: "Transactions explorer", icon: users, path: "#", disabled: true },
    { name: "Fees management", icon: fingerprint, path: "#", disabled: true },
    {
        name: "Exchange and Pool management",
        icon: pricetag,
        path: "#",
        disabled: true,
    },
    {
        name: "Reserves and liquidity control",
        icon: document,
        path: "#",
        disabled: true,
    },
    { name: "Settings", icon: cog, path: "#", disabled: true },
    {
        name: "New Stable",
        icon: instruments,
        path: "/newstable",
        disabled: false,
    },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.name}>
                            {link.disabled ? (
                                <div
                                    className="nav-item disabled"
                                    title="Coming soon"
                                >
                                    <span className="icon">
                                        <img src={link.icon} />
                                    </span>
                                    {link.name}
                                </div>
                            ) : (
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        "nav-item" + (isActive ? " active" : "")
                                    }
                                >
                                    <span className="icon">
                                        <img src={link.icon} />
                                    </span>
                                    {link.name}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
