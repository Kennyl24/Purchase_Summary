import React from 'react';
import ReactDOM from 'react-dom';

const TaxesAndFees = props => (
  <div className="item-container">
    Est. taxes & fees<br />(Based on 94085)
    <span className="pricing-details">
        ${(parseFloat(props.fees).toFixed(2))}
    </span>
  </div>
);

export default TaxesAndFees;
