import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const fetchBudgets = async () => {
    try {
      const { data } = await API.get("/budget/all");
      setBudgets(data.budget || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const addBudget = async (e) => {
    e.preventDefault();

    try {
      await API.post("/budget/add", {
        category,
        limit
      });

      setCategory("");
      setLimit("");

      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await API.delete(`/budget/delete/${id}`);
      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <h1>Budget Management</h1>

          <form
            onSubmit={addBudget}
            className="card"
          >
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Monthly Limit"
              value={limit}
              onChange={(e) =>
                setLimit(e.target.value)
              }
            />

            <button className="btn btn-primary">
              Save Budget
            </button>
          </form>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Limit</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {budgets.map((item) => (
                  <tr key={item._id}>
                    <td>{item.category}</td>
                    <td>₹{item.limit}</td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteBudget(item._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;