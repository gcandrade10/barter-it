import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
		
      <header>
	    <nav>
	      <ul>
	        <li><Link to='/'>Home</Link></li>
	        <li><Link to='/search'>Search</Link></li>
	        <li><Link to='/products'>Productss</Link></li>
	        <li><Link to='/trades'>Trades</Link></li>
	      </ul>
	    </nav>
  	</header>
    );
  }
}

export default Header;