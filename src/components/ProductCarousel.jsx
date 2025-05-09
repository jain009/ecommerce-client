import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import { Carousel, Image } from "react-bootstrap";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {typeof error?.data?.message === "string"
        ? error.data.message
        : typeof error === "string"
        ? error
        : "An unexpected error occurred"}
    </Message>
  ) : (
    <Carousel
      pause="hover"
      className="w-auto color-black mb-4"
      style={{
        background: "linear-gradient(to right, #6A5ACD, #778899)",
      }}
    >
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
