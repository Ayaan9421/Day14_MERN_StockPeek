import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import GenerateChart from "./GenerateChart";
import CompareInfo from "./CompareInfo";

function CompareDetails(){
	const nav = useNavigate();
	const loc = useLocation();
	const [xLabel1, setXLabel1] = useState(loc.state.xLabel1);
	const [yLabel1, setYLabel1] = useState(loc.state.yLabel1);
	const [xLabel2, setXLabel2] = useState(loc.state.xLabel2);
	const [yLabel2, setYLabel2] = useState(loc.state.yLabel2);
		
	const newStock = (event) => {
		nav("/compare-input");
	}

	const back = (event) => {
		nav("/");
	}	

	return(
	<>
	<div className="compare-results-container">
		<h1> Comparison Details </h1>
		<div className="compare-charts">
			<GenerateChart xLabel={xLabel1} yLabel={yLabel1} sym={loc.state.sym1}/>
			<GenerateChart xLabel={xLabel2} yLabel={yLabel2} sym={loc.state.sym2}/>
		</div>
		
		<div className="compare-info-box">
			<CompareInfo data1={loc.state.d1} data2={loc.state.d2} />
		</div>
		
		<div className="action-buttons">
			<button onClick={newStock}> Get New Stock Details </button>
			<button onClick={back}> Back </button>
		</div>
	</div>
	</>
	);
}
export default CompareDetails;
