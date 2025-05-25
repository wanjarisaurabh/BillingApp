import React from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { latestOrders } from '../../service/OrderSercie'; // Adjust the import path as necessary

const OrderHistory = () => {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();// Replace with your actual API endpoint
        setOrders(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatItems = (items) => {
    console.log(items);
    return items.map(item => `${item.name} x (${item.quntity})`).join(', ');
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-danger">Error: {error.message}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-4">No orders found</div>;
  }

  return (
    <div className="orders-history-container">
      <h2 className="mb-2 text-light">Recent Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  {order.customerName}
                  <br />
                  <small className="text-muted">{order.phoneNumber}</small>
                </td>
                <td>{formatItems(order.items)}</td>
                <td>{order.grandTotal}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>
                    {order.paymentDetails?.status || "PENDING"}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
