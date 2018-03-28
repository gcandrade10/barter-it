import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { ProductsDB } from '../api/products.js';
import ModalBarter from './ModalBarter.js';
import { TradesDB } from '../api/trades.js';
import {Meteor} from 'meteor/meteor';
// Product component - represents a single product of a user

class Product extends Component {

	constructor(props)
	{
		super(props);
		this.state={
			showModal:false,
			value: [],
      		amount: 1.00
		};
	}

	toggleModal(){
  		this.setState({showModal: !this.state.showModal});
  	}

  	handleSelectChange =(value)=> {
    console.log('You\'ve selected:', value);
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
				<button className="delete" onClick={this.deleteThisProduct.bind(this)}>Delete</button>
			</div>
			);
		
	}
	otherButtons(){
		return (<button className="barter-button" onClick={this.toggleModal.bind(this)}>Barter</button>);
	}

	noButtons(){
		return (<button className="barter-button" onClick={this.signIn.bind(this)}>Barter</button>);
	}

	send(){
		//alert("value : " +JSON.stringify(this.state.value)+" amount: "+this.state.amount);
		arrOfertas=this.state.value.split(",");
		Meteor.call('trades.insert', this.props.product.username,this.props.product.owner,arrOfertas,this.state.amount,this.props.product._id);
		this.toggleModal();
	}

	renderProduct()
	{
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
					<div className="card size-card">
						<img className="thumbnail" alt="Image of the product" src={this.props.product.urlImage}/>
						<div className="card-body">
							<h5 className="font-weight-bold">{this.props.product.name} </h5>
							<p>Description: {this.props.product.description}</p>
							
							{ userMessage } 
						</div>
					</div>
				);
	}

	render() {
		
		return(
			<div>

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
				<div className="col-sm-6 col-md-4 col-xl-3">
				{this.renderProduct()}
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