import React, { useContext, useState } from "react";
import "./Login.css";
import { toast } from 'react-hot-toast';
import { login } from "../../service/AuthService";
import { useNavigate } from 'react-router-dom'; // Fixed typo: usenavigate -> useNavigate
import { AppContext } from "../../context/AppContext";
import {load } from "./../../assets/load.jsx" // Import background image

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setAuthData } = useContext(AppContext);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(null); // Clear error on input change
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await login(data);
            console.log(response.status)
            if (response.status === 200) {
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.roll); // Fixed typo: roll -> role

                console.log("here is the data  :----    " + response.data.token, response.data.roll);

                setAuthData(response.data.token, response.data.roll);

                

                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            toast.error("Email/Password invalid");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="login-background"
            style={{ backgroundImage: `url(${load.pngtree1})` }} // Use pexels-photo-12935100.webp
        >
            <div className="d-flex align-items-center justify-content-center vh-100 w-100">
                <div className="card shadow-lg w-100 login-card">
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="card-title">Sign in</h1>
                            <p className="card-text text-muted">
                                Sign in below to access your account
                            </p>
                        </div>

                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="mt-4">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label text-muted">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="xyz@example.com"
                                        required
                                        onChange={onChangeHandler}
                                        value={data.email}
                                        aria-describedby="emailHelp"
                                    />
                                </div>

                                <div className="mb-4 position-relative">
                                    <label htmlFor="password" className="form-label text-muted">
                                        Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        required
                                        onChange={onChangeHandler}
                                        value={data.password}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y password-toggle"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-signin"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing in..." : "Sign in"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;