import React, { Component } from "react";
import queryString from 'query-string';
import ProductsList from './ProductsList.js';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';
import { ProductsDB } from '../api/products.js';
import ReactDOM from 'react-dom';

class Products extends Component 
{	
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
    }

  handleSubmit(event){
    event.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();
    const urlImage = ReactDOM.findDOMNode(this.refs.urlImage).value.trim();

    this.addProduct(name, description, urlImage);

    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.description).value = '';
    ReactDOM.findDOMNode(this.refs.urlImage).value = '';
  }


  addProduct(name, description, urlImage)
    {
      Meteor.call('products.insert', name, description, urlImage);
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

      <form className="new-product" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="name"
          placeholder="Name of the product"
            />
            <input
          type="text"
          ref="description"
          placeholder="Description of the product"
            />
            <input
          type="text"
          ref="urlImage"
          placeholder="Paste the url of your image"
            />
            <input type="submit" value="Submit" />
      </form>

    </div>

    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('Products');
  return {
    products: ProductsDB.find({owner:Meteor.user()._id}).fetch(),
  };
})(Products);
