import React from 'react';
import ReactDOM from 'react-dom';

export default class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
    };
    this.itemDetailsClicked = this.itemDetailsClicked.bind(this);
  }
  itemDetailsClicked() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  render() {
    return (
      <div onClick={this.itemDetailsClicked}>
        {this.state.clicked ?
          <div>
            <span className="item-container" style={{ textDecoration: 'underline', cursor: 'pointer' }}>See item details</span>
            <span style={{ fontSize: '20px', verticalAlign: 'top' }}>&nbsp;&nbsp;+</span>
          </div>
        :
          <div>
            <span
              className="item-container"
              style={{
                border: '.5px solid rgb(187, 185, 185)', paddingBottom: '0px', textDecoration: 'underline', cursor: 'pointer',
              }}
            >
            Hide item details
            </span>
            <span style={{ fontSize: '20px' }}>&nbsp;&nbsp;-</span>
            <div>
              <img src={this.props.shoppingcart.chairImage} alt="" height="80px" width="80px" />
              <span style={{ fontSize: '15px', width: '50%', float: 'right' }}>
                {this.props.shoppingcart.chairName}
              </span>
              <br />
              <span style={{ fontWeight: 'bold', marginLeft: '49%' }}>
                ${parseFloat(this.props.shoppingcart.price) - parseFloat(this.props.pickupSavings)}
              </span>
              <span style={{ position: 'static', marginLeft: '8%', right: '2px' }}>
                Qty:
                {this.props.itemQuantity}
              </span>
              <br />
              <span style={{
                fontSize: '10', textDecoration: 'line-through', position: 'relative', left: '49%', fontWeight: 'bold', color: 'grey'
              }}
              >
              ${this.props.shoppingcart.price}
              </span>
            </div>
          </div>
      }
      </div>
    );
  }
}
