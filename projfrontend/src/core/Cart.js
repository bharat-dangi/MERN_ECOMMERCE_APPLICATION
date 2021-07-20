import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";
import StripesCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (cartProducts) => {
    return (
      <div>
        <h2>This section is to load product</h2>
        {cartProducts.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addToCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div className="col-6">
        {/* <PaymentB products={products} setReload={setReload} /> */}
        <StripesCheckout products={products} setReload={setReload} />
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Welcome to your cart">
      <div className="row text-center">
        <div className="col-6">
          {products?.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No product found</h3>
          )}
        </div>
        <div className="col-6">{loadCheckout()} </div>
      </div>
    </Base>
  );
};

export default Cart;
