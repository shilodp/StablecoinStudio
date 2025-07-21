import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "@store/authSlice";
import Popup from "@components/Popup/Popup.jsx";
import "./Register.css";

const modalsRoot = document.getElementById("modals-root");
function PrivacyPolicyText() {
    return (
        <>
            <h3>Privacy Policy</h3>

            <p>
                We value your privacy. This Privacy Policy describes how your
                personal information is collected, used, and shared when you
                visit or register on our site.
            </p>

            <h4>Information We Collect</h4>
            <ul>
                <li>
                    Personal information you provide during registration (name,
                    email)
                </li>
                <li>
                    Technical data such as IP address, browser type, and usage
                    statistics
                </li>
            </ul>

            <h4>How We Use Your Information</h4>
            <p>
                We use your data to provide and improve our services. We do not
                sell or share your information with third parties, except as
                required by law.
            </p>

            <h4>Your Rights</h4>
            <p>
                You may request access to or deletion of your personal data at
                any time by contacting us.
            </p>

            <p>By using our services, you agree to this privacy policy.</p>
        </>
    );
}
function TermsCondionsText() {
    return (
        <>
            <h3>Terms and Conditions</h3>

            <p>
                These Terms and Conditions govern your use of our website. By
                accessing or using our service, you agree to be bound by these
                terms.
            </p>

            <h4>Use of Service</h4>
            <p>
                You agree to use the service only for lawful purposes and not to
                engage in any harmful, fraudulent, or abusive behavior.
            </p>

            <h4>User Accounts</h4>
            <p>
                When you create an account, you must provide accurate
                information. You are responsible for safeguarding your account
                credentials.
            </p>

            <h4>Intellectual Property</h4>
            <p>
                All content and trademarks on this site belong to their
                respective owners. You may not reuse them without permission.
            </p>

            <h4>Changes</h4>
            <p>
                We reserve the right to modify these terms at any time.
                Continued use of the site means you accept the updated terms.
            </p>

            <p>
                If you do not agree with any part of these terms, you must
                discontinue using the service.
            </p>
        </>
    );
}

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
