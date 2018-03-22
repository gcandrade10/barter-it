import { withTracker } from 'meteor/react-meteor-data';
import { TradesDB } from '../api/trades.js';
import React, { Component } from "react";
import queryString from 'query-string';

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
          {}
          <div className="col-6">
            col1
          </div>
          <div className="col-6">
            col2
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('trades');
  return {
    trades: TradesDB.find({}).fetch(),
  };
})(Trades);

