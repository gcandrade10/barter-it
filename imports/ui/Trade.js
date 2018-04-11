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
		console.log(JSON.stringify(props.fromUser));
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
  		//console.log("PRODUCTS");
		//console.log(JSON.stringify(this.props.products));
  	}

  	toggleModalBarter=()=>{
  		this.setState({showModalBarter: !this.state.showModalBarter});
  		//console.log(JSON.stringify(this.state.products));
  		this.setState({showModal: !this.state.showModal});
  	}

	toggleModalContact(){
  		this.setState({showModalContact: !this.state.showModalContact});
  		this.setState({showModal: false});
  	}

  	changeStateAccept()
  	{
  		Meteor.call('trades.changeState', this.props.trade._id,"accepted");
  		arrOffers=this.props.trade.offers_ids;
  		arrTargets=this.props.trade.targets_ids;
		
		let arrayLength = arrOffers.length;
		for (let i = 0; i < arrayLength; i++) 
		{
			Meteor.call('products.sell', arrOffers[i],"accepted");
		    
		}

		arrayLength = arrTargets.length;
		for (let i = 0; i < arrayLength; i++) 
		{
			Meteor.call('products.sell', arrTargets[i],"accepted");
		    
		}

  		this.toggleModal();
  		alert("You have accepted the deal, you can contact the trader now!")
  	}

	changeStateReject()
  	{
  		alert("You have rejected the offer")
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
    //console.log('You\'ve selected:', value);
    this.setState({ value });
  	}

   handleChange=(event, maskedvalue, floatvalue)=>{
        this.setState({amount: floatvalue});
    }

    send=()=>{
		arrOfertas=this.state.value.split(",");
		//'trades.update'(tradeId,offers_ids,money)
		Meteor.call('trades.update', this.props.trade._id,arrOfertas,this.state.amount);
		this.toggleModalBarter();
		alert("Your offer has been sent sucessfully");
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
  			return(<button type="button" className="btn btn-danger"  onClick={this.delete.bind(this)}>x</button>);
  		}
  		else if(this.props.actionButtons || this.props.trade.state==="pending")
  		{
  			return(<button type="button" className="btn btn-primary"  onClick={this.toggleModal.bind(this)}>detail</button>);
  		}
  		else
  		{
  			return(<button type="button"  className="btn btn-info" onClick={this.toggleModalContact.bind(this)}>info</button>);
  		}
  	}

  	getData = ()=>{
  		//console.log("props "+JSON.stringify(this.props.trade.id_to));
  		//console.log("consulta "+JSON.stringify(Meteor.users.findOne({ _id: this.props.trade.id_to })));

  		let fromUser=Meteor.users.findOne({ _id: this.props.trade.id_from });
  		//console.log(JSON.stringify(fromUser));

  		let toUser=Meteor.users.findOne({ _id: this.props.trade.id_to });
		//console.log(JSON.stringify(toUser));

  		let bool = this.props.trade.id_from!==Meteor.user()._id;
  		let phone = bool ? fromUser : toUser; 

  		let user =phone.profile;
  		let email = phone.services.google.email;
  		if(user)
  		{
  			return {
  			name:user.name,
  			phone:user.phone,
  			email:email,
  			}
  		}
  		else{
  			return "";
  		}
  	}

	render(){
		const { loading } = this.props;
        if (loading) {
            return (
                <h2>Loading Page ...</h2>
            );
        }
        else
        {


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
					    onContact={this.toggleModalContact.bind(this)}
		  				> 	
		  			</Modal>	
		  			{//console.log(this.props.trade.id_from)
		  			}
		  			<ModalContact
		  				key={this.props.trade._id}
		  				showModal={this.state.showModalContact}
		  				onClose={this.toggleModalContact.bind(this)}
		  				//name={this.props.trade.usernameFrom}
		  				name={this.getData().name}
		  				phone={this.getData().phone}
		  				email={this.getData().email}
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
}
export default withTracker((props) => {
	//console.log("user From "+props.trade.id_from);
  Meteor.subscribe('Products');
  const usersLoad= Meteor.subscribe('users',{
  onReady: function () 
  	{ 
  		console.log("success");
  		console.log(Meteor.users.find({}).count());

  		
  	},
  	onError: function () { console.log("onError", arguments); }
  });
  if(Meteor.user()){
    return {
      products: ProductsDB.find({owner:props.trade.id_from}).fetch(),
      loading:!usersLoad.ready(),
    };
  }
  else {
      return { 
        products: [],
      };
  }
})(Trade);