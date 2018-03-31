import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
		
      <header>
	    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
	    	<a className="navbar-brand navbar-title" href="#">Barter-it</a>
	    	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			</button>
	    	<div className="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul className="navbar-nav mr-auto">
		        
		        <li className="nav-item active nav-item-custom"><Link to='/'>Search</Link></li>
		        <li className="nav-item active nav-item-custom"><Link to='/products'>Products</Link></li>
		        <li className="nav-item active nav-item-custom"><Link to='/trades'>Trades</Link></li>
		      </ul>
		     </div>
	    </nav>
  	</header>
    );
  }
}

export default Header;