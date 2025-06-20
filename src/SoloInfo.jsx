import { useEffect,useState } from "react";


function SoloInfo({data}){
	const [latestPrice, setLatestPrice] = useState("");	
	const [directionText, setDirectionText] = useState("");
	const [upDown, setUpDown] = useState("");	

	const getDate = (da) => {
		const date = new Date(da);
		const formatted = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
		return formatted;
	}

	useEffect( ()=> {
		console.log(data);
		const latest = data.values[0].close;
		setLatestPrice(`The current stock price is $${parseFloat(latest).toFixed(2)} as of ${getDate(data.values[0].datetime)}.`);


		const todayClose = parseFloat(data.values[0].close);
		const yesterdayClose = parseFloat(data.values[1].close);
		const change = todayClose - yesterdayClose;
		const changePercent = ((change / yesterdayClose) * 100).toFixed(2);
		if (change > 0) {
			setDirectionText(`The stock rose by ${changePercent}% since yesterday.`);
		} else if (change < 0) {
			setDirectionText(`The stock fell by ${Math.abs(changePercent)}% since yesterday.`);
		} else {
			setDirectionText(`The stock price did not change compared to yesterday.`);
		}


		let upDays = 0, downDays = 0;
		for (let i = 0; i < 7; i++) {
			const today = parseFloat(data.values[i].close);
			const yesterday = parseFloat(data.values[i + 1].close);
			if (today > yesterday) upDays++;
			else if (today < yesterday) downDays++;
		}
		setUpDown(`In the last 7 ${data.meta.interval.slice(1)}s, the stock went up ${upDays} times and down ${downDays} times`);

	});

	

	return (
	<>	
		<div className="solo-info-card">
			<p> { latestPrice } </p>
			<p> { directionText } </p>
			<p> { upDown } </p>
		</div>
	</>
	);
}
export default SoloInfo;
