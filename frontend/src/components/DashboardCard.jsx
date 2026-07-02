

function DashboardCard({
    title,
    value
}) {
  return (
    <div className="dashboard-card" style={{
        flex: 1,
        textAlign:
          "center"
      }}>
      <h3>{title}</h3>

      <h2  style={{
          marginTop:
            "10px"
        }}>${value}</h2>
    </div>
  );
}

export default DashboardCard;
