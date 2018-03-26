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

  handleSubmit(event){
    event.preventDefault();
  }

  render() {
  	this.someFunction();
    return (
		<div >
      <div className="container-fluid">
  	  	<h1 >Search</h1>
        <div className="input-group">      
          <input type="text" className="form-control" placeholder="Search for..."/>
          <span className="input-group-btn">
          <button className="btn btn-default" type="button">Search</button>
          </span>
        </div>
        </div>

      <hr/>  
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
