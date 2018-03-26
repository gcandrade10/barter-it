import React, { Component } from "react";
import queryString from 'query-string';
import { ProductsDB } from '../api/products.js';
import ProductsList from './ProductsList.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class Search extends Component 
{	
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('entro');
    const searchValue = ReactDOM.findDOMNode(this.refs.searchValue).value.trim();
  }

  render() {
  	this.someFunction();
    return (
		<div >
      <div className="container-fluid">
  	  	<h1 >Search</h1>
        <div className="input-group">   
          <form onSubmit={this.handleSubmit.bind(this)}> 

            <input id ="searchValue" type="text" className="form-control" placeholder="Search for..."/>
            <input type="submit" value="Submit" />
          </form>
          
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
     products: ProductsDB.find({active: true}).fetch(),
  };
})(Search);
