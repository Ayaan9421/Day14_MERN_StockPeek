import { useState, useRef } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

function CompareInput(){
	const nav = useNavigate();
	const rSym1 = useRef();
	const rSym2 = useRef();
	
	const [sym1, setSym1] = useState("");
	const [sym2, setSym2] = useState("");
	const [inter, setInter] = useState("day");
	
	const hSym1 = (event) => { 	setSym1(event.target.value);	}
	const hSym2 = (event) => { 	setSym2(event.target.value);	}
	const hInter = (event) => {	setInter(event.target.value);	}
	
	const cmpStocks = async (event) => {
		event.preventDefault();

		const apiKey = process.env.REACT_APP_API_KEY;

		let x1 = [];
		let y1 = [];
		let x2 = [];
		let y2 = [];
			
		try {	
			const url1 = `https://api.twelvedata.com/time_series?symbol=${sym1}&interval=1${inter}&apikey=${apiKey}`;
			console.log(url1);
			const res1 = await axios.get(url1);
			console.log(res1.data);
			res1.data.values.map((e) => {
				x1.unshift(e.datetime);
				y1.unshift(parseFloat(e.close));
			});

			const url2 = `https://api.twelvedata.com/time_series?symbol=${sym2}&interval=1${inter}&apikey=${apiKey}`;
			const res2 = await axios.get(url2);
			res2.data.values.map((e) => {
				x2.unshift(e.datetime);
				y2.unshift(parseFloat(e.close));
			});
			console.log("Sym 1 = " + x1);
			console.log("Sym 1 = " + y1);
			console.log("Sym 2 = " + x2);
			console.log("Sym 2 = " + y2);
			let data = {xLabel1: x1, yLabel1: y1, sym1: sym1, xLabel2: x2, sym2: sym2, yLabel2: y2, d1:res1.data, d2: res2.data};
			nav("/compare-details", {state: data});

		} catch (err) {
			toast.error(err);
		}

		
		
	}

	return (
	<>
	<div className="compare-form-container">
		<h1>Compare Stocks</h1>
		<form >
			<label> Enter First Stock Symbol </label>
			<br/>
			<input type="text" placeholder="( eg. AAPL )" required 
			ref={ rSym1 }  	onChange={ hSym1 } value={ sym1 }/>
			<br/><br/>
			<label> Enter Second Stock Symbol </label>
			<br/>
			<input type="text" placeholder="( eg. NVDA )" required
			ref={ rSym2 }  	onChange={ hSym2 } value={ sym2 }/>
			<br /><br />
			<label> Select interval </label>
			<select >
				<option value="day" onChange={hInter} >1 Day </option>
				<option value="week" onChange={hInter}>1 Week </option>
				<option value="month" onChange={hInter}>1 Month </option>
			</select>
			<br /><br />
			<div className="action-buttons">
				<button onClick={cmpStocks}> Get Details </button>
				<button onClick={ ()=> nav("/") }> Back </button>
			</div>
		</form>
	</div>
	</>
	);
}
export default CompareInput;


//
//			for (let i = 0; i < res.data.values.length; i++) {
//				x1.unshift(res.data.values[i].datetime);
//				y1.unshift(parseFloat(res.data.values[i].close));
//			}
//