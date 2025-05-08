import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, Meta, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const products = data?.products || [];

  return (
    <>
      {!keyword ? (
        <div className="container-fluid">
          <ProductCarousel />
        </div>
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message
            ? error.data.message
            : typeof error === "string"
            ? error
            : "An unexpected error occurred"}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>

          {!products || products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
          <Paginate
            pages={data?.pages}
            page={Number(pageNumber) || 1}
            keyword={keyword}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
