import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const DonutChart2 = () => {
  const data = [
    { label: "New", value: 78, color: "#3B82F6" }, // Blue
    { label: "Returning", value: 22, color: "#10B981" }, // Green
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", color: "white" }}>
      <PieChart
        series={[
          {
            data,
            innerRadius: 50,
            outerRadius: 80,
          },
        ]}
        width={200}
        height={200}
        margin={{ right: 5 }}
        sx={{
          "& .MuiChartsLegend-label": {
            fill: "white",
            color: "white",
            fontSize: 12,
          },
        }}
      />
    </div>
  );
};

export default DonutChart2;
