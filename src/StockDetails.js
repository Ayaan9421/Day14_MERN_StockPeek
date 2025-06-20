import GenerateChart from "./GenerateChart";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SoloInfo from "./SoloInfo";

function StockDetails() {
	const nav = useNavigate();
	const loc = useLocation();
	const [xLabel, setXLabel] = useState(loc.state.xLabel);
	const [yLabel, setYLabel] = useState(loc.state.yLabel);

	const newStock = (event) => {
		nav("/stock-input");
	}

	const back = (event) => {
		nav("/");
	}
	

	return (
		<>
		<div className="stock-details-container">
			<h1> Stock Overview </h1>
			<div className="info-chart-section">
				<GenerateChart xLabel={xLabel} yLabel={yLabel} sym={loc.state.d.meta.symbol}/>
				<SoloInfo data={loc.state.d}/>
			</div>
			<div className="action-buttons">		
				<button onClick={newStock}> Get New Stock Details </button>
				<button onClick={back}> Back </button>
			</div>
		</div>
		</>
	);
}
export default StockDetails;