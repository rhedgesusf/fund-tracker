import { useState, useEffect } from 'react';
import './App.css';
import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';

/*
App: Funding Tracker
Features:
 - Uses Chart.js library to create a bar chart that shows total funding by year
 - Uses Chart.js library to create a line chart that shows funding ttrends by industry
 - Use fetch() to load the funding details from the funding.json file
 - The funding.json file will include a list of items that have startup, industry, amount, year
 - Logic will need to process each line item in the json file to compute totals by year and industry
Components: FundingBarChart, IndustryTrendChart
*/

function App() {
  const [fundingData, setFundingData] = useState(null);

  useEffect(() => {
    // Fetch funding details from funding.json
    fetch('/funding.json')
      .then((response) => response.json())
      .then((data) => {
        console
        // Process data to compute totals by year and industry
        const totalsByYear = {};
        const trendsByIndustry = {};

        data.forEach((item) => {
          // Compute totals by year
          if (!totalsByYear[item.year]) {
            totalsByYear[item.year] = 0;
          }
          totalsByYear[item.year] += item.amount;

          // Compute trends by industry
          if (!trendsByIndustry[item.industry]) {
            trendsByIndustry[item.industry] = 0;
          }
          trendsByIndustry[item.industry] += item.amount;
        });

        // Format data for charts
        const totalFundingByYear = {
          years: Object.keys(totalsByYear),
          totals: Object.values(totalsByYear),
        };

        const fundingTrendsByIndustry = {
          industries: Object.keys(trendsByIndustry),
          trends: Object.values(trendsByIndustry),
        };

        setFundingData({ totalFundingByYear, fundingTrendsByIndustry });
      })
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  if (!fundingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Funding Tracker</h1>
      <div>
        <h2>Total Funding by Year</h2>
        <FundingBarChart data={fundingData.totalFundingByYear} />
      </div>

      <div>
        <h2>Funding Trends by Industry</h2>
        <IndustryTrendChart data={fundingData.fundingTrendsByIndustry} />
      </div>
    </div>
  );
}

export default App;
