import React, { useState } from 'react';
import { addUser } from '../../service/UserService';
import toast from 'react-hot-toast';

const UserForm = ({ setUser }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(data); // For debugging

        try {
            const response = await addUser(data);
            setUser((users) => [...users, response.data]);
            toast.success("User added successfully");
            setData({
                name: "",
                email: "",
                password: "",
                role: "ROLE_USER"
            });
        } catch (error) {
            console.error(error);
            toast.error("Error while adding user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={onSubmitHandler}>
                    {/* Name Field */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            onChange={onChangeHandler}
                            value={data.name}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="yourname@example.com"
                            onChange={onChangeHandler}
                            value={data.email}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="************"
                            onChange={onChangeHandler}
                            value={data.password}
                            required
                        />
                    </div>

                    {/* Save Button */}
                    <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={loading}>
                        {loading ? "LOADING..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
