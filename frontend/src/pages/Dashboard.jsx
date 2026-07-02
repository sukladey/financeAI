import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);


function Dashboard() {
  const [
    analytics,
    setAnalytics
  ] = useState(null);

  const fetchData =
    async () => {
      try {
        const {
          data
        } = await API.get(
          "/dashboard"
        );

        setAnalytics(
          data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  if (!analytics) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  const chartData = Object.entries(
   analytics.categoryAnalysis || {}
   ).map(([name, value]) => ({
    name,
    value,
  }));

  const pieData = {
  labels: chartData.map(
    (item) => item.name
  ),
  datasets: [
    {
      label: "Expenses",
      data: chartData.map(
        (item) => item.value
      )
    }
  ]
};

const healthData = {
  labels: [
    "Health Score"
  ],
  datasets: [
    {
      label: "Score",
      data: [
        analytics.healthScore
      ]
    }
  ]
};

const budgetWarning =
  analytics.savingsRate < 10;

  return (
    <>
      <Navbar />

      <div
        style={{
          display:
            "flex"
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding:
              "20px"
          }}
        >
          <h1>
            Dashboard
          </h1>

          <div
            style={{
              display:
                "flex",
              gap: "20px",
              marginTop:
                "20px"
            }}
          >
            <DashboardCard
              title="Income"
              value={`₹${analytics.totalIncome}`}
            />

            <DashboardCard
              title="Expense"
              value={`₹${analytics.totalExpense}`}
            />

            <DashboardCard
              title="Savings"
              value={`₹${analytics.savings}`}
            />

            <DashboardCard
              title="Health Score"
              value={`${analytics.healthScore}%`}
            />
          </div>

          <div
            className="card"
            style={{
              marginTop:
                "30px"
            }}
          >
            <h3>
              Savings Rate
            </h3>

            <h1>
              {
                analytics.savingsRate
              }
              %
            </h1>
          {
  budgetWarning && (
    <div
      className="card"
      style={{
        background: "#ffe5e5"
      }}
    >
      <h3>⚠ Low Savings Alert</h3>

      <p>
        Your savings rate is below 10%.
        Consider reducing discretionary
        expenses.
      </p>
    </div>
  )
}
          </div>

          <div
            className="card"
            style={{
              marginTop:
                "30px"
            }}
          >
           <h3>Expense Category Breakdown</h3>

<div
  style={{
    width: "450px",
    margin: "20px auto"
  }}
>
  <Pie data={pieData} />
</div>

<div
  className="card"
  style={{
    marginTop: "30px"
  }}
>
  <h3>Financial Health Score</h3>

  <div
    style={{
      width: "500px",
      margin: "auto"
    }}
  >
    <Bar data={healthData} />
  </div>
</div>

            {chartData.length >
            0 ? (
              <ul
                style={{
                  marginTop:
                    "15px"
                }}
              >
                {chartData.map(
                  (
                    item
                  ) => (
                    <li
                      key={
                        item.name
                      }
                    >
                      {
                        item.name
                      }
                      : ₹
                      {
                        item.value
                      }
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p>
                No expense
                data found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;