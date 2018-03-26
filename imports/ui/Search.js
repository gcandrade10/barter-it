import React, { Component } from "react";
import queryString from 'query-string';
import { ProductsDB } from '../api/products.js';
import ProductsList from './ProductsList.js';
import { withTracker } from 'meteor/react-meteor-data';
class Search extends Component 
{	
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
    }

  render() {
  	this.someFunction();
    return (
		<div>
	  	<h1>Search</h1>
      <ProductsList products={this.props.products}/>


    </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('Products');
  return {
    products: ProductsDB.find({}).fetch(),
  };
})(Search);
