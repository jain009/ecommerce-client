import React from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  usePayOrderMutation,
} from "../slices/ordersApiSlices";

import { useParams, Link } from "react-router-dom";
import { Col, ListGroup, Row, Button, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(orderId);


  const [payOrder, {isLoading: loadingPay }] = usePayOrderMutation();
  const {userInfo} = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
    
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({orderId, details});
        refetch();
        toast.success('Payment successful');
      } catch(err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
    
  async function onApproveTest() {
    await payOrder({ orderId, details: {payer: {}}});
    refetch();
    toast.success('Payment successful');
  }
    
  function onError(err) {
    toast.error(err.message);
  }

  // Payment gateway handler
  function handleRazorPayClick() {
    // Here you would typically initialize or trigger your Razorpay payment
    // For example, you might open a modal or redirect to Razorpay
    try {
      // Simulating a successful payment for demonstration
      onApprove(null, {
        order: {
          capture: () => Promise.resolve({ id: 'test-payment-id' })
        }
      });
    } catch (err) {
      onError(err);
    }
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          }
        }
      ]
    });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      // console.log('Delivery success:', res);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || "Something went wrong. Please try again."}
    </Message>
  ) : (
    <div>
      <h1>Order </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger"> Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>

              <strong>Method:</strong>
              {order.paymentMethod}
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt || "Unknown date"}
                </Message>
              ) : (
                <Message variant="danger"> Not Paid </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} * ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay ? <Loader /> : (
                    <div>
                      <Button 
                        onClick={onApproveTest}
                        style={{margin: "10px"}}
                      >
                        Pay Order
                      </Button>
                      <div>
                        <Button
                          onClick={handleRazorPayClick}
                        >
                          RazorPay Payment
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && 
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverOrderHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;