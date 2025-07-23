import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "@store/authSlice";
import Popup from "@components/Popup/Popup.jsx";
import TermsCondionsText from "./TermsCondionsText";
import PrivacyPolicyText from "./PrivacyPolicyText";
import "./Register.css";

const modalsRoot = document.getElementById("modals-root");

function Register() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/newstable" replace />;
    }

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            login({
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
            })
        );
        navigate("/newstable");
    };

    return (
        <div className="register-page">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1 className="title">
                    Welcome to OpenStable Stablecoin Studio!
                </h1>
                <p className="subtitle">
                    Please provide your information and accept the terms &
                    conditions below to utilize the application
                </p>

                <label>
                    First Name<span>*</span>
                    <input
                        placeholder="Type here..."
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Last Name<span>*</span>
                    <input
                        placeholder="Type here..."
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Email<span>*</span>
                    <input
                        placeholder="Paste here..."
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Continue</button>

                <div className="legal-text">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPrivacy(true);
                        }}
                    >
                        Privacy Policy
                    </a>
                    <p>
                        By clicking Continue you agree to{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowTerms(true);
                            }}
                        >
                            Terms and Conditions
                        </a>
                    </p>
                </div>
            </form>

            {showPrivacy &&
                createPortal(
                    <Popup
                        title="Privacy Policy"
                        text={<PrivacyPolicyText />}
                        clickHandler={setShowPrivacy}
                    />,
                    modalsRoot,
                    "privacy-policy"
                )}

            {showTerms &&
                createPortal(
                    <Popup
                        title="Terms and Conditions"
                        text={<TermsCondionsText />}
                        clickHandler={setShowTerms}
                    />,
                    modalsRoot,
                    "terms-conditions"
                )}
        </div>
    );
}

export default Register;
