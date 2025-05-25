import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { AppConstants } from '../../util/constant';
import { createOrder, deleteOrder } from '../../service/OrderSercie';
import { createRazorpayOrder, verifyPaymnet } from '../../service/PaymentService';

import ReceiptPopUp from '../recieptPopUp/ReceiptPopUp';

const CartSummary = ({ customerMobile, setCustomerMobile, customerName, setCustomerName }) => {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerMobile("");
    setCustomerName("");
    clearCart();
    setOrderDetails(null);
  };

  const placeOrder = () => {
    if (!orderDetails) {
      toast.error("No order to place.");
      return;
    }

    setShowPopup(true);
    toast.success("Order placed successfully");
    // clearAll(); // moved to onClose of popup
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !customerMobile) {
      toast.error("Please enter customer name and mobile number");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Please add items to cart");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: customerMobile,
      cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase()
    };

    setIsProcessing(true);

    try {
      const response = await createOrder(orderData);
      const savedData = response.data;

      if (response.status === 201 && paymentMode.toUpperCase() === "CASH") {
        toast.success("Cash Received");
        setOrderDetails(savedData);
        setIsProcessing(false);
      } else if (response.status === 201 && paymentMode === "UPI") {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          toast.error("Failed to load Razorpay SDK");
          await deleteOrderOnFailure(savedData.orderId);
          setIsProcessing(false);
          return;
        }

        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal * 100,
          currency: "INR",
        });

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "My Retail Store",
          description: "Order Transaction",
          handler: async (response) => {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: customerMobile,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment cancelled");
              setIsProcessing(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", async (response) => {
          console.error("Payment failed:", response.error);
          toast.error("Payment failed");
          await deleteOrderOnFailure(savedData.orderId);
          setIsProcessing(false);
        });

        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId
    };

    try {
      const paymentResponse = await verifyPaymnet(paymentData);

      if (paymentResponse.status === 200) {
        toast.success("Payment verified successfully");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
        setIsProcessing(false);
      } else {
        toast.error("Payment verification failed");
        await deleteOrderOnFailure(savedOrder.orderId);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Payment verification error");
      await deleteOrderOnFailure(savedOrder.orderId);
      setIsProcessing(false);
    }
  };

  return (
    <div className='mt-2'>
      <div className='cart-summary-details'>
        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Item:</span>
          <span className='text-light'>₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Tax (1%)</span>
          <span className='text-light'>₹{tax.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Total:</span>
          <span className='text-light'>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className='d-flex gap-3'>
        <button className='btn btn-success flex-grow-1' onClick={() => completePayment("Cash")} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button className='btn btn-success flex-grow-1' onClick={() => completePayment("UPI")} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>

      <div className='d-flex gap-3 mt-3'>
        <button className='btn btn-warning flex-grow-1' onClick={placeOrder} disabled={isProcessing || !orderDetails}>
          Place Order
        </button>
      </div>

      {
        showPopup && orderDetails && (
          <ReceiptPopUp
            orderDetails={orderDetails}
            onClose={() => {
              setShowPopup(false);
              clearAll(); // clear after popup closed
            }}
            onPrint={handlePrintReceipt}
          />
        )
      }
    </div>
  );
};

export default CartSummary;
