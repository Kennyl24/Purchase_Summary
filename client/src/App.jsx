import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PromoCode from './components/PromoCode.jsx';
import ItemDetails from './components/ItemDetails.jsx';
import PickupSavings from './components/PickupSavings.jsx';
import Total from './components/Total.jsx';
import store from './store/index';
import { addPromo } from './actions/index';
import TaxesAndFees from './components/TaxesAndFees.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQuantity: 1,
      pickupSaving: '3.85',
      fees: 8.92,
      shoppingcart: [],
    };
    this.getShoppingCartInfo.bind(this);
  }
  componentDidMount() {
    this.getShoppingCartInfo();
  }
  getShoppingCartInfo() {
    axios.post('/shoppingcart')
      .then(response => this.setState({ shoppingcart: response.data.shoppingcart[0] }));
  }
  render() {
    return (
      <div className="summary-container">
        <div className="item-container">
        Subtotal
          <span className="pricing-details">${this.state.shoppingcart.price}</span>
        </div>
        <PickupSavings savings={this.state.pickupSaving} />
        <TaxesAndFees fees={this.state.fees} />
        <div className="line-break" />
        <div className="item-container" style={{ fontWeight: 'bold', fontSize: '20px' }}>Est. total
          <span className="pricing-details">
            <Total
              shoppingcart={this.state.shoppingcart}
              store={store}
              pickupSavings={this.state.pickupSaving}
              fees={this.state.fees}
            />
          </span>
        </div>
        <ItemDetails
          shoppingcart={this.state.shoppingcart}
          pickupSavings={this.state.pickupSaving}
          itemQuantity={this.state.itemQuantity}
        />
        <div className="line-break" />
        <PromoCode store={store} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
