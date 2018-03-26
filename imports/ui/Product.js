import React, { Component } from 'react';
import { ProductsDB } from '../api/products.js';

// Product component - represents a single product of a user

export default class Product extends Component {

	deleteThisTask() {
		Meteor.call('products.remove',this.props.product._id);
	}

	render() {
		return(
			<div>
				<li>
					<div className="container">
					<p className="col-sm-4">Name: {this.props.product.name} </p>
					<p className="col-sm-4">Description:{this.props.product.description}</p>
					<img alt="Image of the product" src="{this.props.product.urlImage}"/>
					<button className="delete" onClick={this.deleteThisTask.bind(this)}>Delete</button>
					</div>
				</li>
			</div>
		);
	}
}