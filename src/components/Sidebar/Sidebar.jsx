import coins from "@assets/icons/coins.svg";
import users from "@assets/icons/users.svg";
import fingerprint from "@assets/icons/fingerprint.svg";
import pricetag from "@assets/icons/pricetag.svg";
import documentIcon from "@assets/icons/document.svg";
import cog from "@assets/icons/cog.svg";
import instruments from "@assets/icons/instruments.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import Popup from "@components/Popup/Popup.jsx";
import TermsCondionsText from "@pages/Register/TermsCondionsText";
import PrivacyPolicyText from "@pages/Register/PrivacyPolicyText";
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
        icon: documentIcon,
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
const modalsRoot = document.getElementById("modals-root");

function Sidebar() {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

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
            <div className="sidebar-bottom">
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPrivacy(true);
                            }}
                        >
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowTerms(true);
                            }}
                        >
                            Terms and Conditions
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/OpenSourceIsFun"
                            target="_blank"
                        >
                            Our GitHub
                        </a>
                    </li>
                </ul>
            </div>

            {showPrivacy &&
                createPortal(
                    <Popup
                        header={<h2>Privacy Policy</h2>}
                        body={<PrivacyPolicyText />}
                        footer={
                            <button
                                className="button"
                                onClick={() => {
                                    setShowPrivacy(false);
                                }}
                            >
                                Close
                            </button>
                        }
                        closeHandler={() => {
                            setShowPrivacy(false);
                        }}
                    />,
                    modalsRoot,
                    "privacy-policy"
                )}

            {showTerms &&
                createPortal(
                    <Popup
                        header={<h2>Terms and Conditions</h2>}
                        body={<TermsCondionsText />}
                        footer={
                            <button
                                className="button"
                                onClick={() => {
                                    setShowTerms(false);
                                }}
                            >
                                Close
                            </button>
                        }
                        closeHandler={() => {
                            setShowTerms(false);
                        }}
                    />,
                    modalsRoot,
                    "terms-conditions"
                )}
        </aside>
    );
}

export default Sidebar;
