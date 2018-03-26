import React, { Component } from "react";
import Product from './Product.js';
import { Mongo } from 'meteor/mongo';
import { ProductsDB } from '../api/products.js';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

export default class ProductsList extends Component {
	renderProducts() {
	    return this.props.products.map((product) => (
	        <Product key={product._id} product = {product} />
	      ));
 	}



 	render() {
		return (
		<div className="container">
	        <ul>
	          {this.renderProducts()}
	        </ul>
      	</div>
		);
 	};
}

