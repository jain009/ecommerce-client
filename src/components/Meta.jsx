import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ 
  title = "Welcome to Ecomerse",
  description = "Me sell the products for cheap",
  keyword = "electronics, buy electronics, cheap electronics"
}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

export default Meta;