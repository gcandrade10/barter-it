import React, { Component } from "react";
import queryString from 'query-string';
import { ProductsDB } from '../api/products.js';
import ProductsList from './ProductsList.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

class Search extends Component 
{	
  
  componentDidMount(){
    Session.setDefault('searchValue', "");
    Session.set('searchValue', "");
  }
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        //console.log(params);
  }

  handleSubmit(event){
    event.preventDefault();
    
    const searchValue = ReactDOM.findDOMNode(this.refs.searchValue).value.trim();
    
    Session.set('searchValue', searchValue);
  }

  render() {
  	this.someFunction();
    return (
      <div>
        
    		<div className="container-green">
          <AccountsUIWrapper />
        </div>
        <div className="container-background">
          <div className="container-fluid container-search">

      	  	<h1>Search</h1>
            <div className="input-group search-div">   
              <form 
                className="search-form search-bar"
                onSubmit={this.handleSubmit.bind(this)} 
                onChange={this.handleSubmit.bind(this)}> 
                
                <input aria-label="Search" ref ="searchValue" type="text" className="form-control" placeholder="Search for..."/>
              </form>
            </div>
            <h5>Remember, to barter, you should offer a product</h5>
            <h5>Go <a href="/#/products">here</a> to add a product</h5>
            </div>
          <ProductsList products={this.props.products}/>

          <h6>Eeny, meeny, miny, moe. With which Product should I go?</h6>
        </div>
      </div>
    );
  }

}

export default withTracker(() => {
  Meteor.subscribe('Products');
  //console.log( '"'+Session.get('searchValue')+'"');
    if(Session.get('searchValue')!== ''){
      return {products: ProductsDB.find({
        $and:[
          {active:true},
          {$or:[
            {name:{ '$regex' : new RegExp(Session.get('searchValue')), '$options' : 'i' }},
            {description:{ '$regex' : new RegExp(Session.get('searchValue')), '$options' : 'i' }}
          ]}
        ]
      }).fetch()};
    }
    else {
      return {products: ProductsDB.find({active:true}).fetch()};
    }
})(Search);
