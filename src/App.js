import logo from './logo.svg';
import './App.css';
import StockInput from "./StockInput";
import StockDetails from "./StockDetails";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompareInput from "./CompareInput";
import CompareDetails from "./CompareDetails";
import Home from "./Home";
import NavBar from "./NavBar";
import About from "./About";

function App() {
  return (
	<BrowserRouter>
		<NavBar />
		<Routes>
			<Route path="/" element={ <Home/> } /> 
			<Route path="/stock-input" element={ <StockInput/> } /> 
			<Route path="/stock-details" element={ <StockDetails/> } /> 
			<Route path="/compare-details" element={ <CompareDetails /> } />
			<Route path="/compare-input" element={ <CompareInput/> } /> 
			<Route path="/about" element={ <About/> } /> 
		</Routes>
	</BrowserRouter>
  );
}

export default App;
