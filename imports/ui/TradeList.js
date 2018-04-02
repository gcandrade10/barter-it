import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Trade from './Trade.js';
export default class TradeList extends Component{
	render()
	{
		return (
		<div className="col-6">
			<h2>{this.props.name}</h2>
			<div>
	    		{this.renderList()}
			</div>
	    </div>);
	}
	renderList() {
		let str = JSON.stringify(this.props.list);
		//console.log("list[0] "+str);
		return this.props.list.map((trade) => {
			return (
	        <Trade
	        	key={trade._id}
	        	trade={trade}
	        	actionButtons={this.props.actionButtons}
	        />
	      );
		});

	}
}
