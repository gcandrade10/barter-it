import React, { Component } from "react";
import queryString from 'query-string';
import { ProductsDB } from '../api/products.js';
import ProductsList from './ProductsList.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session'

class Search extends Component 
{	
  
  componentDidMount(){
    Session.set('searchValue', '');
  }
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
  }

  handleSubmit(event){
    event.preventDefault();
    
    const searchValue = ReactDOM.findDOMNode(this.refs.searchValue).value.trim();
    
    Session.set('searchValue', searchValue);
  }

  render() {
  	this.someFunction();
    return (
		<div >
      <div className="container-fluid">
  	  	<h1 >Search</h1>
        <div className="input-group">   
          <form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleSubmit.bind(this)}> 

            <input ref ="searchValue" type="text" className="form-control" placeholder="Search for..."/>
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
  Meteor.subscribe('Products'/*,Session.get('searchValue')*/);
  console.log( '"'+Session.get('searchValue')+'"');
    if(Session.get('searchValue')!== ""){
      return {products: ProductsDB.find({
        $and:[
          {active:true},
          {$or:[
            {name:{ '$regex' : Session.get('searchValue'), '$options' : 'i' }},
            {description:{ '$regex' : Session.get('searchValue'), '$options' : 'i' }}
          ]}
        ]
      }).fetch()};
    }
    else {
      return {products: ProductsDB.find({active:true}).fetch()};
    }
})(Search);
