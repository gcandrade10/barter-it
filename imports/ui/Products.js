import React, { Component } from "react";
import queryString from 'query-string';
import ProductsList from './ProductsList.js';
import ProductAdd from './ProductAdd.js';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';
import { ProductsDB } from '../api/products.js';

class Products extends Component 
{	
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
    }

  renderProducts() {
    return this.props.products.map((product) => (
        <Product key={product._id} product = {product} />
      ));
  }

  render() {
  	this.someFunction();
    return (
		<div>
	  	<h1>Products</h1>
      <ProductsList products={this.props.products}/>
      <ProductAdd/>
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
})(Products);
