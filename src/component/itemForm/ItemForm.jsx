import React, { useContext, useState } from 'react';
import { load } from '../../assets/load';
import { AppContext} from './../../context/AppContext';
import toast from 'react-hot-toast';
import { addItem } from '../../service/ItemService';

const ItemForm = () => {
    const { categories, item, setItem, setCategories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        description: "",
        price: "",
    });

    const onChangeHandler = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setImage(files[0]);
        } else {
            setData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Select image first!");
            return;
        }
        setLoading(true);
        const formData = new FormData(); // ✅ moved inside handler to avoid reuse bugs

        formData.append("item", JSON.stringify(data));
        formData.append("file", image);
        console.log(formData)

        try {
            const response = await addItem(formData);
            if (response.status === 201) {
                setItem([...item, response.data]); // ✅ added item to context
                toast.success("Item added successfully");
                setCategories((prev) => prev.map((category) => category.categoryId == data.categoryId ? { ...category, item: category.item + 1 } : category))

                // ✅ reset form state
                setData({
                    name: "",
                    categoryId: "",
                    description: "",
                    price: "",
                });
                setImage(null);
            } else {
                toast.error("Unable to add item");
            }
        } catch (error) {
            toast.error("Error adding item");
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '450px' }}>
                <form onSubmit={onSubmitHandler}>
                    {/* Image Upload and Preview */}
                    <div className="mb-3 text-center">
                        <label htmlFor="imageUpload" style={{ cursor: 'pointer' }}>
                            <img
                                src={image ? URL.createObjectURL(image) : load.pngtree}
                                alt="Upload"
                                width="64"
                                height="64"
                                style={{ objectFit: 'cover', borderRadius: '8px', border: '2px solid #ccc' }}
                            />
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="imageUpload"
                            name="image"
                            onChange={onChangeHandler}
                            className="d-none"
                        />
                    </div>

                    {/* Item Name */}
                    <div className="mb-3">
                        <label htmlFor="itemName" className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="itemName"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder="Item Name"
                            required
                        />
                    </div>

                    {/* Category Select */}
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label fw-semibold">Category</label>
                        <select
                            className="form-select"
                            id="category"
                            name="categoryId"
                            value={data.categoryId}
                            onChange={onChangeHandler}
                            required
                        >
                            <option value="">--SELECT CATEGORY--</option>
                            {categories.map((category) => (
                                <option value={category.categoryId} key={category.categoryId}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label fw-semibold">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder="₹0.00"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label fw-semibold">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            placeholder="Write content here..."
                            name="description"
                            onChange={onChangeHandler}
                            value={data.description}
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className="btn btn-warning w-100 fw-bold">
                        {loading ? "Loading..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ItemForm;
