import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { TradesDB } from '../api/trades.js';
import Modal from './Modal.js';
export default class Trade extends Component{
	constructor(props)
	{
		super(props);
		this.state={
			showModal:false
		};
	}
	toggleModal(){
  		this.setState({showModal: !this.state.showModal});
  	}

  	changeStateAccept()
  	{
  		Meteor.call('trades.changeState', this.props.trade._id,"accepted");
  		this.toggleModal().bind(this);
  	}

	changeStateReject()
  	{
  		Meteor.call('trades.changeState', this.props.trade._id,"rejected");
  		this.toggleModal().bind(this);
  	}
  	showDialogMakeOfer()
  	{
  		Meteor.call('trades.insert', "4ngJckRYJnYrHvfh7",["oferta1","oferta2"],0,"productoDeInteres");
  		Meteor.call('trades.insert', "59mNYcQoHgLJXYNj8",["oferta1","oferta2"],0,"productoDeInteres");
  		//id_to,offers_ids,money,target_id
  	}

	render(){
		return( 
			<div>
				<Modal
					footer={this.props.actionButtons}
					children={this.props.trade.target_id}
				    showModal={this.state.showModal}
				    title="Trade"
				    dealLabel="Deal"
				    onDeal={this.changeStateAccept.bind(this)}
				    rejectLabel="Reject"
				    onReject={this.changeStateReject.bind(this)}
				    counterofferLabel="Counteroffer"
				    onCounteroffer={this.showDialogMakeOfer.bind(this)}
				    onClose={this.toggleModal.bind(this)}
	  				> 	
	  			</Modal>
				
				<span>
					{this.props.trade.target_id}
				</span>
				<span>
					{this.props.trade.state}
				</span>
				<button type="button"  onClick={this.toggleModal.bind(this)}>detail</button>
			</div>
			);
	}
}
