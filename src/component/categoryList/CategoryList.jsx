import React, { useState, useContext } from "react";
import "./CategoryList.css"; // Ensure your CSS file exists and is properly styled
import { AppContext } from "../../context/AppContext.jsx"; // Adjust the import path if needed
import { deleteCategory } from "../../service/CategoryService.js";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext); // Assuming categories is provided in AppContext
  const [searchTerm, setSearchTerm] = useState(""); // Corrected typo in state name

  // Filter categories based on the search term
  const filteredCategories = categories
    ? categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];
  console.log("Filtered Categories:", filteredCategories); // Debugging line


  const deleteByCategoryId = async (categoryId) => {
    // Optimistically update UI
    const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
    setCategories(updatedCategories);//it takes time also it works in async function

    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully.");
    } catch (error) {
      // Revert the UI on failure
      setCategories(categories); // Revert to original
      if (error.response) {
        console.error("Server Error:", error.response.data);
        toast.error("Failed to delete category.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server.");
      } else {
        console.error("Axios error:", error.message);
        toast.error("An error occurred.");
      }
    }
  };






  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {/* Search Bar */}
      <div className="search-bar input-group mb-3">
        <input
          type="text"
          name="keyword"
          id="keyword"
          className="form-control"
          placeholder="Search categories..."
          onChange={(e) => setSearchTerm(e.target.value)} // Corrected state update
          value={searchTerm}
        />
        <span className="input-group-text bg-warning">
          <i className="bi bi-search search-icon"></i>
        </span>
      </div>

      {/* Category List */}
      <div className="row g-3 pe-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div key={index} className="col-12">
              <div
                className="card p-3"
                style={{ backgroundColor: category.bgColor }}
              >
                <div className="d-flex align-items-center">
                  {/* Image Section */}
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={category.imgUrl}
                      alt={category.name}
                      className="category-img"
                    />
                  </div>

                  {/* Category Info */}
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{category.name}</h5>
                    <p className="mb-0 text-white">{category.items} Items</p>
                  </div>

                  {/* Delete Button */}
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteByCategoryId(category.categoryId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;