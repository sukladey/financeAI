import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reports() {
  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const { data } =
        await API.get("/dashboard");

      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const exportExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet([
        dashboard
      ]);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Finance Report"
    );

    XLSX.writeFile(
      workbook,
      "FinanceReport.xlsx"
    );
  };

  const exportCSV = () => {
    const csv =
      `
Total Income,${dashboard.totalIncome}
Total Expense,${dashboard.totalExpense}
Savings,${dashboard.savings}
Savings Rate,${dashboard.savingsRate}
Health Score,${dashboard.healthScore}
`;

    const blob =
      new Blob([csv], {
        type:
          "text/csv;charset=utf-8;"
      });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "FinanceReport.csv";

    link.click();
  };

  if (!dashboard)
    return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px"
          }}
        >
          <h1>
            Financial Reports
          </h1>

          <div className="card">
            <h3>
              Total Income: ₹
              {
                dashboard.totalIncome
              }
            </h3>

            <h3>
              Total Expense: ₹
              {
                dashboard.totalExpense
              }
            </h3>

            <h3>
              Savings: ₹
              {
                dashboard.savings
              }
            </h3>

            <h3>
              Health Score:
              {
                dashboard.healthScore
              }
              %
            </h3>

            <br />

            <button
              onClick={
                exportCSV
              }
              className="btn btn-primary"
            >
              Export CSV
            </button>

            <button
              onClick={
                exportExcel
              }
              className="btn btn-primary"
              style={{
                marginLeft:
                  "10px"
              }}
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;