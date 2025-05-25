import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addItem = async (formdata) => {
    console.log(formdata);
    return await axios.post(`${API_URL}/admin/items`, formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_URL}/admin/items/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};

export const fetchItem = async () => {
    return await axios.get(`${API_URL}/items`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};
