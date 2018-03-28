import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { TradesDB } from '../api/trades.js';
import Modal from './Modal.js';
import ModalContact from './ModalContact.js';
import '../stylesheets/trade.css';
import classNames from 'classnames';
import ModalBarter from './ModalBarter.js';
import { ProductsDB } from '../api/products.js';
import { withTracker } from 'meteor/react-meteor-data';
class Trade extends Component{
	constructor(props)
	{
		
		super(props);
		this.state={
			showModal:false,
			showModalContact:false,
			showModalBarter:false,
			value: this.props.trade.offers_ids,
      		amount: this.props.trade.money,
		};
	}
	toggleModal(){
  		this.setState({showModal: !this.state.showModal});
  		console.log("PRODUCTS");
		console.log(JSON.stringify(this.props.products));
  	}

  	toggleModalBarter=()=>{
  		this.setState({showModalBarter: !this.state.showModalBarter});
  		console.log(JSON.stringify(this.state.products));
  		this.setState({showModal: !this.state.showModal});
  	}

	toggleModalContact(){
  		this.setState({showModalContact: !this.state.showModalContact});
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
  	

  	delete()
  	{
  		Meteor.call('trades.remove', this.props.trade._id);
  	}
  	showContact()
  	{
  		alert("showContact");
  	}

  	handleSelectChange =(value)=> {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  	}

   handleChange=(event, maskedvalue, floatvalue)=>{
        this.setState({amount: floatvalue});
    }

    send=()=>{
		alert("value : " +JSON.stringify(this.state.value)+" amount: "+this.state.amount);
		arrOfertas=this.state.value.split(",");
		//'trades.update'(tradeId,offers_ids,money)
		Meteor.call('trades.update', this.props.trade._id,arrOfertas,this.state.amount);
		this.toggleModalBarter();
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
				                    {this.props.trade.usernameFrom}
				                  </div>
				                </div>
				                <div className="row">
				                  <div className="col-1"></div>
				                  <div className="col-2">
				                    Wants:
				                  </div>
				                  <div className="col-4">
				                    {this.props.trade.target}
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
										{this.props.trade.target}
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
  			return(<button type="button"  onClick={this.toggleModalContact.bind(this)}>info</button>);
  		}
  	}

	render(){
		return( 
			<div>
				<Modal
					key={this.props.trade._id+"Modal"}
					responded={this.props.trade.responded}
					footer={this.props.actionButtons}
					trade={this.props.trade}
				    showModal={this.state.showModal}
				    title="Trade"
				    dealLabel="Deal"
				    onDeal={this.changeStateAccept.bind(this)}
				    rejectLabel="Reject"
				    onReject={this.changeStateReject.bind(this)}
				    counterofferLabel="Counteroffer"
				    onCounteroffer={this.toggleModalBarter.bind(this)}
				    onClose={this.toggleModal.bind(this)}
				    contactLabel="Contact"
				    onContact={this.showContact.bind(this)}
	  				> 	
	  			</Modal>	

	  			<ModalContact
	  				key={this.props.trade._id}
	  				showModal={this.state.showModalContact}
	  				onClose={this.toggleModalContact.bind(this)}
	  				name={"German"}
	  				phone={"5559898"}
	  			>
	  			</ModalContact>

	  			<ModalBarter
					responded={true}
					footer={this.props.actionButtons}
					sendLabel="Send"
				    showModal={this.state.showModalBarter}
				    title={"Counteroffer for "+this.props.trade.target}
				    onClose={this.toggleModalBarter.bind(this)}
				    onSend={this.send.bind(this)}
				    products={this.props.products}
				    handleChange={this.handleChange}
				    handleSelectChange={this.handleSelectChange}
				    amount={this.state.amount}
				    value={this.state.value}
	  				> 	
	  			</ModalBarter>



	  			{
	  			this.renderTrade()	
	  			}

			</div>
			);
	}
}
export default withTracker((props) => {
	console.log("user From "+props.trade.id_from);
  Meteor.subscribe('Products');
  if(Meteor.user()){
    return {
      products: ProductsDB.find({owner:props.trade.id_from}).fetch(),
    };
  }
  else {
      return { 
        products: [],
      };
  }
})(Trade);