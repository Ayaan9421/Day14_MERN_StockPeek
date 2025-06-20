import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StockInput() {
	const nav = useNavigate();
	const rSymbol = useRef();

	const [symbol, setSymbol] = useState("");
	const [inter, setInter] = useState("day");

	const hSymbol = (event) => { setSymbol(event.target.value); }
	const hInter = (event) => { setInter(event.target.value); }

	const getDetail = async (event) => {
		event.preventDefault();

		console.log(inter);
		const apiKey = process.env.REACT_APP_API_KEY;
		const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1${inter}&apikey=${apiKey}`;

		let xl = [];
		let yl = [];
		try {
			const res = await axios.get(url);
			console.log(res.data);
			res.data.values.map((e) => {
				xl.unshift(e.datetime);
				yl.unshift(parseFloat(e.close));
			});

			let data = { xLabel: xl, yLabel: yl, d:res.data};
			nav("/stock-details", { state: data });

		} catch (err) {
			toast.error(err);
		}

	}

	return (
		<>
			<div className="stock-input-container">
			<h1> Check Stock Details </h1>
			<form onSubmit={getDetail}>
				<label> Enter Stock Symbol </label>
				<br />
				<input type="text" placeholder="eg (AAPL, NVDA..)" required
					ref={rSymbol} onChange={hSymbol} value={symbol} />
				<br /><br />
				<label> Select interval </label>
				<select onChange={hInter} value={inter}>
					<option value="day" >1 Day </option>
					<option value="week" >1 Week </option>
					<option value="month" >1 Month </option>
				</select>
				<br /><br />
				<div className="action-buttons">
					<input type="submit" value="Get Details" />
					<button onClick={ ()=> nav("/") }> Back </button>
				</div>
			</form>
			</div>
		</>
	);
}
export default StockInput;