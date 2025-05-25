import React, { useEffect, useState } from 'react';
import { fetchDashboard } from './../../service/dashboard';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchDashboard();
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (!data) {
    return <div className='error'>Error fetching data</div>;
  }


console.log(data);

  

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="start-grid">
          <div className="stat-card">
            <div className="stat-icon">₹</div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>{(data.todaySales).toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount}</p>
            </div>
          </div>
        </div>

        <div className="recent-orders-card">
          <div className="recent-orders-title">🕒 Recent Orders</div>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}...</td>
                    <td>{order.customerName}</td>
                    <td>₹{order.grandTotal.toFixed(2)}</td>
                    <td>
                      <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td>{order.paymentDetails.status}</td>
                    <td>
                      {new Date(order.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div >
  );
};

export default Dashboard;
