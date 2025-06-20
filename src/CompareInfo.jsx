import { useEffect,useState } from "react";

function CompareInfo({data1, data2}){
	const [latestPrice, setLatestPrice] = useState("");	
	const [directionText, setDirectionText] = useState("");
	const [upDown, setUpDown] = useState("");	

	const getDate = (da) => {
		const date = new Date(da);
		const formatted = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
		return formatted;
	}

	const getUpDays = (data, days = 7) => {
		let up = 0;
		for (let i = 0; i < days; i++) {
	  		const today = parseFloat(data[i].close);
		  	const prev = parseFloat(data[i + 1].close);
			if (today > prev) up++;
	  	}
		return up;
	}

	useEffect( ()=> {
		const stockA = data1.values;
		const stockB = data2.values;
		const sym1 = data1.meta.symbol;
		const sym2 = data2.meta.symbol;

		const priceA = parseFloat(stockA[0].close);
		const priceB = parseFloat(stockB[0].close);
		setLatestPrice(`${sym1} is currently placed at $${priceA}, whereas ${sym2} is at ${priceB}`);


		const priceA_today = parseFloat(stockA[0].close);
		const priceA_yesterday = parseFloat(stockA[1].close);
		const changeA = ((priceA_today - priceA_yesterday) / priceA_yesterday * 100).toFixed(2);
		const priceB_today = parseFloat(stockB[0].close);
		const priceB_yesterday = parseFloat(stockB[1].close);
		const changeB =	((priceB_today - priceB_yesterday) / priceB_yesterday * 100).toFixed(2);
		setDirectionText(`Today, ${sym1} ${changeA > 0 ? 'rose' : 'fell'} by ${Math.abs(changeA)}%,while ${sym2} ${changeB > 0 ? 'rose' : 'fell'} by ${Math.abs(changeB)}%.`);
		


		const upA = getUpDays(stockA);
		const upB = getUpDays(stockB);
		setUpDown(`In the last 7 ${data1.meta.interval.slice(1)}s, ${sym1} went up ${upA} times, while ${sym2} went up ${upB} times`);

	},[]);

	

	return (
	<>	
		<div className="compare-info-card">
			<p> { latestPrice } </p>
			<p> { directionText } </p>
			<p> { upDown } </p>
		</div>
	</>
	);
}
export default CompareInfo;
