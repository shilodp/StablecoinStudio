import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const links = [
    { name: "Operations", icon: "⚙️", path: "#", disabled: true },
    { name: "Transactions explorer", icon: "🔍", path: "#", disabled: true },
    { name: "Fees management", icon: "💰", path: "#", disabled: true },
    {
        name: "Exchange and Pool management",
        icon: "🔄",
        path: "#",
        disabled: true,
    },
    {
        name: "Reserves and liquidity control",
        icon: "🏦",
        path: "#",
        disabled: true,
    },
    { name: "Settings", icon: "⚙️", path: "#", disabled: true },
    {
        name: "Stablecoin Studio",
        icon: "🧪",
        path: "/stablecoin",
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
                                    <span className="icon">{link.icon}</span>
                                    {link.name}
                                </div>
                            ) : (
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        "nav-item" + (isActive ? " active" : "")
                                    }
                                >
                                    <span className="icon">{link.icon}</span>
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
