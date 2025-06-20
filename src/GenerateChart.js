import { useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function GenerateChart({ xLabel, yLabel ,sym}) {
	const data = {
		labels: xLabel,
		datasets: [
			{
				label: `Stock Close Price of ${sym}`,
				data: yLabel,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Stock Info',
			},
		},

	};

	return (
		<div className="chart-container">
		<div className="chart">
			<Line options={options} data={data} />
		</div>
		</div>
	);
}

export default GenerateChart;