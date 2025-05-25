import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { addCategory } from '../../service/CategoryService.js';
import toast from 'react-hot-toast';
import './CategoryForm.css';
import { load } from '../../assets/load.jsx';

const CategoryForm = () => {
    const { categories, setCategories } = useContext(AppContext);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        discription: "",
        bgColor: "#29a97e",
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!image) {
            toast.error("Please upload an image");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);
        console.log(formData);



        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category added successfully.");
                setData({ name: "", discription: "", bgColor: "#ffffff" });
                setImage(null);
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category.");
        } finally {
            setLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container" style={{ maxheight: '500px', overflowY: 'auto', padding: '1rem' }}>
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            {/* File Upload */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img
                                        src={image ? URL.createObjectURL(image) : load.pngtree}
                                        alt="Upload"

                                        width="48"
                                        height="48"
                                        style={{ objectFit: 'cover', borderRadius: '8px' }}

                                    />
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    hidden
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>

                            {/* Name */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Enter name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    name="discription"
                                    id="discription"
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter discription"
                                    onChange={onChangeHandler}
                                    value={data.discription}
                                    required
                                ></textarea>
                            </div>

                            {/* Color Picker */}
                            <div className="mb-3">
                                <label htmlFor="bgColor" className="form-label">Pick a Color</label>
                                <input
                                    type="color"
                                    id="bgColor"
                                    name="bgColor"
                                    onChange={onChangeHandler}
                                    value={data.bgColor}
                                    className="form-control form-control-color"
                                    title="Choose your color"
                                    
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" disabled={loading} className="btn btn-primary">
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
