import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/ExpenseForm";

function Expense() {
  const [expense, setExpense] =
    useState([]);

  const fetchExpense =
    async () => {
      try {
        const { data } =
          await API.get(
            "/expense/all"
          );

        setExpense(
          data.expense
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    fetchExpense();
  }, []);

  const addExpense =
    async (
      formData
    ) => {
      try {
        await API.post(
          "/expense/add",
          formData
        );

        fetchExpense();
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const deleteExpense =
    async (id) => {
      try {
        await API.delete(
          `/expense/delete/${id}`
        );

        fetchExpense();
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
            Expense
          </h1>

          <ExpenseForm
            onAdd={
              addExpense
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
                {expense.map(
                  (
                    item
                  ) => (
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
                            deleteExpense(
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

export default Expense;