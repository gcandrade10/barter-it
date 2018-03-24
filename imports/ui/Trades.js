import { withTracker } from 'meteor/react-meteor-data';
import { TradesDB } from '../api/trades.js';
import React, { Component } from "react";
import queryString from 'query-string';
import TradeList from './TradeList.js';
/*


import 'bootstrap/dist/css/bootstrap-theme.css';
*/
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Trades extends Component 
{	
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        console.log(this.props.trades);
    }

  render() {
  	this.someFunction();
    return (
      <div className="container">
    	  	<h1>Trades</h1>
        <div className="row">
          
          <TradeList
          	name="Offers"
          	list={this.props.offers}
          />
          <TradeList
          	name="Trades"
          	list={this.props.trades}
          />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('trades');
  return {
    offers: TradesDB.find({id_from: Meteor.userId()}).fetch(),
    trades: TradesDB.find({id_to: Meteor.userId()}).fetch(),
  };
})(Trades);

