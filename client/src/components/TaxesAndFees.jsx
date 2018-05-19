import React from 'react';
import ReactDOM from 'react-dom';

const TaxesAndFees = (props) => (
  <div className="item-container">Est. taxes & fees<br/>(Based on 94085)
  <span className="pricing-details">${Math.round((parseFloat(props.newPrice) * .09 + 0.00001) * 100) / 100}</span>
  </div>
);

export default TaxesAndFees;