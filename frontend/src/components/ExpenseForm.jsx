import { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAdd(formData);

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Expense</h3>

      <input
        type="text"
        name="title"
        placeholder="Expense Name"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button className="btn btn-primary">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;