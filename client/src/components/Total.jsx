import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isChecked: state.checked,
  };
};

class newTotal extends React.Component {
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
      <span style={{ fontSize: '28px' }}>
        { this.props.isChecked ?
          `${(((parseFloat(this.props.shoppingcart.price) - parseFloat(this.props.pickupSavings) + this.props.fees) * 0.9)).toFixed(2)}`
        :
          `${parseFloat(this.props.shoppingcart.price) - parseFloat(this.props.pickupSavings) + this.props.fees}`
        }
      </span>
    );
  }
}

const Total = connect(mapStateToProps, null)(newTotal);

export default Total;
