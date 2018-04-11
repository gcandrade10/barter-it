import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { ProductsDB } from '../api/products.js';
import ModalBarter from './ModalBarter.js';
import ModalNumber from './ModalNumber.js';
import { TradesDB } from '../api/trades.js';
import {Meteor} from 'meteor/meteor';
// Product component - represents a single product of a user

class Product extends Component {

	constructor(props)
	{
		super(props);
		this.state={
			showModalNumber:false,
			showModal:false,
			value: [],
      		amount: 1.00
		};
	}

	toggleModalNumber(){
  		this.setState({showModalNumber: !this.state.showModalNumber});
  	}

	toggleModal(){
  		if(Meteor.user().profile.phone==='5555555')
  		{
  			this.setState({showModalNumber: !this.state.showModalNumber});
  		}
  		else{
  		this.setState({showModal: !this.state.showModal});
  			
  		}	
  	}

  	handleSelectChange =(value)=> {
    //console.log('You\'ve selected:', value);
    this.setState({ value });
  	}

   handleChange=(event, maskedvalue, floatvalue)=>{
        this.setState({amount: floatvalue});
    }

	deleteThisProduct() {
		Meteor.call('products.remove',this.props.product._id);
	}

	sellThisProduct() {
		Meteor.call('products.sell', this.props.product._id);
	}

	signIn() {
		alert("Sign in to barter");
	}

	ownerButtons(){
		return (
			<div>
				<p>{this.props.product.active ? 'Active' : 'Sold' } </p>
				<button className="btn btn-danger" onClick={this.deleteThisProduct.bind(this)}>Delete</button>
			</div>
			);
		
	}
	otherButtons(){
		return (<button className="btn btn-success" onClick={this.toggleModal.bind(this)}>Barter</button>);
	}

	noButtons(){
		return (<button className="btn btn-warning" onClick={this.signIn.bind(this)}>Barter</button>);
	}

	send(){
		alert("Your offer has been sent sucessfully");
		arrOfertas=this.state.value.split(",");
		let arrTargets=[];
		arrTargets.push(this.props.product._id);
		Meteor.call('trades.insert', this.props.product.username,this.props.product.owner,arrOfertas,this.state.amount,arrTargets);
		this.toggleModal();
	}

	render() {
		let userMessage;
		if(Meteor.user())
		{
			if (Meteor.user()._id === this.props.product.owner) {
				userMessage = this.ownerButtons();
			} 
			else {
			userMessage = this.otherButtons();
			}
		} 
		else {
				userMessage = this.noButtons();
		}
		
		return(
			
			<div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
				<div className="card size-card footer-widget">
					<img className="thumbnail" alt="Image of the product" src={this.props.product.urlImage}/>
						<div className="card-body">
							<h5 className="font-weight-bold">{this.props.product.name} </h5>
							<p>Description: {this.props.product.description}</p>
							
							{ userMessage } 
						</div>

						<ModalBarter
							responded={true}
							footer={this.props.actionButtons}
							sendLabel="Send"
						    showModal={this.state.showModal}
						    title={"Barter for "+this.props.product.name}
						    onClose={this.toggleModal.bind(this)}
						    onSend={this.send.bind(this)}
						    products={this.props.products}
						    handleChange={this.handleChange}
						    handleSelectChange={this.handleSelectChange}
						    amount={this.state.amount}
						    value={this.state.value}
			  				> 	
			  			</ModalBarter>	

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

				</div>
			</div>
			
		);
	}
}
export default withTracker(() => {
  Meteor.subscribe('Products');
  if(Meteor.user()){
    return {
      products: ProductsDB.find({owner:Meteor.user()._id}).fetch(),
    };
  }
  else {
      return { 
        products: [],
      };
  }
})(Product);