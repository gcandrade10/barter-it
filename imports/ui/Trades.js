import React, { Component } from "react";
import queryString from 'query-string';
class Trades extends Component 
{	
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
    }

  render() {
  	this.someFunction();
    return (
		<div>
	  	<h1>Trades</h1>

    </div>
    );
  }
}

export default Trades;
