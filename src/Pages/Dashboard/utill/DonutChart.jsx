import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";


const DonutChart = () => {
  const data = [
    { id: 0, value: 62, label: "Completed", color: "#FACC15" },
    { id: 1, value: 30, label: "Pending", color: "#F59E0B" },
    { id: 2, value: 8, label: "Cancelled", color: "#FDE68A" },
  ];


  return (
    <div style={{ display: "flex", justifyContent: "center",color:"white" }}>
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 50,
            outerRadius: 80,
          },
        ]}
        width={180}
        height={200}
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


export default DonutChart;
