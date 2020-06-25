import React, { useContext, useEffect } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContext } from "../context/product";
import { AuthContext } from "../context/auth";
import Error from "./ErrorWrapper";
import CssSpinner from "./CssSpinner";

export default function ProductsList() {
  const productContext = useContext(ProductContext);
  const authContext = useContext(AuthContext);

  let productsList = productContext.products.map((product) => {
    return <Product key={product.id} {...product} />;
  });
  if (productContext.error.message)
    productsList = <Error error={productContext.error} />;
  if (productContext.isLoading) productsList = <CssSpinner />;

  useEffect(() => {
    console.log("[ProductsList.js]-mounted");
    if (authContext.idToken !== "") {
      productContext.getCartItems();
    } else {
      productContext.getProducts();
    }
    return () => {
      console.log("[ProductsList.js]-unmounted");
    };
  }, [
    authContext.idToken,
    productContext.getCartItems,
    productContext.getProducts,
  ]);

  return (
    <div className="container">
      <div className="row">
        <Title title="our fresh, healthy, tasty fruits and vegetables" />
      </div>
      <div className="row">{productsList}</div>;
    </div>
  );
}
