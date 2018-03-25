import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { TradesDB } from '../api/trades.js';
import Modal from './Modal.js';
import '../stylesheets/trade.css';
import classNames from 'classnames';
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
  		Meteor.call('trades.insert', "svghRtLu92pcvZ7JN",["oferta1","oferta2"],0,"productoDeInteres");
  		Meteor.call('trades.insert', "xbLjgqfDWvdy7G83e",["oferta1","oferta2"],0,"productoDeInteres");
  		//id_to,offers_ids,money,target_id
  	}

  	delete()
  	{
  		Meteor.call('trades.remove', this.props.trade._id);
  	}

  	info()
  	{
  		alert("info");
  	}

  	showContact()
  	{
  		alert("showContact");
  	}

  	renderTrade()
  	{
  		var stateClassName = classNames({
  		  "container":true,	
	      "accepted": this.props.trade.state==="accepted",
	      "pending": this.props.trade.state==="pending",
	      "rejected": this.props.trade.state==="rejected"
    });
  		if(this.props.actionButtons)
		{
	  					return(<div className="container">
				            <div className="row">
				              <div className={stateClassName}>
				                <div className="row">
				                  <div className="col-2">
				                    Otro
				                  </div>
				                </div>
				                <div className="row">
				                  <div className="col-1"></div>
				                  <div className="col-2">
				                    Quiere:
				                  </div>
				                  <div className="col-4">
				                    {this.props.trade.target_id}
				                  </div>
				                  <div className="col-2">
				                    {this.renderDelOrInfo()}
				                  </div>
				                </div>
				              </div>
				            </div>
        				</div>);
		}
	  				else
	  				{
			  			return(
			  				<div className={stateClassName}>
			  					<div className="row">
						  			<div className="col-4">
										{this.props.trade.target_id}
									</div>
									<div className="col-2">
										{this.props.trade.state}
									</div>
									<div className="col-2">
				                    	{this.renderDelOrInfo()}
				                  </div>
			  					</div>
			  					
			  				</div>);
	  				}
  	}

  	renderDelOrInfo()
  	{
  		//alert(this.props.trade.state);
  		if(this.props.trade.state==="rejected")
  		{
  			return(<button type="button"  onClick={this.delete.bind(this)}>x</button>);
  		}
  		else if(this.props.actionButtons)
  		{
  			return(<button type="button"  onClick={this.toggleModal.bind(this)}>detail</button>);
  		}
  		else
  		{
  			return(<button type="button"  onClick={this.info.bind(this)}>info</button>);
  		}
  	}

	render(){
		return( 
			<div>
				<Modal
					responded={this.props.trade.responded}
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
				    contactLabel="Contact"
				    onContact={this.showContact.bind(this)}
	  				> 	
	  			</Modal>	

	  			{
	  			this.renderTrade()	
	  			}

			</div>
			);
	}
}
