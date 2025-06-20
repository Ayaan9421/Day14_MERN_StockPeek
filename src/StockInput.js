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
			<form >
				<label> Enter Stock Symbol </label>
				<br />
				<input type="text" placeholder="eg (AAPL, NVDA..)" required
					ref={rSymbol} onChange={hSymbol} value={symbol} />
				<br /><br />
				<label> Select interval </label>
				<select >
					<option value="day" onChange={hInter} >1 Day </option>
					<option value="week" onChange={hInter}>1 Week </option>
					<option value="month" onChange={hInter}>1 Month </option>
				</select>
				<br /><br />
				<div className="action-buttons">
					<button onClick={getDetail}> Get Details </button>
					<button onClick={ ()=> nav("/") }> Back </button>
				</div>
			</form>
			</div>
		</>
	);
}
export default StockInput;