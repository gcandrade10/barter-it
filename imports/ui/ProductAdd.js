import React, { Component } from 'react';
import { ProductsDB } from '../api/products.js';
import ReactDOM from 'react-dom';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

// Product component - represents a single product of a user

export default class Product extends Component {

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

    userContent(){
		return (
			<div className="container-add-product">
				<form className="new-product" onSubmit={this.handleSubmit.bind(this)} >
			        <div className="form-group">
	    				<label htmlFor="name">Name: </label>
				        <input
				          id="name"
				          type="text"
				          ref="name"
				          aria-describedby="nameProduct"
				          placeholder="Name of the product"
				          className="form-control"
				            />
			         </div>
			         <div className="form-group">
				        <label htmlFor="description">Description: </label>
				        <textarea
				          id="description"
				          type="text"
				          ref="description"
				          placeholder="Description of the product"
				          className="form-control"
				           />
			         </div>
			         <div className="form-group">
			         	<label htmlFor="description">Url image: </label>
			            <input
			          type="text"
			          ref="urlImage"
			          placeholder="Paste the url of your image"
			          className="form-control"
			            />
			          </div>
			            <input type="submit" value="Submit" className="btn btn-primary" />
      			</form>
			</div>
			);
		
	}

	unregisteredContent(){
		return (
			<div>
				<h2>Resgister to add a Product!</h2>
			</div>
			);
	}

	render() {
		let userMessage;
		if(Meteor.user())
			{
				userMessage = this.userContent();
			}
			else
			{
				userMessage = this.unregisteredContent();
			}	
		return(
			<div>
				{userMessage}
			</div>
		);
	}



}