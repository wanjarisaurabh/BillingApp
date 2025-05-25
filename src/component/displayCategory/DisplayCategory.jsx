import React from 'react';
import Categories from '../categories/Categories.jsx';

const DisplayCategory = ({ categories, selectedCategory, setSelectedCategory }) => {
    const onGet = (id) => {
        setSelectedCategory(id);
        console.log("Selected ID:", id);
    };

    // Total number of items in all categories
    const totalItems = categories.reduce((acc, cat) => acc + cat.items, 0);

    return (
        <div className="container py-4">
            <div className="row g-4">
                {/* All Categories */}
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Categories
                        categoryName="All Categories"
                        imgUrl=""
                        numberOfItems={totalItems}
                        bgColor="#e0e0e0"
                        onClick={() => onGet("")}
                        isSelected={selectedCategory === ""}
                    />
                </div>

                {/* Individual Categories */}
                {categories.map((category) => (
                    <div key={category.categoryId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Categories
                            categoryName={category.name}
                            imgUrl={category.imgUrl}
                            numberOfItems={category.items}
                            bgColor={category.bgColor || "#f8f9fa"}
                            onClick={() => onGet(category.categoryId)}
                            isSelected={selectedCategory === category.categoryId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayCategory;
