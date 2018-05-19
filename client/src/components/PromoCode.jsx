import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { addPromo } from "../actions/index";
import store from "../store/index";


const mapDispatchToProps = (dispatch) => {
  return { addPromo: item => 
    dispatch(addPromo(item))
  };
};
const mapStateToProps= (state) => {
  return {
    isChecked: state.checked
  };
}

class ConnectedPromoCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      value: ''
    }
    this.promoCodeClicked = this.promoCodeClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    let test = this.state.value.toLowerCase();
    if(!this.props.isChecked){
    if(test === 'donation'){
    alert('A promo was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.addPromo({addPromo: true , id: 1})
    console.log(this.props.store.getState());    
    } else {
     alert('This code is incorrect');
    event.preventDefault();
    }
  } else {
    alert('A code has been entered');
  }
}
  promoCodeClicked(){
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  render() {
    return (
      <div>
      {this.state.clicked 
      ? <div>
      <span onClick={this.promoCodeClicked} className="item-container" style={{textDecoration:'underline', cursor:'pointer'}}>Apply promo code</span>
      <span style={{fontSize:'20px', verticalAlign:'top'}}>&nbsp;&nbsp;+</span>
      </div>
      : <div><span onClick={this.promoCodeClicked} className="item-container" style={{textDecoration:'underline', paddingBottom:'0px', border: '.5px solid rgb(187, 185, 185)', cursor:'pointer'}}>Hide promo code
      </span>
      <span style={{fontSize:'20px'}}>&nbsp;&nbsp;-</span>
      <form style={{paddingTop:'20px'}}onSubmit={this.handleSubmit}>
  <label style={{color:'grey', fontSize:'14px', textDecoration:'none'}}>
    Promo code:
    <br/>
    <input style={{width:'150px'}} type="text" name="name" value={this.state.value} onChange={this.handleChange} />
  </label>
  <input className="button"type="submit" value="Apply"/>
</form>
      </div>
      }
      </div>
    );
  }
}
const PromoCode = connect(mapStateToProps, mapDispatchToProps)(ConnectedPromoCode);

export default PromoCode;
