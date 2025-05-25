import './ReceiptPopUp.css';
import React from 'react';

const ReceiptPopUp = ({ orderDetails, onClose, onPrint }) => {
  if (!orderDetails) return null;

  const paymentDetails = orderDetails.paymentDetails || {};

  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success fs-1"></i>
        </div>

        <h3 className="text-center mb-4">Order Receipt</h3>

        <p>
          <strong>Order ID:</strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails.phoneNumber}
        </p>

        <hr className="my-3" />
        <h5 className="mb-3">Items Ordered</h5>

        {orderDetails.items && orderDetails.items.map((item, index) => (
          <div key={index} className="d-flex justify-content-between mb-2">
            <span>{item.name} x{item.quntity}</span>
            <span>₹{(item.price * item.quntity).toFixed(2)}</span>
          </div>
        ))}

        {console.log(orderDetails)}

        <div className="mt-3">
          <div className="d-flex justify-content-between mb-2">
            <strong>Subtotal:</strong>
            <span>₹{orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong>Tax:</strong>
            <span>₹{orderDetails.tax.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong>Total:</strong>
            <span>₹{orderDetails.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between mb-2">
          <strong>Payment Method:</strong>
          <span>{orderDetails.paymentMethod}</span>
        </div>


        {paymentDetails.razorpayOrderId && (
          <>
            <hr className="my-3" />
            <h5 className="mb-2">Payment Details</h5>
            <p><strong>Razorpay Order ID:</strong> {paymentDetails.razorpayOrderId}</p>
            <p><strong>Razorpay Payment ID:</strong> {paymentDetails.razorpayPaymentId}</p>
            <p><strong>Razorpay Signature:</strong> {paymentDetails.razorpaySignature}</p>
          </>
        )}

        <hr className="my-4" />
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onPrint}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopUp;
