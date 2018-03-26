import React, { Component } from 'react';
import { ProductsDB } from '../api/products.js';

// Product component - represents a single product of a user

export default class Product extends Component {

	deleteThisProduct() {
		Meteor.call('products.remove',this.props.product._id);
	}

	sellThisProduct() {
		Meteor.call('products.sell', this.props.product._id);
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
		return (<button className="delete" onClick={this.sellThisProduct.bind(this)}>Buy</button>);
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
			userMessage = this.otherButtons();
		}
		return(
			<div>
				<li>
					<div className="container">
					<p className="col-sm-4">Name: {this.props.product.name} </p>
					<p className="col-sm-4">Description: {this.props.product.description}</p>
					<img alt="Image of the product" src="{this.props.product.urlImage}"/>
					
					{ userMessage } 
					<br/><br/>
					</div>
				</li>
			</div>
		);
	}
}