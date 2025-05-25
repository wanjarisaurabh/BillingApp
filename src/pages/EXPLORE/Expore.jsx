import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Explore.css';
import { AppContext } from '../../context/AppContext.jsx';
import DisplayCategory from '../../component/displayCategory/DisplayCategory.jsx';
import DisplayItems from '../../component/displayItems/DisplayItems.jsx';
import CustomerForm from '../../component/customerForm/CustomerForm.jsx';
import CartItem from '../../component/cartitems/CartItem.jsx';
import CartSummary from './../../component/cartSummary/CartSummary';

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

  console.log(categories)

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row">
          <DisplayCategory
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <hr className="horizontal-line" />

        <div className="second-row">
          <DisplayItems selectedCategory={selectedCategory} />
        </div>
      </div>

      <div className="right-column d-flex flex-column">
        <div className="customer-form" style={{ height: "15%" }}>
          <CustomerForm
            customerMobile={customerMobile}
            setCustomerMobile={setCustomerMobile}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </div>
        <hr className="my-3 text-light" />
        <div className="cart-items-container" style={{ height: "55%", overflowY: "auto" }}>
          <CartItem />
        </div>
        <div className="cart-summary-container" style={{ height: "30%" }}>
          <CartSummary
            customerMobile={customerMobile}
            setCustomerMobile={setCustomerMobile}
            customerName={customerName}
            setCustomerName={setCustomerName} />
        </div>
      </div>
    </div>
  );
};

export default Explore;
