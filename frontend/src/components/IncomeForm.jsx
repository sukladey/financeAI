import { useState } from "react";

function IncomeForm({ onAdd }) {
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

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      alert("All fields required");
      return;
    }

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
      <h3>Add Income</h3>

      <input
        type="text"
        name="title"
        placeholder="Income Source"
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
        Add Income
      </button>
    </form>
  );
}

export default IncomeForm;