import { useNavigate } from "react-router-dom";

function Home() {
	const nav = useNavigate();

	return (
		<div className="home">
			<h1 className="home-title">Welcome to Stock Peek</h1>
			<div className="features">
				<div className="feature-card" onClick={ () => {nav("/stock-input"); } }>
					<h2>Check Stock Info</h2>
					<p>View current and past stock performance with interactive charts and simple insights.</p>
				</div>
				<div className="feature-card" onClick={ () => {nav("/compare-input"); }}>
					<h2>Compare Two Stocks</h2>
					<p>Compare two stocks side by side to see which one is performing better over time.</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
