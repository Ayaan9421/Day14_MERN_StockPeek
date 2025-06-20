import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div className="nav">
			<Link to="/">Home</Link>
			<Link to="/stock-input">Check Stock Info</Link>
			<Link to="/compare-input">Compare Stocks</Link>
			<Link to="/about">About</Link>
		</div>
	);
}

export default Navbar;
