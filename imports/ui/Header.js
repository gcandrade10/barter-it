import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
		
      <header>
	    <nav className="navbar navbar-expand-lg navbar-light bg-light">
	    	<a className="navbar-brand" href="#">Barter-it</a>
	    	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			</button>
	    	<div className="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul className="navbar-nav mr-auto">
		        <li className="nav-item active"><Link to='/'>Home</Link></li>
		        <li className="nav-item active"><Link to='/search'>Search</Link></li>
		        <li className="nav-item active"><Link to='/products'>Productss</Link></li>
		        <li className="nav-item active"><Link to='/trades'>Trades</Link></li>
		      </ul>
		     </div>
	    </nav>
  	</header>
    );
  }
}

export default Header;