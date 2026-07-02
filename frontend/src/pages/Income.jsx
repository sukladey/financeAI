import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import IncomeForm from "../components/IncomeForm";

function Income() {
  const [income, setIncome] =
    useState([]);

  const fetchIncome =
    async () => {
      try {
        const { data } = await API.get("/income/get");

        console.log("Income Response:", data);

        setIncome(Array.isArray(data) ? data : []);
        
      } catch (error) {
        console.log( error );
      }
    };

  useEffect(() => {
    fetchIncome();
  }, []);

  const addIncome =
    async (
      formData
    ) => {
      try {
        await API.post(
          "/income/add",
          formData
        );

        fetchIncome();
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const deleteIncome =
    async (id) => {
      try {
        await API.delete(
          `/income/delete/${id}`
        );

        fetchIncome();
      } catch (error) {
        console.log(
          error
        );
      }
    };

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
            Income
          </h1>

          <IncomeForm
            onAdd={
              addIncome
            }
          />

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>
                    Title
                  </th>
                  <th>
                    Amount
                  </th>
                  <th>
                    Category
                  </th>
                  <th>
                    Date
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(income) &&
                  income.map((item) => (
                    <tr
                      key={
                        item._id
                      }
                    >
                      <td>
                        {
                          item.title
                        }
                      </td>

                      <td>
                        ₹
                        {
                          item.amount
                        }
                      </td>

                      <td>
                        {
                          item.category
                        }
                      </td>

                      <td>
                        {new Date(
                          item.date
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            deleteIncome(
                              item._id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Income;