import React from 'react';
import './categories.css';

const Categories = ({ categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick }) => {
    return (
        <div
            className="card category-card text-white d-flex align-items-center position-relative"
            style={{ backgroundColor: bgColor, cursor: 'pointer' }}
            onClick={onClick}
            role="button"
        >
            {isSelected && <div className="active-category-dot"></div>}

            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center w-100">
                <img src={imgUrl} alt={categoryName} className="category-img mb-2" />
                <h6 className="card-title category-title">{categoryName}</h6>
                <p className="card-text small">{numberOfItems} Items</p>
            </div>
        </div>
    );
};

export default Categories;
