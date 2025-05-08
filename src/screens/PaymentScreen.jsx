import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import CheckoutSteps from "../components/checkoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";


const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay key
      amount: 50000, // Amount in paisa (₹500.00)
      currency: "INR",
      name: "ecommerce website",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
        navigate("/placeorder");
      },
      prefill: {
        name: cart.shippingAddress?.name,
        email:  cart.user?.email || '',
        contact:  cart.shippingAddress?.phone || ''
      },
      theme: {
        color: "#3399cc",
      },
    };
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK is not loaded properly.");
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    await handlePayment();
  };

  return (
    <Form onSubmit={submitHandler}>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Payment Method</h1>
      <Form.Group>
        <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="Razorpay"
            id="Razorpay"
            name="paymentMethod"
            value="Razorpay"
            checked={paymentMethod === "Razorpay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button type="submit" variant="primary" className="my-3">
        Pay Now
      </Button>
    </Form>
  );
};

export default PaymentScreen;
