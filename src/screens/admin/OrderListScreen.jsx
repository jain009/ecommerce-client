import React from "react";
import PropTypes from "prop-types";
import { FaTimes, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../slices/ordersApiSlices";
import { Button, Table } from "react-bootstrap";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  
  // Format currency function
  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

  // Safe date formatting
  const formatDate = (dateString) => 
    dateString ? new Date(dateString).toLocaleDateString() : 'N/A';

  return (
    <div className="p-3">
      <h1 className="mb-4">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || "Error loading orders"}
        </Message>
      ) : (
        <div className="table-responsive">
          <Table striped hover bordered className="table-sm">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {order._id}
                  </td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatCurrency(order.totalPrice)}</td>
                  <td className="text-center">
                    {order.isPaid ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link   to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

OrderListScreen.propTypes = {
  orders: PropTypes.array,
};

export default OrderListScreen;