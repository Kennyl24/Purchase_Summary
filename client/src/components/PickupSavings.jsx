import React from 'react';
import ReactDOM from 'react-dom';
import ToolTip from './ToolTip.jsx';


export default class PromoCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.pickupSavingsHovered = this.pickupSavingsHovered.bind(this);
    this.pickupSavingsLeft = this.pickupSavingsLeft.bind(this);
  }
  pickupSavingsHovered() {
    this.setState({
      hovered: !this.state.hovered,
    });
  }
  pickupSavingsLeft() {
    this.setState({
      hovered: !this.state.hovered,
    });
  }
  render() {
    return (
      <div>
        <div className="item-container">
          <span>
            <span
              onMouseOver={this.pickupSavingsHovered}
              onMouseOut={this.pickupSavingsLeft}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Pickup Savings
            </span>
            {this.state.hovered ? <ToolTip /> : null }
          </span>
          <span className="pricing-details"style={{ color: 'red' }}>
            -${this.props.savings}
          </span>
        </div>
      </div>
    );
  }
}
