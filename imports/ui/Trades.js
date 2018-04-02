import { withTracker } from 'meteor/react-meteor-data';
import { TradesDB } from '../api/trades.js';
import React, { Component } from "react";
import queryString from 'query-string';
import TradeList from './TradeList.js';
import ModalNumber from './ModalNumber.js';

/*
import 'bootstrap/dist/css/bootstrap-theme.css';
*/
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Trades extends Component 
{	
  constructor(props)
  {
    super(props);
    this.state={
      showModalNumber:false,
    };
  }

  toggleModalNumber=()=>{
      this.setState({showModalNumber: !this.state.showModalNumber});
    }

	someFunction(){
        let params = queryString.parse(this.props.location.search);
        //console.log(params);
        //console.log(this.props.trades);
    }

  render() {
  	this.someFunction();
    return (
      <div className="container container-background">

              <ModalNumber
              responded={true}
              footer={true}
              sendLabel="Send"
                showModal={this.state.showModalNumber}
                title={"Change number"}
                onClose={this.toggleModalNumber.bind(this)}
                onSend={this.toggleModalNumber.bind(this)}
                >   
              </ModalNumber>

    	  	<h1>Trades</h1>
          <button className="btn btn-primary" onClick={this.toggleModalNumber}>Change number</button>
        <div className="row">
          
          <TradeList
          	name="Offers"
          	list={this.props.offers}
            actionButtons={true}
          />
          <TradeList
          	name="Trades"
          	list={this.props.trades}
            actionButtons={false}
          />
        </div>
        <br/>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('trades');
  return {
    offers: TradesDB.find({id_to: Meteor.userId()}).fetch(),
    trades: TradesDB.find({id_from: Meteor.userId()}).fetch(),
  };
})(Trades);

