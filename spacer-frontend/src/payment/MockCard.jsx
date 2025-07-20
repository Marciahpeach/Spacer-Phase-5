import React from "react";

const MockCard = ({ onPay }) => {
  return (
    <div>
      <h3>Fake Payment</h3>
      <p>Card: 4242 4242 4242 4242 | Exp: 12/34 | CVV: 123</p>
      <button onClick={onPay}>Pay Now</button>
    </div>
  );
};

export default MockCard;
